CREATE DATABASE IF NOT EXISTS fyp_lists_project;
USE fyp_lists_project;

CREATE TABLE IF NOT EXISTS admin (
  email varchar(256) NOT NULL,
  password varchar(256),
  PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS student (
  email varchar(256),
  matriculation_number varchar(20) NOT NULL,
  password varchar(256),
  PRIMARY KEY (matriculation_number)
);

CREATE TABLE IF NOT EXISTS fyp (
  project_title varchar(256) NOT NULL,
  project_id varchar(256) NOT NULL,
  supervisor_id varchar(256) NOT NULL,
  student_matriculation_number varchar(20),
  is_reserved BOOLEAN,
  is_approved BOOLEAN,
  project_desc TEXT,
  PRIMARY KEY (project_id)
);