-- migrate:up
INSERT INTO departments (name) 
	VALUES ("내과"),("외과"),("가정의학과"),("정형외과"),("이비인후과"),("피부과");

-- migrate:down
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE departments;
SET FOREIGN_KEY_CHECKS = 1;
