-- migrate:up
INSERT INTO users (name,email,phone_number) VALUES ("정현빈","jung123@gmail.com","01012341234");

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE users;
SET FOREIGN_KEY_CHECKS = 1;