import { generateText, Output } from "ai";
import { FEEDBACK_PROMPT } from "@/lib/constant";
import { NextResponse } from "next/server";
import { openrouter } from "@/lib/ai";
import z from "zod";
import prisma from "@/lib/db";

const feedbackSchema = z.object({
  overallImpression: z.string(),

  strengths: z.array(z.string()),

  areasToImprove: z.array(z.string()),

  finalVerdict: z.object({
    score: z.number(),
    justification: z.string(),
  }),
});

export async function POST(req: Request) {
  try {
    const { conversation, interviewId } = await req.json();

    const prompt = FEEDBACK_PROMPT.replace(
      "{{ conversation }}",
      JSON.stringify(conversation),
    );
    const { output } = await generateText({
      model: openrouter("openai/gpt-oss-120b:free"),

      output: Output.object({ schema: feedbackSchema }),

      prompt,
    });

    const interview = await prisma.interview.findFirst({
      where: { id: interviewId },
    });

    if (!interview) {
      return new NextResponse("Interview not found", { status: 404 });
    }

    await prisma.interview.update({
      where: { id: interview.id },
      data: {
        transcript: conversation,
        status: "COMPLETED",
        feedback: output,
        score: output.finalVerdict.score,
      },
    });
    return Response.json(output);
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
