CREATE DATABASE IF NOT EXISTS fyp_lists_project;
USE fyp_lists_project;

CREATE TABLE IF NOT EXISTS user (
  email varchar(256) NOT NULL,
  password varchar(256),
  matriculation_number varchar(20),
  role varchar (20) NOT NULL,
  eligible boolean default false,
  PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS project (
  title varchar(256) NOT NULL,
  projno varchar(256) NOT NULL,
  email varchar(256) NOT NULL,
  supervisor varchar(256) NOT NULL,
  summary TEXT,
  selected BOOLEAN DEFAULT false,
  PRIMARY KEY (project_id)
);

CREATE TABLE IF NOT EXISTS reservation (
  projno varchar(256) NOT NULL,
  email varchar(256) NOT NULL,
  FOREIGN KEY (projno) REFERENCES fyp(projno) ON DELETE CASCADE,
  FOREIGN KEY (email) REFERENCES user(email) ON DELETE CASCADE,
  PRIMARY KEY (email, projno)
);

CREATE TABLE IF NOT EXISTS selection (
  projno varchar(256) NOT NULL,
  email varchar(256) NOT NULL,
  FOREIGN KEY (projno) REFERENCES fyp(projno) ON DELETE CASCADE,
  FOREIGN KEY (email) REFERENCES user(email) ON DELETE CASCADE,
  PRIMARY KEY (email, projno)
);

CREATE TABLE IF NOT EXISTS selectioninfo (
  id int NOT NULL,
  selectionopen boolean NOT NULL,
  selectionopentime bigint NOT NULL,
  selectionclosetime bigint NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO user (email, password) VALUES ("admin@admin.com", "$2b$08$/Mkq.4iKSdqteL1CPYEBbusYvf3e7qtm.Ql3ZgBO/6.out.s4xUMq");
INSERT INTO selectioninfo(id, selectionopen, selectionopentime) values(1,0,0);