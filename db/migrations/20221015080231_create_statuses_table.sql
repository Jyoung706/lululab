-- migrate:up
CREATE TABLE statuses (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

-- migrate:down

DROP TABLE statuses;