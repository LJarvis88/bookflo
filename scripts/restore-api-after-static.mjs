import { existsSync, renameSync, rmSync } from "fs";
import { join } from "path";

const root = process.cwd();
const apiDir = join(root, "src/app/api");
const apiPark = join(root, ".data", "api-static-parked");
const marker = join(root, ".data", "static-export-api-parked");
const legacyPark = join(root, "src/app/api.__static_parked");

if (existsSync(legacyPark) && !existsSync(apiDir)) {
  renameSync(legacyPark, apiDir);
  console.log("[restore-api] Restored src/app/api from legacy park");
}

if (existsSync(apiPark) && !existsSync(apiDir)) {
  renameSync(apiPark, apiDir);
  console.log("[restore-api] Restored src/app/api");
}
if (existsSync(marker)) rmSync(marker, { force: true });
