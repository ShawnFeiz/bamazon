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

-- general select all statement to see the entire table
select * from products;
