CREATE TABLE department (
id INT PRIMARY KEY,
department  VARCHAR (30) NOT NULL
);

CREATE TABLE title (
id INT PRIMARY KEY,
title  VARCHAR (30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL
);

CREATE TABLE  employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT ,
    manager_id 

);