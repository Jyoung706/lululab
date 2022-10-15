-- migrate:up
INSERT INTO clinic_types (name) 
	VALUES ("일반진료"),("건강검진"),("결과상담");

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE clinic_types;
SET FOREIGN_KEY_CHECKS = 1;