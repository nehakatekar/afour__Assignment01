1) CREATE TABLE `expensedb`.`credentials` (
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`));

2) CREATE TABLE `expensedb`.`categories` (
  `serial` INT NULL,
  `category` VARCHAR(45) NULL);

3) CREATE TABLE `expensedb`.`categoryexpense` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `category` VARCHAR(45) NULL,
  `amount` FLOAT NULL,
  PRIMARY KEY (`id`));