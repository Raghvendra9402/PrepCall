import { ResultCard } from "@/components/shared/result-card";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface ResultPageProps {
  params: Promise<{
    interviewId: string;
  }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { interviewId } = await params;
  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
    },
  });

  if (!interview) {
    return redirect("/dashboard");
  }

  return <ResultCard interview={interview} />;
}
