-- Increase article URL field sizes to accommodate long Cloudinary URLs
ALTER TABLE `Article` MODIFY COLUMN `thumbnail` VARCHAR(2000) NOT NULL;
ALTER TABLE `Article` MODIFY COLUMN `articleImage` VARCHAR(2000) NOT NULL;
ALTER TABLE `Article` MODIFY COLUMN `articleFile` VARCHAR(2000) NOT NULL;
