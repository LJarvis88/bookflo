/**
 * deed.page publishes use BOOKFLO_STATIC_EXPORT=1 (static HTML).
 * Stripe Connect needs Node route handlers — park /api outside src/app during static builds.
 */
import { existsSync, renameSync, rmSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const root = process.cwd();
const apiDir = join(root, "src/app/api");
const apiPark = join(root, ".data", "api-static-parked");
const marker = join(root, ".data", "static-export-api-parked");

const staticExport = process.env.BOOKFLO_STATIC_EXPORT === "1";

if (staticExport) {
  mkdirSync(join(root, ".data"), { recursive: true });
  if (existsSync(apiDir)) {
    if (existsSync(apiPark)) {
      rmSync(apiPark, { recursive: true, force: true });
    }
    renameSync(apiDir, apiPark);
    writeFileSync(marker, "1\n");
    console.log(
      "[prepare-build] BOOKFLO_STATIC_EXPORT=1 — parked src/app/api → .data/api-static-parked",
    );
  }
} else if (existsSync(apiPark) && !existsSync(apiDir)) {
  renameSync(apiPark, apiDir);
  if (existsSync(marker)) rmSync(marker, { force: true });
  console.log("[prepare-build] Restored src/app/api from static park");
}
