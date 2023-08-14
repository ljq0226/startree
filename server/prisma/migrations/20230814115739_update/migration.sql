/*
  Warnings:

  - Added the required column `forwardPostId` to the `Forward` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Forward` DROP FOREIGN KEY `Forward_postId_fkey`;

-- AlterTable
ALTER TABLE `Forward` ADD COLUMN `forwardPostId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Forward` ADD CONSTRAINT `Forward_forwardPostId_fkey` FOREIGN KEY (`forwardPostId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
