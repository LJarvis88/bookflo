#!/usr/bin/env node
/**
 * Split a static `out/` folder across multiple deed.page PUTs when the
 * gzipped tarball exceeds the ~4MB per-request cap. First batch creates /
 * replaces the site; later batches use X-Merge: 1.
 *
 * Usage: node publish-large.mjs out --slug my-slug
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith("--")) ?? "out";
const slugIdx = args.indexOf("--slug");
const slug = slugIdx >= 0 ? args[slugIdx + 1] : null;
if (!slug) {
  console.error("Usage: node publish-large.mjs <dir> --slug <slug>");
  process.exit(1);
}

const MAX_BYTES = 3_800_000; // stay under 4 MiB with gzip overhead
const tokenPath = path.join(os.homedir(), ".config", "deed-page", "token");
let token = process.env.DEEDPAGE_TOKEN?.trim() || "";
if (!token && fs.existsSync(tokenPath)) {
  token = fs.readFileSync(tokenPath, "utf8").trim();
}

const abs = path.resolve(dir);
const files = [];
function walk(d, prefix = "") {
  for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
    const full = path.join(d, ent.name);
    if (ent.isDirectory()) walk(full, rel);
    else files.push({ rel, full, size: fs.statSync(full).size });
  }
}
walk(abs);
files.sort((a, b) => b.size - a.size);

const batches = [];
let current = [];
let currentSize = 0;
for (const f of files) {
  // Rough uncompressed budget; gzip usually shrinks a lot for text.
  const weight = Math.min(f.size, MAX_BYTES);
  if (current.length && currentSize + weight > MAX_BYTES) {
    batches.push(current);
    current = [];
    currentSize = 0;
  }
  current.push(f);
  currentSize += weight;
}
if (current.length) batches.push(current);

console.log(`Publishing ${files.length} files in ${batches.length} batch(es) → ${slug}`);

function mask(s) {
  return s.replace(/deed_tok_[^"]+/g, "deed_tok_[REDACTED]");
}

function saveToken(body) {
  const m = body.match(/"token"\s*:\s*"(deed_tok_[^"]+)"/);
  if (!m) return;
  fs.mkdirSync(path.dirname(tokenPath), { recursive: true, mode: 0o700 });
  fs.writeFileSync(tokenPath, m[1], { mode: 0o600 });
  token = m[1];
  console.log("Saved deed token to ~/.config/deed-page/token");
}

for (let i = 0; i < batches.length; i++) {
  const batch = batches[i];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deed-batch-"));
  const tarPath = path.join(tmp, "batch.tar.gz");
  // tar from abs with only batch paths
  const listFile = path.join(tmp, "files.txt");
  fs.writeFileSync(listFile, batch.map((f) => f.rel).join("\n") + "\n");
  const tar = spawnSync(
    "tar",
    ["-C", abs, "-czf", tarPath, "-T", listFile],
    { encoding: "utf8" },
  );
  if (tar.status !== 0) {
    console.error(tar.stderr || tar.stdout);
    process.exit(1);
  }
  const bytes = fs.statSync(tarPath).size;
  console.log(`Batch ${i + 1}/${batches.length}: ${batch.length} files, ${bytes} bytes gzip`);

  const headers = [
    "Content-Type: application/gzip",
    "X-Client: bookflo-publish-large",
    "X-Spa: 1",
  ];
  if (i > 0) headers.push("X-Merge: 1");
  if (token) headers.push(`Authorization: Bearer ${token}`);

  const curlArgs = [
    "-sS",
    "-X",
    "PUT",
    `https://deed.page/v1/sites?slug=${encodeURIComponent(slug)}`,
    ...headers.flatMap((h) => ["-H", h]),
    "--data-binary",
    `@${tarPath}`,
  ];
  const res = spawnSync("curl", curlArgs, { encoding: "utf8", maxBuffer: 10_000_000 });
  if (res.status !== 0) {
    console.error(res.stderr || res.stdout);
    process.exit(1);
  }
  const body = res.stdout || "";
  console.log(mask(body).slice(0, 1500));
  saveToken(body);
  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    console.error("Non-JSON response");
    process.exit(1);
  }
  if (!parsed.ok && parsed.code) {
    console.error("Publish failed:", parsed.code, parsed.message);
    process.exit(1);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
}

console.log(`Done → https://${slug}.deed.page/`);
