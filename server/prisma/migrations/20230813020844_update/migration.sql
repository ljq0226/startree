/*
  Warnings:

  - You are about to drop the column `userName` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userName_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `userName`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `profileId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
