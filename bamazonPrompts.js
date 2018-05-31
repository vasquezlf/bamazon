const inquirer = require("inquirer");

// NOTE: This does NOT get run
// const bamazonFunctions = require("./bamazonFunctions");


function start() {
  // NOTE: Temporary solution. Ideally this would be at the top
  const bamazonFunctions = require("./bamazonFunctions");

  // bamazonFunctions.readTable();
  inquirer.prompt([
  {
    name: "product_ID",
    type: "input",
    message: "Input ID of product you wish to purchase: "
  },
  {
    name: "quantity",
    type: "input",
    message: "How many do you wish to purchase: "
  }
]).then((answer)=> {
    const product_ID = answer.product_ID;
    const quantity = answer.quantity;

    // Check quantity and purchase if enough in stock
    bamazonFunctions.checkQuantity(product_ID, quantity);


    bamazonFunctions.readOrder();
    start();
  });
};

// IMPORTANT: Export functions and variables as objects
module.exports = {
  start
};
