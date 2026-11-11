import { getSeedQuiz } from "@/data/quiz-seeds";
import type { TenantQuiz } from "@/lib/quiz";

const STORAGE_PREFIX = "bookflo-quiz:";

function storageKey(tenantSlug: string): string {
  return `${STORAGE_PREFIX}${tenantSlug}`;
}

function isTenantQuiz(value: unknown): value is TenantQuiz {
  if (!value || typeof value !== "object") return false;
  const q = value as TenantQuiz;
  return (
    typeof q.id === "string" &&
    typeof q.tenantSlug === "string" &&
    typeof q.title === "string" &&
    typeof q.intro === "string" &&
    typeof q.published === "boolean" &&
    Array.isArray(q.questions)
  );
}

/** Client-only: tenant-scoped quiz override (admin edits). */
export function readQuizOverride(tenantSlug: string): TenantQuiz | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(tenantSlug));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isTenantQuiz(parsed) || parsed.tenantSlug !== tenantSlug) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeQuizOverride(quiz: TenantQuiz): void {
  if (typeof window === "undefined") return;
  const next: TenantQuiz = {
    ...quiz,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(storageKey(quiz.tenantSlug), JSON.stringify(next));
}

export function clearQuizOverride(tenantSlug: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(storageKey(tenantSlug));
}

/**
 * Resolve quiz for a tenant: localStorage override if present, else seed.
 * Public Instagram visitors get the shipped seed; same-browser admin edits win.
 */
export function resolveQuiz(tenantSlug: string): TenantQuiz | null {
  const override = readQuizOverride(tenantSlug);
  if (override) return override;
  return getSeedQuiz(tenantSlug);
}
