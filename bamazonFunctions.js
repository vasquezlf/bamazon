const mysql = require("mysql");
const bamazonPrompts = require("./bamazonPrompts")
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password:"",
  database: "bamazon"
});

// Definition: This function reads all columns from products table and prints
//              product id, name, and price.
function readTable() {
  let query = connection.query("SELECT * FROM products", (error, response) => {
    if(error) throw error;

    // console.log(JSON.stringify(response, null, 2));
    console.log("");
    console.log("------------------------------------------");
    console.log(`  ID  |    Product Name    |    Price   `);
    console.log("------------------------------------------");

    response.forEach(product => {
      console.log(`  ${product.item_id}       ${product.product_name}           ${product.price}`);

    });
    console.log("\nPress any key...\n");
  });
  // connection.end();
};


// Definition: This function checks the quantity of a product and uses product_ID to identify product
//            Go back to prompt screen
function checkQuantity(item_id, quantityOrdered) {
  let query = connection.query("SELECT product_name, stock_quantity, item_id FROM products WHERE item_id=?", [item_id],
  (error, response) => {
    if (error) throw error;
    response.forEach(product => {
      // DEV: Log info
      console.log(`Product: ${product.product_name} | Quantity: ${product.stock_quantity} | Ordered: ${quantityOrdered}`);

      // Check if enough item is in stock
      if(product.stock_quantity < quantityOrdered) {
       console.log(`\nNot enough ${product.product_name}s in stock...\n`);
       bamazonPrompts.start();
      }


      // console.log("IM IN ELSE. Print item_id: ", product.item_id);
      buy(product.item_id, quantityOrdered);

      // Get order for customer
      takeOrder(product.item_id, product.product_name, quantityOrdered);
    });
  });
};


// Definition: This function "purchases" a product. Takes in product_id and qty
function buy(productOrdered, quantityOrdered) {
  let query = connection.query("SELECT * FROM products WHERE item_id=?", [productOrdered],
  (error, response) => {
      if (error) throw error;
      // Update the product's quantity
      // Step 1: Get the quantity of items in stock
      let quantityFromTable = parseInt(response[0].stock_quantity);

      // Step 2: Perform calculation to get the new stock_quantity
      quantityFromTable -= quantityOrdered;

      // Step 3: Make second query to UPDATE stock_quantity
      let updateStockQuery = connection.query("UPDATE products SET ? WHERE ?", [
        {
          stock_quantity: quantityFromTable
        },
        {
          item_id: productOrdered
        }
      ]);


  });
};


// Definition: This function fetches latest order from database
function readOrder() {
  let query = connection.query("SELECT * FROM orders", (error, response) => {

    if(error) throw error;

    const latestOrder = response.length - 1;

    let cart = response[latestOrder]


    console.log(`*************************`);
    console.log(`You ordered ${cart.order_quantity} ${cart.product_name}(s) for $${cart.order_total}`);
    console.log("");
  });
};

// Definition: This function writes current order to database
function takeOrder(itemId, productName, orderQuantity) {
  console.log("IM IN TAKE ORDER", nm, productName, orderQuantity);

  orderQuantity = parseInt(orderQuantity);

  // let query = connection.query("INSERT INTO orders SET ?",
  // {
  //   item_id: itemId,
  //   product_name: productName,
  //   order_quantity: orderQuantity
  //   // order_total: orderTotal
  // }, (error, response) => {
  //   if (error) throw error;
  //
  //   // response.forEach()
  //   console.log(response);
  //   console.log(response.affectedRows + " orders inserted!\n");
  //
  // });

  let query = connection.query(
  "INSERT INTO products SET ?",
  {
    item_id: itemId,
    product_name: productName,
    order_quantity: orderQuantity,
    order_total: orderTotal
  }, (error, response) => {

    if(error) throw error;
    console.log(response.affectedRows + " songs inserted!\n");
  });
};



// IMPORTANT: Export functions and variables as objects
module.exports =  {
  readTable,
  checkQuantity,
  readOrder
};
