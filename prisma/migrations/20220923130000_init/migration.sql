/*
  Warnings:

  - Added the required column `finality` to the `imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `imoveis` ADD COLUMN `finality` MEDIUMTEXT NOT NULL,
    ADD COLUMN `type` MEDIUMTEXT NOT NULL;
