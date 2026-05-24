import { InterviewBooth } from "@/components/shared/interview-booth";
import prisma from "@/lib/db";
import { ArrowLeft, CheckCircle2, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface InterviewIdPageProps {
  params: Promise<{
    interviewId: string;
  }>;
}

export default async function InterviewIdPage({
  params,
}: InterviewIdPageProps) {
  const { interviewId } = await params;
  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
    },
  });

  if (!interview) {
    return redirect("/dashboard");
  }

  if (interview.status === "COMPLETED") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>

          {/* Text */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Interview Completed
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            This interview has already been completed. Head back to your
            dashboard to start a fresh interview.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors w-full sm:w-auto justify-center"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Link>
            <Link
              href={`/interview/${interviewId}/result`}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-xl border border-gray-200 transition-colors w-full sm:w-auto justify-center"
            >
              View Result
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <InterviewBooth
        interviewId={interviewId}
        category={interview.category}
        difficulty={interview.difficulty}
      />
    </div>
  );
}
