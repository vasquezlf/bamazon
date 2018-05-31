DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price DECIMAL(10, 2),
  stock_quantity INTEGER(10)
);

CREATE TABLE orders(
  order_id SERIAL PRIMARY KEY,
  item_id INTEGER(5),
  product_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2),
  order_quantity INTEGER(10) NOT NULL,
  order_total DECIMAL(10, 2) NOT NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
  ("Shampoo", "Home", 4.50, 100),
  ("Soap", "Home", 2.00, 200),
  ("TV", "Electronics", 420.99, 45),
  ("Weed", "Pharmacy", 20, 500),
  ("Togo Boxes", "Food", 1.00, 12000),
  ("Scratching Post", "Home", 13.0, 0),
  ("Hamburger", "Food", 7, 360),
  ("iPhone X", "Electronics", 800, 12),
  ("Pills", "Pharmacy", 15.00, 35),
  ("Slippers", "Misc", 1.50, 1);

INSERT INTO orders(item_id, product_name, price, order_quantity, order_total)
VALUES(2, "Soap", 2, 10, 20),
(3, "TV", 420.99, 1, 420.99);

SELECT * FROM products;
SELECT * FROM orders;
