import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { category, difficulty, type } = await req.json();
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const interview = await prisma.interview.create({
      data: {
        userId,
        category,
        difficulty,
      },
    });

    return NextResponse.json(interview, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
