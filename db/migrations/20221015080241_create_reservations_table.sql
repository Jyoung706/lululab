-- migrate:up
CREATE TABLE reservations(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  reservation_number INT UNIQUE,
  patient_name VARCHAR(20),
  date DATE,
  time VARCHAR(30),
  user_id INT NOT NULL,
  hospital_id INT NOT NULL,
  clinic_type_id INT NOT NULL,
  status_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME NULL ON UPDATE NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
  FOREIGN KEY (clinic_type_id) REFERENCES clinic_types(id),
  FOREIGN KEY (status_id) REFERENCES statuses(id)
);

-- migrate:down

DROP TABLE reservations;