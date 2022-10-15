-- migrate:up
CREATE TABLE hospitals (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  lunch_time VARCHAR(30) NOT NULL,
  open VARCHAR(30) NOT NULL,
  close VARCHAR(30) NOT NULL,
  time_interval VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  is_active TINYINT DEFAULT 1,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- migrate:down

DROP TABLE hospitals;