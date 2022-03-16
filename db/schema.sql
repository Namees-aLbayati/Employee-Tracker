DROP DATABASE IF EXISTS db_employees;
CREATE DATABASE db_employees;
USE db_employees;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Rule;

DROP TABLE IF EXISTS Employee;

CREATE TABLE Department(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    dep_name VARCHAR(40) NOT NULL
);




CREATE TABLE Role(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    salary INTEGER NOT NULL,
    dep_id INTEGER,
    FOREIGN KEY (dep_id) REFERENCES Department(id) ON DELETE SET NULL
);
CREATE TABLE Employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(30) NOT NULL ,
    l_name VARCHAR(30) NOT NULL,
    manager_id INTEGER,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE SET NULL,
        FOREIGN KEY (manager_id) REFERENCES Employee(id) ON DELETE SET NULL

    
);

INSERT INTO  Department(dep_name) VALUES
("marketing"),("Engineer"),("Maintanance"),("finance");

INSERT INTO Role(title,salary,dep_id) VALUES ("sales",1200,1),("SDE",3200,2),("Electric fixing",3000,3),("finance manager",3400,4);

INSERT INTO Employee (f_name,l_name,manager_id,role_id) VALUES("maria","noq",1,2),
("ahmed","noah",1,1),("reham","moh",1,4),("jacob","opert",1,3);