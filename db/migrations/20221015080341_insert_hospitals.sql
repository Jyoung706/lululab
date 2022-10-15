-- migrate:up
INSERT INTO hospitals (name,address,lunch_time,open,close,time_interval,department_id)
	VALUES("지은의원","서울특별시","13:00 ~ 14:00","09:00","18:00","30m",1),
    ("명의전준영","충청남도","12:00 ~ 13:00","09:00","17:00","1h",6),
    ("윤가정의학과","세종특별자치시","12:30 ~ 14:00","09:00","18:00","30m",3);

-- migrate:down

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE hospitals;
SET FOREIGN_KEY_CHECKS = 1;