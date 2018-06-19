CREATE TABLE verify_table (
    `id` VARCHAR(16) NOT NULL,
    `password` VARCHAR(16) NOT NULL,
    `email` VARCHAR(32) NOT NULL,
    `verification_code` CHAR(32) NOT NULL,
    `submission_date` DOUBLE,
    PRIMARY KEY (`id`)
);

CREATE TABLE user_table (
    `id` VARCHAR(16) NOT NULL,
    `password` VARCHAR(16) NOT NULL,
    `email` VARCHAR(32) NOT NULL,
    `user_name` VARCHAR(32) NOT NULL,
    `user_icon` VARCHAR(32) NOT NULL,
    `level_4` INT(6),
    `level_6` INT(6),
    `toefl` INT(6),
    `IELTS` INT(6),
    `level_4_total` INT(6),
    `level_4_learned` INT(6),
    `level_4_review_target` INT(6),
    `level_4_review_learned` INT(6),
    `level_4_left` INT(6),
    `level_4_review_submission_date` DOUBLE,
    `level_6_total` INT(6),
    `level_6_learned` INT(6),
    `level_6_review_target` INT(6),
    `level_6_review_learned` INT(6),
    `level_6_left` INT(6),
    `level_6_review_submission_date` DOUBLE,
    `toefl_total` INT(6),
    `toefl_learned` INT(6),
    `toefl_review_target` INT(6),
    `toefl_review_learned` INT(6),
    `toefl_left` INT(6),
    `toefl_review_submission_date` DOUBLE,
    `IELTS_total` INT(6),
    `IELTS_learned` INT(6),
    `IELTS_review_target` INT(6),
    `IELTS_review_learned` INT(6),
    `IELTS_left` INT(6),
    `IELTS_review_submission_date` DOUBLE,
    PRIMARY KEY (`id`)
);

CREATE TABLE ori_level_4 (
    `id` int(6),
    `correct` int(6),
    `total` int(6),
    `rate` DOUBLE,
    `date` DOUBLE,
    `islearn` int(6)
);

CREATE TABLE user_dic(
    `Word` varchar(30) NOT NULL,
    `lx` longtext,
    PRIMARY KEY(Word)
);