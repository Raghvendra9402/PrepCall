import { columns } from "@/components/calls/columns";
import { DataTable } from "@/components/calls/data-table";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CallsPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const calls = await prisma.interview.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="container mx-auto py-10 px-2">
      <DataTable columns={columns} data={calls} />
    </div>
  );
}
