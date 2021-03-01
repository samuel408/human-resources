var inquirer = require('inquirer');
const mysql = require('mysql2');
const sqlite3 = require('sqlite3').verbose();
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tortas408!',
    database: 'db/employees.db'
  });
   
  connection.query(
      'SELECT * FROM `departments` ',
      function(err, results, fields) {
        // console.log(results); // results contains rows returned by server
      //   console.log(fields); // fields contains extra meta data about results, if available
      }
    );
      

// Connect to database
const db = new sqlite3.Database('./db/employees.db', err => {
  if (err) {
    return console.error(err.message);
  }

});

//chose to view all departments 
const viewDepartments = () =>{
 
    db.serialize(function() {
      
        db.each("SELECT * FROM departments", function(err, row) {
            console.table([
                {
                    Id: row.id,
                    Department:  row.department
                }
            ]);
        });
      });
      
      db.close();
      
    };
    
    const viewRoles = () => {

        db.serialize(function() {
          
            db.each("SELECT * FROM titles", function(err, row) {
                console.table([
                    {
                        Id: row.id,
                        role: row.title,
                        salary: row.salary,
                        department_id: row.department_id

                    }
                ]);
            });
          });
          
          db.close();
        
};

const viewEmployees = () => {

    db.serialize(function() {
      
        db.each("SELECT * FROM employee", function(err, row) {
            console.table([
                {
                    Id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    role_id: row.role_id,
                    manager_id: row.manager_id
                }
            ]);
        });
      });
      
      db.close();
    
};

const addDepartment = () => {

    inquirer
  .prompt([
    {
        type: 'input',
        name: 'department',
        message: 'Please enter new department'
      },    
  ])
  .then(answers => {
    // calls differnt functions based on answer
    var department = answers.department;
    var stmt = db.prepare("INSERT INTO departments (department) values (?)");
        stmt.run(department);
    stmt.finalize();

    console.log("Added the " + department + " department!")
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

}; 

const addRole = () => {

    inquirer
  .prompt([
    {
        type: 'input',
        name: 'role',
        message: 'Please enter the new role!'
      }, 
       { 
      type: 'input',
      name: 'salary',
      message: 'Please enter the salary for this role .'
    }, 
    {
    type: 'input',
    name: 'department',
    message: 'Please enter the department id'
  } 
  ])
  .then(answers => {
    // calls differnt functions based on answer
    var role = answers.role;
    var salary =  answers.salary;
    var department = answers.department;

    var stmt = db.prepare("INSERT INTO titles (title, salary, department_id) values (?,?,?)");
        stmt.run(role,salary,department);
    stmt.finalize();

    console.log("Added the " + role + " role !")
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

}; 

const addEmployee = () => {

    inquirer
  .prompt([
    {
        type: 'input',
        name: 'first',
        message: 'Please enter the first name of the new employee.'
      }, 
       { 
      type: 'input',
      name: 'last',
      message: 'Please enter the last name of the new employee.'
    }, 
    {
    type: 'input',
    name: 'role',
    message: 'Please enter the role id'
  },
  {
    type: 'input',
    name: 'manager',
    message: 'Please enter the manager id'
  } 
  ])
  .then(answers => {
    // calls differnt functions based on answer
    var first = answers.first;
    var last =  answers.last;
    var role = answers.role;
    var manager = answers.manager;

    var stmt = db.prepare("INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)");
        stmt.run(first,last,role,manager);
    stmt.finalize();

    console.log("Added " + first + " "+ last  + " to the system !")
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

}; 

// start of program 
const  start = () => {

inquirer
  .prompt([
    {
        type: 'list',
        name: 'refresh',
        message: 'Please choose an option!',
        choices: ['view all departments', 'view all roles','view all employees','add a department', 'add a role','add an employee','update an employee role']
  
       
        
      },    
  ])
  .then(answers => {
    // calls differnt functions based on answer
    if (answers.refresh == 'view all departments'){
        viewDepartments()
    }

    if (answers.refresh == 'view all roles'){
        viewRoles()
    }

    if (answers.refresh == 'view all employees'){
        viewEmployees()
    }

    if (answers.refresh == 'add a department'){
        addDepartment()
    }

    if (answers.refresh == 'add a role'){
        addRole()
    }

    if (answers.refresh == 'add an employee'){
        addEmployee()
    }
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

}

start();