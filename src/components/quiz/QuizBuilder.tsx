"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";
import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import {
  emptyQuiz,
  isValidQuiz,
  newAnswer,
  newQuestion,
  quizSharePath,
  type QuizAnswer,
  type QuizQuestion,
  type TenantQuiz,
} from "@/lib/quiz";
import {
  clearQuizOverride,
  readQuizOverride,
  writeQuizOverride,
} from "@/lib/quiz-store";
import { getSeedQuiz } from "@/data/quiz-seeds";

export function QuizBuilder() {
  const tenant = useDemoTenant();
  const [quiz, setQuiz] = useState<TenantQuiz>(() => emptyQuiz(tenant.slug));
  const [hydrated, setHydrated] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const next =
      readQuizOverride(tenant.slug) ??
      getSeedQuiz(tenant.slug) ??
      emptyQuiz(tenant.slug);
    setQuiz(next);
    setHydrated(true);
  }, [tenant.slug]);

  const sharePath = quizSharePath(tenant.slug);
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${sharePath}`
      : sharePath;
  const canPublish = isValidQuiz(quiz);

  function updateQuiz(patch: Partial<TenantQuiz>) {
    setQuiz((q) => ({ ...q, ...patch }));
  }

  function updateQuestion(index: number, patch: Partial<QuizQuestion>) {
    setQuiz((q) => ({
      ...q,
      questions: q.questions.map((question, i) =>
        i === index ? { ...question, ...patch } : question,
      ),
    }));
  }

  function updateAnswer(
    questionIndex: number,
    answerIndex: number,
    patch: Partial<QuizAnswer>,
  ) {
    setQuiz((q) => ({
      ...q,
      questions: q.questions.map((question, qi) => {
        if (qi !== questionIndex) return question;
        return {
          ...question,
          answers: question.answers.map((answer, ai) =>
            ai === answerIndex ? { ...answer, ...patch } : answer,
          ),
        };
      }),
    }));
  }

  function moveQuestion(index: number, direction: -1 | 1) {
    setQuiz((q) => {
      const next = [...q.questions];
      const target = index + direction;
      if (target < 0 || target >= next.length) return q;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...q, questions: next };
    });
  }

  function persist(next: TenantQuiz) {
    writeQuizOverride(next);
    setQuiz(next);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  }

  function saveDraft() {
    persist({ ...quiz, published: false });
  }

  function togglePublish() {
    if (!quiz.published && !canPublish) return;
    persist({ ...quiz, published: !quiz.published });
  }

  function resetToSeed() {
    const seed = getSeedQuiz(tenant.slug);
    clearQuizOverride(tenant.slug);
    setQuiz(seed ?? emptyQuiz(tenant.slug));
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback for older browsers / insecure contexts
      window.prompt("Copy quiz link", shareUrl);
    }
  }

  if (!hydrated) {
    return (
      <div className="min-h-[40vh]" aria-busy="true" aria-label="Loading quiz" />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Quiz
          </h1>
          <p className="mt-1 text-sm text-bf-muted">
            {tenant.name} · steer Instagram clients to the right service. No AI —
            form builder only.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={saveDraft}
            className="rounded-full border border-bf-line bg-white px-4 py-2 text-sm font-medium text-bf-ink hover:bg-bf-fog/60"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={togglePublish}
            disabled={!quiz.published && !canPublish}
            className="rounded-full bg-bf-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      </header>

      {(savedFlash || quiz.published) && (
        <div className="rounded-2xl border border-bf-line bg-white px-4 py-3 text-sm">
          {savedFlash ? (
            <p className="flex items-center gap-2 font-medium text-bf-ink">
              <Check className="h-4 w-4" /> Saved for this browser
            </p>
          ) : null}
          {quiz.published ? (
            <div className={`${savedFlash ? "mt-3 border-t border-bf-line pt-3" : ""}`}>
              <p className="text-xs font-medium uppercase tracking-wider text-bf-muted">
                Share link
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <code className="rounded-lg bg-bf-fog/70 px-3 py-2 text-sm text-bf-ink">
                  {sharePath}
                </code>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center gap-1.5 rounded-full border border-bf-line px-3 py-2 text-sm font-medium hover:bg-bf-fog/60"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied" : "Copy"}
                </button>
                <a
                  href={sharePath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-bf-line px-3 py-2 text-sm font-medium hover:bg-bf-fog/60"
                >
                  Open
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ) : null}
        </div>
      )}

      <section className="space-y-4 rounded-2xl border border-bf-line bg-white p-5">
        <Field label="Quiz title">
          <input
            className="field"
            value={quiz.title}
            onChange={(e) => updateQuiz({ title: e.target.value })}
            placeholder="What should I book?"
          />
        </Field>
        <Field label="Intro line">
          <textarea
            className="field min-h-[72px]"
            value={quiz.intro}
            onChange={(e) => updateQuiz({ intro: e.target.value })}
            placeholder="A few quick questions…"
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-bf-ink">
          <input
            type="checkbox"
            checked={quiz.published}
            disabled={!quiz.published && !canPublish}
            onChange={togglePublish}
            className="h-4 w-4 rounded border-bf-line"
          />
          Published (share link live for this tenant)
        </label>
        {!canPublish && (
          <p className="text-xs text-bf-muted">
            Add at least one question with two answers, each mapped to a service
            or category, before publishing.
          </p>
        )}
      </section>

      <div className="space-y-4">
        {quiz.questions.map((question, qi) => (
          <section
            key={question.id}
            className="space-y-4 rounded-2xl border border-bf-line bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-bf-muted">
                Question {qi + 1}
              </p>
              <div className="flex items-center gap-1">
                <IconButton
                  label="Move up"
                  onClick={() => moveQuestion(qi, -1)}
                  disabled={qi === 0}
                >
                  <ChevronUp className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label="Move down"
                  onClick={() => moveQuestion(qi, 1)}
                  disabled={qi === quiz.questions.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label="Remove question"
                  onClick={() =>
                    setQuiz((q) => ({
                      ...q,
                      questions: q.questions.filter((_, i) => i !== qi),
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </div>
            </div>

            <Field label="Prompt">
              <input
                className="field"
                value={question.prompt}
                onChange={(e) => updateQuestion(qi, { prompt: e.target.value })}
                placeholder="What’s your main goal?"
              />
            </Field>

            <div className="space-y-3">
              {question.answers.map((answer, ai) => (
                <div
                  key={answer.id}
                  className="grid gap-2 rounded-xl border border-bf-line/80 bg-bf-mist/40 p-3 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-end"
                >
                  <Field label="Answer">
                    <input
                      className="field"
                      value={answer.label}
                      onChange={(e) =>
                        updateAnswer(qi, ai, { label: e.target.value })
                      }
                      placeholder="Batch Instagram content"
                    />
                  </Field>
                  <Field label="Maps to">
                    <select
                      className="field"
                      value={answer.targetKind}
                      onChange={(e) =>
                        updateAnswer(qi, ai, {
                          targetKind: e.target.value as QuizAnswer["targetKind"],
                          targetId: "",
                        })
                      }
                    >
                      <option value="service">Service</option>
                      <option value="category">Category</option>
                    </select>
                  </Field>
                  <Field label={answer.targetKind === "service" ? "Service" : "Category"}>
                    <select
                      className="field"
                      value={answer.targetId}
                      onChange={(e) =>
                        updateAnswer(qi, ai, { targetId: e.target.value })
                      }
                    >
                      <option value="">Select…</option>
                      {answer.targetKind === "service"
                        ? tenant.services
                            .filter((s) => s.active)
                            .map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))
                        : tenant.categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                    </select>
                  </Field>
                  <IconButton
                    label="Remove answer"
                    onClick={() =>
                      updateQuestion(qi, {
                        answers: question.answers.filter((_, i) => i !== ai),
                      })
                    }
                    disabled={question.answers.length <= 2}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateQuestion(qi, {
                    answers: [...question.answers, newAnswer()],
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-medium text-bf-ink hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add answer
              </button>
            </div>
          </section>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            setQuiz((q) => ({
              ...q,
              questions: [...q.questions, newQuestion()],
            }))
          }
          className="inline-flex items-center gap-1.5 rounded-full border border-bf-line bg-white px-4 py-2 text-sm font-medium hover:bg-bf-fog/60"
        >
          <Plus className="h-4 w-4" />
          Add question
        </button>
        <button
          type="button"
          onClick={resetToSeed}
          className="rounded-full px-4 py-2 text-sm text-bf-muted hover:text-bf-ink"
        >
          Reset to seed
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-bf-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg border border-bf-line p-2 text-bf-muted hover:bg-bf-fog/70 hover:text-bf-ink disabled:opacity-30"
    >
      {children}
    </button>
  );
}
