-- migrate:up
CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(30) NOT NULL UNIQUE,
  phone_number VARCHAR(30) NOT NULL,
  is_active TINYINT DEFAULT 1
);

-- migrate:down

DROP TABLE users;