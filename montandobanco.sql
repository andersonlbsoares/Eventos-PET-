CREATE TABLE admin (
  admin_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  admin_username VARCHAR(50) NOT NULL,
  admin_password VARCHAR(50) NOT NULL
);

CREATE TABLE event (
  event_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  event_name VARCHAR(50) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  event_start_date DATE NOT NULL,
  event_end_date DATE NOT NULL,
  event_workload INT NOT NULL
);

CREATE TABLE person (
  person_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  person_full_name VARCHAR(100) NOT NULL,
  person_email VARCHAR(100) NOT NULL,
  person_enrollment VARCHAR(20) NOT NULL,
  person_course VARCHAR(50) NOT NULL,
  person_rfid VARCHAR(20) NOT NULL


  );

CREATE TABLE external_person (
  external_person_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  external_person_full_name VARCHAR(100) NOT NULL,
  external_person_email VARCHAR(100) NOT NULL,
  external_person_cpf VARCHAR(14) NOT NULL,
  external_person_responsible_person_id INT NOT NULL,
  FOREIGN KEY (external_person_responsible_person_id) REFERENCES person (person_id) ON DELETE CASCADE
);


CREATE TABLE event_person (
  event_person_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  event_person_event_id INT NOT NULL,
  event_person_person_id INT NOT NULL,
  event_person_person_external BOOLEAN NOT NULL,
  event_person_presence BOOLEAN NOT NULL,
  FOREIGN KEY (event_person_event_id) REFERENCES event (event_id) ON DELETE CASCADE

);