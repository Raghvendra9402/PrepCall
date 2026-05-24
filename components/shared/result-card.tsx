"use client";

import { Prisma } from "@/lib/generated/prisma/client";
import { Feedback, TranscriptMessage } from "@/lib/types";
import { getScoreMeta } from "@/lib/utils";
import { format } from "date-fns";
import {
  AlertCircle,
  Award,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Layers,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import { ScoreRing } from "./score-ring";

interface ResultCardProps {
  interview: Prisma.InterviewGetPayload<{}>;
}

export function ResultCard({ interview }: ResultCardProps) {
  const {
    id,
    category,
    difficulty,
    score,
    status,
    createdAt,
    transcript,
    feedback,
  } = interview as unknown as {
    id: string;
    category: string;
    difficulty: string;
    score: number;
    status: string;
    createdAt: Date;
    transcript: TranscriptMessage[];
    feedback: Feedback;
  };

  const scoreMeta = getScoreMeta(score);

  const dateStr = format(new Date(createdAt), "MMMM d, yyyy");
  const timeStr = format(new Date(createdAt), "hh:mm a");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

      <div className="max-w-5xl mx-auto px-5 py-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Interview Result
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                {status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold capitalize tracking-tight">
              {category}{" "}
              <span className="text-gray-400 font-normal">Interview</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              {
                icon: <Calendar className="w-3.5 h-3.5" />,
                label: `${dateStr} · ${timeStr}`,
              },
              {
                icon: <Layers className="w-3.5 h-3.5" />,
                label: difficulty,
              },
              {
                icon: <MessageSquare className="w-3.5 h-3.5" />,
                label: `${transcript.length} messages`,
              },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full"
              >
                {icon}
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-[200px_1fr] gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-8">
            <ScoreRing score={score} />
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
                Overall Impression
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {feedback.overallImpression}
              </p>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
                Verdict
              </p>
              <div
                className="flex items-start gap-3 rounded-xl p-3.5"
                style={{
                  background: scoreMeta.bg,
                  border: `1px solid ${scoreMeta.border}`,
                }}
              >
                <BarChart3
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: scoreMeta.color }}
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: scoreMeta.color }}
                >
                  {feedback.finalVerdict.justification}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Strengths
              </p>
            </div>
            <ul className="space-y-2.5">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
                <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Areas to Improve
              </p>
            </div>
            <ul className="space-y-2.5">
              {feedback.areasToImprove.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
            <Award className="w-4 h-4 text-violet-500" />
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              Interview Transcript
            </p>
            <span className="ml-auto text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {transcript.length} exchanges
            </span>
          </div>

          <div className="p-6 max-h-[460px] overflow-y-auto space-y-4 scroll-smooth">
            {(transcript as TranscriptMessage[]).map((msg, i) => {
              const isAI = msg.role === "assistant";
              return (
                <div
                  key={i}
                  className={`flex gap-3 ${isAI ? "" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isAI
                        ? "bg-violet-100 text-violet-600"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {isAI ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>

                  <div
                    className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                      isAI
                        ? "bg-gray-100 text-gray-800 rounded-tl-sm"
                        : "bg-indigo-600 text-white rounded-tr-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-[11px] font-mono text-gray-300 pb-4">
          {id}
        </p>
      </div>
    </div>
  );
}
