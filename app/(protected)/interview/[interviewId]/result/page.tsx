import { ResultCard } from "@/components/shared/result-card";
import prisma from "@/lib/db";
import { Feedback, TranscriptMessage } from "@/lib/types";
import { redirect } from "next/navigation";

interface ResultPageProps {
  params: Promise<{
    interviewId: string;
  }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { interviewId } = await params;
  const interview = await prisma.interview.findUnique({
    where: {
      id: interviewId,
    },
  });

  if (!interview) {
    return redirect("/dashboard");
  }

  if (!interview.transcript || !interview.feedback) {
    return redirect("/dashboard");
  }

  const interviewData = {
    ...interview,
    transcript: interview.transcript as unknown as TranscriptMessage[],
    feedback: interview.feedback as unknown as Feedback,
  };

  return <ResultCard interview={interviewData} />;
}
