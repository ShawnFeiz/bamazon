const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");

//===================================================================

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
            showProducts();
            
        } else {
            quit();
        }

    })
}
//===================================================================

function showProducts() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, results) {
    if (err) throw err;

    console.log(`
    ID: ${results.item_id}\n
    Name: ${results.product_name}\n
    Price: ${results.price}\n`);

    // console.log(results);
    begin();
    });
}

//===================================================================

function begin() {
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
    inquirer.prompt([
        {
            name: "askID",
            type: "input",
            message: "Interested in an item? Enter the ID of the product you would like to purchase: "
        },
        {
            name: "units",
            type: "input",
            message: "How many would you like to buy? "
        }
    ]).then(function(answer){
        console.log(answer.askID);
        console.log(answer.units);

        //if the quanity wanted is less than the database stock amount then we're good to proceed
        //else we have to alert the user that there is 'Insufficient quanitity!'


    })
}
//===================================================================

//end the application with a thank you to the user in green (green is known for a gentle user experience)
function quit() {
    console.log(chalk.hex('#32CD32')("Thanks for stopping by! See you next time!"));
    connection.end();
}

//===================================================================