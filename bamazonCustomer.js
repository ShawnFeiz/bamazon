const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");
//set tax rate. Let's say it 8% for now.
const tax_rate = 0.08;

//===================================================================

//connect to the local bamazon sql db server
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
//FUNCTIONS FUNCTIONS FUNCTIONS
//===================================================================

//Either quit the connection or show the user the products available
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

//once the products are shown we run the begin() function which will prompt the user to purchase products
function showProducts() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, results) {
    if (err) throw err;

    results.forEach(function(e){
        console.log(`${e.item_id} ${e.product_name} ${chalk.green(`$`)}${chalk.green(e.price)}\n----------------------\n`);
    })

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
            message: chalk.green("Interested in an item? Enter the ID of the product you would like to purchase: ")
        },
        {
            name: "units",
            type: "input",
            message: "How many would you like to buy? "
        }
    ]).then(function(answer){
        //query the entire db
        connection.query("SELECT * FROM products", function(err, results) {
        //coerce the strings into integers and store them in variables for later use
        var newUnits = parseInt(answer.units);
        var newID = parseInt(answer.askID);
       
        //if the number of units the user wants is greater than the stock_quantity then we cannot fulfill the order. 
        //else update the db and show the order todal ($). Factor in tax
        if(newUnits > results[newID - 1].stock_quantity){
            console.log('Insufficient quantity!');
            //allow the user to go back and keep shopping because at this point they were interested in purchasing
            begin();

          } else {
              const newStockQuantity = results[newID - 1].stock_quantity - newUnits;
              //update the database stock quanity 
                connection.query(`UPDATE products SET stock_quantity = ${newStockQuantity} WHERE item_id = ${newID}`, function(err, res){
                    
                    console.log("------------------------------");
                    //quick math to calculate the total cost of the order
                    const total = newUnits * results[newID -1].price + (tax_rate * results[newID -1].price);
                    console.log(`Your total is: $${total}`);
                    console.log(`Will that be ${chalk.green(`cash, card, or bitcoin?`)} Ha! Just kidding. Thanks for shopping!\n`);
                    
                    //ask our guest if they want to continue shopping. if not then quit by ending the connection.
                    inquirer.prompt([
                        {
                            name: "keepShopping",
                            type: "input",
                            message: chalk.bgMagenta("Would you like to continue shopping? [YES] or [NO]?"),
                            choices: ["YES", "NO"]
                        }
                    ]).then(function(answer){
                        if(answer.keepShopping.toUpperCase() === "YES"){
                            begin();    
                        } else {
                            quit();
                            }
                        })
                    });
                };
            });
        })
    }

//===================================================================

//end the application with a thank you to the user in green (green is known for a gentle user experience)
function quit() {
    console.log(chalk.hex('#32CD32')("\nThanks for stopping by! See you next time!\n"));
    connection.end();
}

//===================================================================


