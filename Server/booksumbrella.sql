create database thebooksumbrella -- drop database auctiondata
;
use thebooksumbrella
;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nam123';
flush privileges;

create table customerdata(
id int not null primary key AUTO_INCREMENT,
lastname char(20) not null CHECK (lastname !=""),
firstname char(15) not null CHECK (firstname !=""),
birthdate date,
email char(50) not null UNIQUE CHECK (email !=""),
username char(30) not null UNIQUE CHECK (username !=""),
password char(100) not null CHECK (password !=""),
phone char(15),
address char(200),
avatar char(200),
classify char(20) default "basic",
authentication boolean default false
)
;
ALTER TABLE customerdata AUTO_INCREMENT = 659323832;
insert into customerdata (lastname, firstname, email, username, password, authentication) value 
('admin', 'admin', 'admin@gmail.com', 'admin', '$2b$07$wU8/x4Ke7v9Jq3f4./ZBo.7dCW1wYgBNbwaDMCSzIZ9CbXbZQgwYC', true);
-- mật khẩu mặt định là 12345678
-- drop table customerdata;

create table product(
id int not null primary key AUTO_INCREMENT,
image char(200),
productName char(100) not null CHECK (productname !=""),
author char(70) not null CHECK (author !=""),
translator char(70) not null CHECK (translator !=""),
price double not null CHECK (price !=""),
publisher char(70) not null CHECK (publisher !=""),
publicationDate date not null,
weight double not null CHECK (weight !=""),
packagingSize char(30) not null CHECK (packagingSize !=""),
Form char(30) not null CHECK (Form !=""),
quantity int default 0, -- số lượng sách trong kho 
description text(1000)
)
; -- drop table product;

create table classifycustomer(
id int not null primary key AUTO_INCREMENT,
basic int default 0,
silver int default 0,
gold int default 0,
diamond int default 0
)
;  -- drop table classifycustomer;


create table classifybooks(
id int not null primary key AUTO_INCREMENT,
romance int default 0,
fantasy int default 0,
scienceFiction int default 0,
thrillers int default 0,
horror int default 0,
selfHelp int default 0,
shortStories int default 0,
cookbooks int default 0,
history int default 0
)
;-- drop table classifybooks;

create table transaction(
id int not null primary key AUTO_INCREMENT,
idProduct int  not null CHECK (idProduct !=""),
idCustomer int  not null CHECK (idCustomer !=""),
timeOfPurchase date,
price double not null,
amount int not null, 
transactionInfor text(1000),
foreign key (idCustomer) references customerdata(id),
foreign key (idProduct) references product(id)
)
;  -- drop table transaction;

create table cart(
id int not null primary key AUTO_INCREMENT,
idProduct int  not null CHECK (idProduct !=""),
idCustomer int  not null CHECK (idCustomer !=""),
foreign key (idCustomer) references customerdata(id),
foreign key (idProduct) references product(id)
);


