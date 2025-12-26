-- CreateEnum
CREATE TYPE "EUserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "EUserRole" NOT NULL DEFAULT 'USER';
