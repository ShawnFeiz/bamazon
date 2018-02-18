const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_db"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

//===================================================================

function start() {
    inquirer.prompt([
        {
            name: "yesOrNo",
            type: "input",
            message: "Would you like to the see the available products? [YES] or [NO]?",
            choices: ["YES", "NO"]
        }
    ]).then(function(answer){
        if(answer.yesOrNo.toUpperCase() === "YES"){
            begin();
            
        } else {
            quit();
        }

    })
}

function showProducts() {
      connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log(results);
      });
    
}

function begin() {
    showProducts();

    inquirer.promt([
        {
        
        }
    ]).then(function(answer){

    })
}

function quit() {
    console.log("Thanks for stopping by! See you next time!");
    connection.end();
}
