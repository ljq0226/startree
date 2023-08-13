/*
  Warnings:

  - Made the column `postId` on table `Forward` required. This step will fail if there are existing NULL values in that column.
  - Made the column `forwardPostId` on table `Forward` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `Star` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Forward` DROP FOREIGN KEY `Forward_forwardPostId_fkey`;

-- DropForeignKey
ALTER TABLE `Star` DROP FOREIGN KEY `Star_postId_fkey`;

-- AlterTable
ALTER TABLE `Forward` MODIFY `postId` INTEGER NOT NULL,
    MODIFY `forwardPostId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Star` MODIFY `postId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Forward` ADD CONSTRAINT `Forward_forwardPostId_fkey` FOREIGN KEY (`forwardPostId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Star` ADD CONSTRAINT `Star_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
