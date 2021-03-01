DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS title;
DROP TABLE IF EXISTS employee;

CREATE TABLE departments (
id INTEGER PRIMARY KEY,
department  VARCHAR(30) NOT NULL
);

CREATE TABLE title (
id INTEGER PRIMARY KEY,
title  VARCHAR (30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL
);

CREATE TABLE  employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT ,
    manager_id 

);