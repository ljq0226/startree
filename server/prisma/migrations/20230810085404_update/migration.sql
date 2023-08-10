/*
  Warnings:

  - You are about to drop the column `linkUsers` on the `Post` table. All the data in the column will be lost.
  - Made the column `userName` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userName_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `linkUsers`,
    MODIFY `userName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
