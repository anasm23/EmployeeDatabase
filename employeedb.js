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

// Inquirer prompts user with options,  
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

            case 'Employees':
                employeeAdd();
                break

            case 'Departments':
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

