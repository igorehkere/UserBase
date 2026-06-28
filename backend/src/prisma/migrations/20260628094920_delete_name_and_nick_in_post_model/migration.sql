/*
  Warnings:

  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `nick` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_nick_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "name",
DROP COLUMN "nick";
