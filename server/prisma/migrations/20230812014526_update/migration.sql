/*
  Warnings:

  - You are about to drop the column `replyId` on the `Like` table. All the data in the column will be lost.
  - Made the column `postId` on table `Like` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `profileId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Like_userName_key` ON `Like`;

-- AlterTable
ALTER TABLE `Like` DROP COLUMN `replyId`,
    MODIFY `userName` VARCHAR(191) NULL,
    MODIFY `postId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `profileId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(191) NULL,
    `github` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Forward` ADD CONSTRAINT `Forward_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Star` ADD CONSTRAINT `Star_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
