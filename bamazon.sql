-- drop the database if exists (this is primarly for others if they are working off your code)
drop database if exists bamazon_db;

-- create the database if it otherwise doesn't exist (it doesn't due to the previous drop statement)
create database bamazon_db;

-- be sure to use the database you're working on
use bamazon_db;

-- create a table with the following columns
create table products (
    item_id integer(11) auto_increment not null,
    product_name varchar(100),
    department_name varchar(300),
    price integer(11) not null,
    stock_quantity integer(11),
    primary key (item_id)
);

-- set initial row data for table
insert into products (product_name, department_name, price)
values ("alexa", "electronics", 150), ("iPhone X", "electronics", 999), ("Rasberry Pi3", "electronics", 35), 
("mens jeans", "apparel", 20), ("womens joggers", "apparel", 20), ("Unisex Cubs Beanie", "apparel", 18),
("desk", "home_goods", 35), ("lamp", "home_goods", 25), ("bed", "home_goods", 175), ("rug", "home_goods", 20);

-- update stock_quantity column with 100 units of each product for easy testing/grading
update products
set stock_quantity = 100;

-- view the products table from the bamazon_db
select * from products;