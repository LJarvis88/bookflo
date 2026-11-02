import { promises as fs } from "fs";
import path from "path";
import { OMS_TENANT_SLUG } from "@/lib/stripe/config";

/**
 * Persist Connect account IDs without a database.
 * Prefer env STRIPE_CONNECT_OMS_ACCOUNT_ID for hosted deploys;
 * fall back to .data/stripe-connect.json for local/dev.
 */

export interface ConnectAccountRecord {
  tenantSlug: string;
  accountId: string;
  updatedAt: string;
}

type StoreFile = {
  accounts: Record<string, ConnectAccountRecord>;
};

const STORE_PATH = path.join(process.cwd(), ".data", "stripe-connect.json");

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoreFile;
    return { accounts: parsed.accounts ?? {} };
  } catch {
    return { accounts: {} };
  }
}

async function writeStore(store: StoreFile): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export function envConnectAccountId(tenantSlug: string): string | null {
  if (tenantSlug === OMS_TENANT_SLUG) {
    const id = process.env.STRIPE_CONNECT_OMS_ACCOUNT_ID?.trim();
    return id || null;
  }
  return null;
}

export async function getConnectAccountId(
  tenantSlug: string,
): Promise<string | null> {
  const fromEnv = envConnectAccountId(tenantSlug);
  if (fromEnv) return fromEnv;
  const store = await readStore();
  return store.accounts[tenantSlug]?.accountId ?? null;
}

export async function setConnectAccountId(
  tenantSlug: string,
  accountId: string,
): Promise<void> {
  const store = await readStore();
  store.accounts[tenantSlug] = {
    tenantSlug,
    accountId,
    updatedAt: new Date().toISOString(),
  };
  await writeStore(store);
}
