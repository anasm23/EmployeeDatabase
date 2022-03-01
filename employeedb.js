// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');

// Establishes Connection to MySql
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_DB'
});

connection.query = util.promisify(connection.query);
connection.connect(function (err) {
    if (err) throw err;
    prompt();
})
// Inquirer prompts user with options
const prompt = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to the Employee Database:',
            choices: [
                'Employees',
                'Departments',
                'Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'Employees':
                employeeView();
                break;

            case 'Departments':
                departmentView();
                break;

            case 'Roles':
                roleView();
                break;

            case 'Add Employees':
                employeeAdd();
                break

            case 'Add Departments':
                departmentAdd();
                break

            case 'Add Roles':
                roleAdd();
                break

            case 'Update Employee Role':
                employeeUpdate();
                break

            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);
        prompt();
    };
}

// queries employee table from employees database.
const employeeView = async () => {
    console.log('Employee table:');
    try {
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let emparr = [];
            res.forEach(employee => emparr.push(employee));
            console.table(emparr);
            prompt();
        });
    } catch (err) {
        console.log(err);
        prompt();
    };
}

// queries department table from employees database.
const departmentView = async () => {
    console.log('Department table:');
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let deptarr = [];
            res.forEach(department => deptarr.push(department));
            console.table(deptarr);
            prompt();
        });
    } catch (err) {
        console.log(err);
        prompt();
    };
}

// queries role table from employees database.
const roleView = async () => {
    console.log('Role table:');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let arr = [];
            res.forEach(role => arr.push(role));
            console.table(arr);
            prompt();
        });
    } catch (err) {
        console.log(err);
        prompt();
    };
}

// Promise queries employee and role tables to add new employee to db.
const employeeAdd = async () => {
    try {
        console.log('Add Employee to database: ');

        let roles = await connection.query("SELECT * FROM role");

        let managers = await connection.query("SELECT * FROM employee");

        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'First Name: '
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Last Name: '
            },
            {
                name: 'employeeRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "Employee ID: "
            },
            {
                name: 'employeeManagerId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "Manager ID: "
            }
        ])

        let result = await connection.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.employeeRoleId),
            manager_id: (answer.employeeManagerId)
        });

        console.log(`added ${answer.firstName} ${answer.lastName} to the database.`);
        prompt();

    } catch (err) {
        console.log(err);
        prompt();
    };
}

// Promise queries department table to add to employee db.
const departmentAdd = async () => {
    try {
        console.log('Enter new Department');

        let answer = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'Department Name: '
            }
        ]);

        let result = await connection.query("INSERT INTO department SET ?", {
            department_name: answer.deptName
        });

        console.log(`added ${answer.deptName} to the database.`)
        prompt();

    } catch (err) {
        console.log(err);
        prompt();
    };
}

// Promise queries role table to update employee db.
const roleAdd = async () => {
    try {
        console.log('Enter new Role');

        let departments = await connection.query("SELECT * FROM department")

        let answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Name: '
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Salary: '
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentId) => {
                    return {
                        name: departmentId.department_name,
                        value: departmentId.id
                    }
                }),
                message: 'Role: ',
            }
        ]);
        
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === answer.choice) {
                chosenDepartment = departments[i];
            };
        }
        let result = await connection.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        })

        console.log(`added ${answer.title} role to the database`)
        prompt();

    } catch (err) {
        console.log(err);
        prompt();
    };
}

// Promise queries tables to update employee db.
const employeeUpdate = async () => {
    try {
        console.log('Update Employee');
        
        let employees = await connection.query("SELECT * FROM employee");

        let employeeSelection = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Select Employee to update: '
            }
        ]);

        let roles = await connection.query("SELECT * FROM role");

        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'New Role: '
            }
        ]);

        let result = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

        console.log(`Role updated in the database.`);
        prompt();

    } catch (err) {
        console.log(err);
        prompt();
    };
}