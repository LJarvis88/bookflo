"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { TenantLogo } from "@/components/branding/TenantLogo";
import {
  bookingDeepLink,
  matchQuizServices,
  type TenantQuiz,
} from "@/lib/quiz";
import { resolveQuiz } from "@/lib/quiz-store";
import { formatDuration, formatGBP } from "@/lib/format";
import type { Tenant } from "@/lib/types";

type Phase = "intro" | "question" | "result" | "unpublished";

export function PublicQuiz({ tenant }: { tenant: Tenant }) {
  const brand = tenant.brand;
  const isOms = tenant.slug === "oh-my-social-media";

  const [quiz, setQuiz] = useState<TenantQuiz | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<string[]>([]);

  useEffect(() => {
    const resolved = resolveQuiz(tenant.slug);
    setQuiz(resolved);
    if (!resolved || !resolved.published || resolved.questions.length === 0) {
      setPhase("unpublished");
    } else {
      setPhase("intro");
    }
    setHydrated(true);
  }, [tenant.slug]);

  const matches = useMemo(() => {
    if (!quiz) return [];
    return matchQuizServices(tenant, quiz, selectedAnswerIds);
  }, [quiz, selectedAnswerIds, tenant]);

  const cssVars = {
    ["--tenant-bg" as string]: brand.background,
    ["--tenant-ink" as string]: brand.ink,
    ["--tenant-primary" as string]: brand.primary,
    ["--tenant-secondary" as string]: brand.secondary,
    ["--tenant-muted" as string]: brand.muted,
    ["--tenant-button" as string]: brand.buttonBg,
    ["--tenant-button-text" as string]: brand.buttonText,
  };

  if (!hydrated) {
    return (
      <div
        className="min-h-screen"
        style={{ background: brand.background }}
        aria-busy="true"
        aria-label="Loading quiz"
      />
    );
  }

  const question = quiz?.questions[questionIndex];
  const progressTotal = quiz?.questions.length ?? 1;
  const progressStep =
    phase === "intro" ? 0 : phase === "result" ? progressTotal : questionIndex + 1;

  function start() {
    setSelectedAnswerIds([]);
    setQuestionIndex(0);
    setPhase("question");
  }

  function pickAnswer(answerId: string) {
    if (!quiz || !question) return;
    const nextAnswers = [...selectedAnswerIds.slice(0, questionIndex), answerId];
    setSelectedAnswerIds(nextAnswers);
    if (questionIndex >= quiz.questions.length - 1) {
      setPhase("result");
      return;
    }
    setQuestionIndex((i) => i + 1);
  }

  function back() {
    if (phase === "question" && questionIndex === 0) {
      setPhase("intro");
      return;
    }
    if (phase === "question") {
      setQuestionIndex((i) => i - 1);
      setSelectedAnswerIds((ids) => ids.slice(0, -1));
      return;
    }
    if (phase === "result") {
      setPhase("question");
      setQuestionIndex(Math.max(quiz!.questions.length - 1, 0));
      setSelectedAnswerIds((ids) => ids.slice(0, -1));
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        ...cssVars,
        background: brand.background,
        color: brand.ink,
        fontFamily: `var(--font-tenant-body), system-ui, sans-serif`,
      }}
    >
      <header
        className="relative w-full border-b"
        style={{
          background: isOms
            ? brand.background
            : `linear-gradient(165deg, ${brand.background} 0%, ${brand.secondary} 100%)`,
          borderColor: isOms ? "#F0F0F2" : `${brand.primary}33`,
        }}
      >
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3.5 px-5 py-10 sm:py-12">
          <TenantLogo
            brand={brand}
            size="hero"
            className="object-center max-w-[240px] sm:max-w-[280px]"
          />
          {quiz?.published ? (
            <p
              className="max-w-sm text-center text-[13px] leading-relaxed tracking-[0.02em] sm:text-sm"
              style={{ color: brand.muted }}
            >
              {quiz.intro}
            </p>
          ) : null}
        </div>
      </header>

      <div className="mx-auto w-full max-w-md px-5 py-7 pb-28 sm:py-8">
        {phase !== "unpublished" && phase !== "intro" && (
          <div className="mb-7">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={back}
                className="inline-flex items-center gap-1.5 text-sm tracking-[0.02em]"
                style={{ color: brand.muted }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.18em]"
                style={{ color: brand.muted }}
              >
                {String(progressStep).padStart(2, "0")} /{" "}
                {String(progressTotal).padStart(2, "0")}
              </p>
            </div>
            <div
              className="h-px overflow-hidden"
              style={{
                background: isOms ? "#EFEFF1" : `${brand.primary}28`,
              }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${(progressStep / Math.max(progressTotal, 1)) * 100}%`,
                  background: isOms
                    ? `linear-gradient(90deg, ${brand.primary}, ${brand.secondary})`
                    : brand.primary,
                }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${phase}-${questionIndex}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
          >
            {phase === "unpublished" && (
              <div className="space-y-4 text-center">
                <h1
                  className="font-display text-2xl font-semibold tracking-tight"
                  style={{ fontFamily: `var(--font-tenant-display), serif` }}
                >
                  Quiz coming soon
                </h1>
                <p className="text-sm" style={{ color: brand.muted }}>
                  This booking quiz isn’t published yet. You can still book
                  directly.
                </p>
                <Link
                  href={`/book/${tenant.slug}`}
                  className="inline-flex rounded-full px-5 py-3 text-sm font-medium"
                  style={{
                    background: brand.buttonBg,
                    color: brand.buttonText,
                  }}
                >
                  Browse services
                </Link>
              </div>
            )}

            {phase === "intro" && quiz && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1
                    className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl"
                    style={{ fontFamily: `var(--font-tenant-display), serif` }}
                  >
                    {quiz.title}
                  </h1>
                  <p className="text-sm leading-relaxed" style={{ color: brand.muted }}>
                    {quiz.questions.length} quick question
                    {quiz.questions.length === 1 ? "" : "s"} · then book on{" "}
                    {brand.displayName}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={start}
                  className="w-full rounded-full px-5 py-3.5 text-sm font-semibold tracking-[0.02em]"
                  style={{
                    background: isOms
                      ? `linear-gradient(90deg, ${brand.primary}, ${brand.secondary})`
                      : brand.buttonBg,
                    color: brand.buttonText,
                  }}
                >
                  Start quiz
                </button>
              </div>
            )}

            {phase === "question" && question && (
              <div className="space-y-5">
                <h2
                  className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
                  style={{ fontFamily: `var(--font-tenant-display), serif` }}
                >
                  {question.prompt}
                </h2>
                <div className="space-y-2.5">
                  {question.answers.map((answer) => (
                    <button
                      key={answer.id}
                      type="button"
                      onClick={() => pickAnswer(answer.id)}
                      className="w-full rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition active:scale-[0.99]"
                      style={{
                        borderColor: isOms ? "#E8E8EC" : `${brand.primary}28`,
                        background: isOms ? "#FFFFFF" : brand.surface,
                        color: brand.ink,
                      }}
                    >
                      {answer.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {phase === "result" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em]"
                    style={{ color: brand.primary }}
                  >
                    <Check className="h-3.5 w-3.5" />
                    Matched for you
                  </p>
                  <h2
                    className="font-display text-2xl font-semibold tracking-tight"
                    style={{ fontFamily: `var(--font-tenant-display), serif` }}
                  >
                    {matches.length > 0
                      ? "Here’s what we’d book"
                      : "Browse the full menu"}
                  </h2>
                  <p className="text-sm" style={{ color: brand.muted }}>
                    {matches.length > 0
                      ? "Tap through to finish booking on your branded page."
                      : "We couldn’t narrow it down — pick any service below."}
                  </p>
                </div>

                <div className="space-y-3">
                  {(matches.length > 0
                    ? matches.slice(0, 3)
                    : tenant.services
                        .filter((s) => s.active)
                        .slice(0, 3)
                        .map((service) => ({ service, score: 0 }))
                  ).map(({ service }, index) => {
                    const href = bookingDeepLink(tenant.slug, {
                      serviceId: service.id,
                    });
                    const primary = index === 0;
                    return (
                      <div
                        key={service.id}
                        className="rounded-2xl border p-4"
                        style={{
                          borderColor: primary
                            ? brand.primary
                            : isOms
                              ? "#E8E8EC"
                              : `${brand.primary}28`,
                          background: isOms ? "#FFFFFF" : brand.surface,
                        }}
                      >
                        <p className="font-medium">{service.name}</p>
                        <p
                          className="mt-1 text-sm leading-relaxed"
                          style={{ color: brand.muted }}
                        >
                          {service.description}
                        </p>
                        <p
                          className="mt-2 text-sm tabular-nums"
                          style={{ color: brand.muted }}
                        >
                          {formatDuration(service.durationMinutes)}
                          {service.pricePence > 0
                            ? ` · ${formatGBP(service.pricePence)}`
                            : " · Free"}
                        </p>
                        <Link
                          href={href}
                          className="mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold"
                          style={
                            primary
                              ? {
                                  background: isOms
                                    ? `linear-gradient(90deg, ${brand.primary}, ${brand.secondary})`
                                    : brand.buttonBg,
                                  color: brand.buttonText,
                                }
                              : {
                                  background: "transparent",
                                  color: brand.ink,
                                  border: `1px solid ${isOms ? "#E8E8EC" : `${brand.primary}40`}`,
                                }
                          }
                        >
                          Book {service.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={start}
                  className="w-full text-center text-sm"
                  style={{ color: brand.muted }}
                >
                  Retake quiz
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
