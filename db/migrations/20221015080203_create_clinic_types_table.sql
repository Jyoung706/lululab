-- migrate:up
CREATE TABLE clinic_types (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50)
);

-- migrate:down

DROP TABLE clinic_types;