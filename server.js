var inquirer = require('inquirer');
  
  // get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tortas408!',
  database: 'test'
});
 
// // simple query
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
 
// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);

// start of program 
const  start = () => {

inquirer
  .prompt([
    {
        type: 'checkbox',
        name: 'license',
        message: 'Please choose an option!',
        choices: ['view all departments', 'view all roles','view all employees','add a department', 'add a role','add an employee','update an employee role']
  
       
        
      },    
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
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