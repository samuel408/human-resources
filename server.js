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