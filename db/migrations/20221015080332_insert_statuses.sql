-- migrate:up
INSERT INTO statuses (name) 
	VALUES ("예약완료"),("예약취소"),("검진완료"),("미방문");

-- migrate:down
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE statuses;
SET FOREIGN_KEY_CHECKS = 1;
