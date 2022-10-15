-- migrate:up
CREATE TABLE departments (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20)
);

-- migrate:down

DROP TABLE departments;