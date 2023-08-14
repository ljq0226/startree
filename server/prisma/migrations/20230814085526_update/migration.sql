/*
  Warnings:

  - You are about to drop the column `forwardPostId` on the `Forward` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Forward` DROP FOREIGN KEY `Forward_forwardPostId_fkey`;

-- AlterTable
ALTER TABLE `Forward` DROP COLUMN `forwardPostId`;

-- AddForeignKey
ALTER TABLE `Forward` ADD CONSTRAINT `Forward_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
