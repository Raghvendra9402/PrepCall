"use client";

import { InterviewStatus } from "@/lib/generated/prisma/enums";
import { ListCheck, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function CellAction({
  id,
  status,
}: {
  id: string;
  status: InterviewStatus;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/interview/${id}/result`)}
          disabled={status !== "COMPLETED"}
        >
          <ListCheck className="mr-2 h-4 w-4" />
          View result
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/interview/${id}`)}
          disabled={status !== "IN_PROGRESS"}
        >
          <ListCheck className="mr-2 h-4 w-4" />
          Take interview
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
