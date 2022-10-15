-- migrate:up
CREATE TABLE options (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  hospital_id INT NOT NULL,
  saturday TINYINT DEFAULT 0,
  saturday_close_time VARCHAR(30),
  sunday TINYINT DEFAULT 0,
  sunday_close_time VARCHAR(30),
  holiday TINYINT DEFAULT 0,
  holiday_close_time VARCHAR(30),
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
);

-- migrate:down

DROP TABLE options;