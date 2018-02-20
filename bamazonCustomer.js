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


    // console.log(`Item Id Product Price`);
    // console.log(`${results[0].item_id} ${results[0].product_name} $${results[0].price}`);
    // console.log(`${results[1].item_id} ${results[1].product_name} $${results[1].price}`);
    // console.log(`${results[2].item_id} ${results[2].product_name} $${results[2].price}`);

    results.forEach(function(e){
        console.log(`${e.item_id} ${e.product_name} $${e.price}\n----------------------\n`);
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
        connection.query("SELECT * FROM products", function(err, results) {
        // console.log(answer.askID);
        // console.log(answer.units);
        //if the quanity wanted is less than the database stock amount then we're good to proceed
        //else we have to alert the user that there is 'Insufficient quanitity!'
        let newUnits = parseInt(answer.units);
       
        if(newUnits > results[newUnits - 1].stock_quantity){
            console.log('Insufficient quantity!');
          } else {
              var newStockQuantity = results[newUnits - 1].stock_quantity - newUnits;
              console.log(newStockQuantity);
          }

        // console.log(results[newUnits - 1].stock_quantity);

        // console.log(typeof(test));



         });
    })
}
//===================================================================

//end the application with a thank you to the user in green (green is known for a gentle user experience)
function quit() {
    console.log(chalk.hex('#32CD32')("Thanks for stopping by! See you next time!"));
    connection.end();
}

//===================================================================