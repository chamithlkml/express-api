/*
  Warnings:

  - You are about to drop the `passwordRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `passwordRequest`;

-- CreateTable
CREATE TABLE `PasswordRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resetKey` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
