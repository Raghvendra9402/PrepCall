-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "status" "InterviewStatus" NOT NULL DEFAULT 'IN_PROGRESS',
ALTER COLUMN "transcript" DROP NOT NULL,
ALTER COLUMN "feedback" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL;
