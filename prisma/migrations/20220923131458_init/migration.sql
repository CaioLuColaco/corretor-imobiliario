/*
  Warnings:

  - You are about to drop the column `type` on the `imoveis` table. All the data in the column will be lost.
  - Added the required column `imovel_type` to the `imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `imoveis` DROP COLUMN `type`,
    ADD COLUMN `imovel_type` MEDIUMTEXT NOT NULL;
