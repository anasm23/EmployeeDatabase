USE employee_DB;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Sott', 1, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'Bob', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Robby', 'Shotts', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carrie', 'Beasly', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Michael', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'James', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Abe', 'Labe', 6, null);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Sales');
INSERT INTO department (department_name)
VALUES ('Accounting');
INSERT INTO department (department_name)
VALUES ('Reception');
INSERT INTO department (department_name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('General Manager', 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesman', 70000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 60000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Receptionist', 30000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Human Resource Officer', 20000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 1000000, 0);