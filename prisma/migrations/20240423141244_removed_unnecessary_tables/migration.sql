/*
  Warnings:

  - You are about to drop the `PasswordRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoppingPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ShoppingPreferenceToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ShoppingPreferenceToUser` DROP FOREIGN KEY `_ShoppingPreferenceToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ShoppingPreferenceToUser` DROP FOREIGN KEY `_ShoppingPreferenceToUser_B_fkey`;

-- DropTable
DROP TABLE `PasswordRequest`;

-- DropTable
DROP TABLE `ShoppingPreference`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `_ShoppingPreferenceToUser`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `activationCode` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
