DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT UNIQUE,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Harry Potter and Deathly Hallows", "Books", 29.99, 20),
	   ("Cat Collar", "Pets", 9.99, 17),
	   ("Set of Mugs", "Kitchen", 19.99, 39),
	   ("TV", "Electronics", 499.99, 14),
	   ("Sweater", "Apparel", 39.99, 16),
	   ("Shorts", "Apparel", 19.99, 46),
	   ("IPhone", "Electronics", 999.99, 9),
	   ("Baseball Bats", "Sports", 69.99, 23),
	   ("Barbie Doll", "Toys", 29.99, 24),
	   ("Cat Toy", "Pets", 5.99, 11)