import type { TenantQuiz } from "@/lib/quiz";

/**
 * Shipped quiz seeds — public `/quiz/{slug}` works for Instagram traffic
 * without localStorage. Admin edits override per-browser via quiz-store.
 */
export const OMS_QUIZ_SEED: TenantQuiz = {
  id: "quiz_oh-my-social-media",
  tenantSlug: "oh-my-social-media",
  title: "What should I book?",
  intro:
    "Three quick questions — we’ll match you to the right Oh My Social Media shoot.",
  published: true,
  updatedAt: "2026-11-11T00:00:00.000Z",
  questions: [
    {
      id: "oms_q_goal",
      prompt: "What’s your main goal?",
      answers: [
        {
          id: "oms_a_goal_content",
          label: "Batch Instagram / TikTok content",
          targetKind: "category",
          targetId: "oms_cat_content",
        },
        {
          id: "oms_a_goal_studio",
          label: "Clean studio portraits or product",
          targetKind: "service",
          targetId: "oms_svc_studio_2h",
        },
        {
          id: "oms_a_goal_package",
          label: "Content day + studio in one go",
          targetKind: "category",
          targetId: "oms_cat_packages",
        },
        {
          id: "oms_a_goal_explore",
          label: "Still figuring it out",
          targetKind: "service",
          targetId: "oms_svc_discovery",
        },
      ],
    },
    {
      id: "oms_q_time",
      prompt: "How much time do you want to book?",
      answers: [
        {
          id: "oms_a_time_short",
          label: "About 2–3 hours",
          targetKind: "service",
          targetId: "oms_svc_content_3h",
        },
        {
          id: "oms_a_time_studio",
          label: "A focused 2-hour studio slot",
          targetKind: "service",
          targetId: "oms_svc_studio_2h",
        },
        {
          id: "oms_a_time_full",
          label: "A full content day",
          targetKind: "service",
          targetId: "oms_svc_content_6h",
        },
        {
          id: "oms_a_time_chat",
          label: "Just a short discovery call",
          targetKind: "service",
          targetId: "oms_svc_discovery",
        },
      ],
    },
    {
      id: "oms_q_where",
      prompt: "Where do you want to shoot?",
      answers: [
        {
          id: "oms_a_where_location",
          label: "On location",
          targetKind: "category",
          targetId: "oms_cat_content",
        },
        {
          id: "oms_a_where_studio",
          label: "In the studio",
          targetKind: "service",
          targetId: "oms_svc_studio_2h",
        },
        {
          id: "oms_a_where_both",
          label: "Both location and studio",
          targetKind: "category",
          targetId: "oms_cat_packages",
        },
      ],
    },
  ],
};

const SEEDS: Record<string, TenantQuiz> = {
  [OMS_QUIZ_SEED.tenantSlug]: OMS_QUIZ_SEED,
};

export function getSeedQuiz(tenantSlug: string): TenantQuiz | null {
  const seed = SEEDS[tenantSlug];
  return seed ? structuredClone(seed) : null;
}
