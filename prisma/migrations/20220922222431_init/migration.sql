-- CreateTable
CREATE TABLE `imoveis` (
    `idimovel` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(12, 2) NOT NULL,
    `title` MEDIUMTEXT NOT NULL,
    `description` LONGTEXT NULL,
    `district` MEDIUMTEXT NOT NULL,
    `street` MEDIUMTEXT NULL,
    `city` MEDIUMTEXT NOT NULL,
    `house_number` MEDIUMTEXT NULL,
    `area` DECIMAL(6, 2) NOT NULL,
    `monthly_payment` DECIMAL(12, 2) NULL,
    `bedrooms` INTEGER NULL,
    `suites` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `garages` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idimovel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photos` (
    `idphoto` INTEGER NOT NULL AUTO_INCREMENT,
    `idimovel` INTEGER NOT NULL,
    `codepic` MEDIUMTEXT NOT NULL,

    INDEX `idimovel`(`idimovel`),
    PRIMARY KEY (`idphoto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`idimovel`) REFERENCES `imoveis`(`idimovel`) ON DELETE NO ACTION ON UPDATE NO ACTION;
