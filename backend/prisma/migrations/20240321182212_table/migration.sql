-- CreateTable
CREATE TABLE `marketing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penjualan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_number` VARCHAR(255) NOT NULL,
    `marketing_id` INTEGER NULL,
    `date` DATE NULL,
    `cargo_fee` DOUBLE NULL,
    `total_balance` DOUBLE NULL,
    `grand_total` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayaran` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(0) NULL,
    `marketing_id` INTEGER NULL,
    `bulan` VARCHAR(255) NOT NULL,
    `pay` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `penjualan` ADD CONSTRAINT `penjualan_marketing_id_fkey` FOREIGN KEY (`marketing_id`) REFERENCES `marketing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_marketing_id_fkey` FOREIGN KEY (`marketing_id`) REFERENCES `marketing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
