-- migrate:up
INSERT INTO options (hospital_id,saturday,saturday_close_time)
	VALUES (1,1,"13:00");

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE options;
SET FOREIGN_KEY_CHECKS = 1;