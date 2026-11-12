import type { Service, Tenant } from "@/lib/types";

export type QuizTargetKind = "service" | "category";

export interface QuizAnswer {
  id: string;
  label: string;
  targetKind: QuizTargetKind;
  targetId: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  answers: QuizAnswer[];
}

/** One structured “what should I book?” quiz per tenant (v1). */
export interface TenantQuiz {
  id: string;
  tenantSlug: string;
  title: string;
  intro: string;
  published: boolean;
  questions: QuizQuestion[];
  updatedAt: string;
}

export interface QuizMatch {
  service: Service;
  score: number;
}

export function emptyQuiz(tenantSlug: string): TenantQuiz {
  const now = new Date().toISOString();
  return {
    id: `quiz_${tenantSlug}`,
    tenantSlug,
    title: "What should I book?",
    intro: "A few quick questions — we’ll point you to the right service.",
    published: false,
    questions: [],
    updatedAt: now,
  };
}

export function newQuestion(): QuizQuestion {
  return {
    id: `q_${Math.random().toString(36).slice(2, 10)}`,
    prompt: "",
    answers: [newAnswer(), newAnswer()],
  };
}

export function newAnswer(): QuizAnswer {
  return {
    id: `a_${Math.random().toString(36).slice(2, 10)}`,
    label: "",
    targetKind: "service",
    targetId: "",
  };
}

/**
 * Score answers → ranked active services.
 * Service targets add +1; category targets add +1 to each active service in that category.
 */
export function matchQuizServices(
  tenant: Tenant,
  quiz: TenantQuiz,
  selectedAnswerIds: string[],
): QuizMatch[] {
  const scores = new Map<string, number>();

  for (const answerId of selectedAnswerIds) {
    const answer = quiz.questions
      .flatMap((q) => q.answers)
      .find((a) => a.id === answerId);
    if (!answer || !answer.targetId) continue;

    if (answer.targetKind === "service") {
      scores.set(answer.targetId, (scores.get(answer.targetId) ?? 0) + 1);
      continue;
    }

    for (const svc of tenant.services) {
      if (svc.categoryId === answer.targetId && svc.active) {
        scores.set(svc.id, (scores.get(svc.id) ?? 0) + 1);
      }
    }
  }

  return [...scores.entries()]
    .map(([serviceId, score]) => {
      const service = tenant.services.find((s) => s.id === serviceId && s.active);
      return service ? { service, score } : null;
    })
    .filter((m): m is QuizMatch => Boolean(m))
    .sort((a, b) => b.score - a.score || a.service.name.localeCompare(b.service.name));
}

export function quizSharePath(tenantSlug: string): string {
  return `/quiz/${tenantSlug}`;
}

export function bookingDeepLink(
  tenantSlug: string,
  opts: { serviceId?: string; categoryId?: string },
): string {
  const params = new URLSearchParams();
  if (opts.serviceId) params.set("service", opts.serviceId);
  if (opts.categoryId) params.set("category", opts.categoryId);
  const qs = params.toString();
  return qs ? `/book/${tenantSlug}?${qs}` : `/book/${tenantSlug}`;
}

export function isValidQuiz(quiz: TenantQuiz): boolean {
  if (!quiz.title.trim()) return false;
  if (quiz.questions.length === 0) return false;
  return quiz.questions.every(
    (q) =>
      q.prompt.trim() &&
      q.answers.length >= 2 &&
      q.answers.every((a) => a.label.trim() && a.targetId),
  );
}
