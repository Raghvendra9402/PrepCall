"use client";

import { getScoreMeta } from "@/lib/utils";

export function ScoreRing({ score }: { score: number }) {
  const meta = getScoreMeta(score);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const filled = (score / 10) * circ;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg
          viewBox="0 0 124 124"
          className="w-full h-full"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="62"
            cy="62"
            r={r}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="11"
          />
          <circle
            cx="62"
            cy="62"
            r={r}
            fill="none"
            stroke={meta.ring}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circ - filled}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-bold tabular-nums leading-none"
            style={{ color: meta.color }}
          >
            {score}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">/10</span>
        </div>
      </div>
      <span
        className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
        style={{
          color: meta.color,
          background: meta.bg,
          border: `1px solid ${meta.border}`,
        }}
      >
        {meta.label}
      </span>
    </div>
  );
}
