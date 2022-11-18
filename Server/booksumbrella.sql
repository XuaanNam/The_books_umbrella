create database thebooksumbrella -- drop database auctiondata
;
use thebooksumbrella
;
--ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123123123';
--flush privileges; 

create table customerdata(
id int not null primary key IDENTITY (197901,1),
lastname char(20) not null CHECK (lastname !=''),
firstname char(15) not null CHECK (firstname !=''),
birthdate date,
email char(50) not null UNIQUE CHECK (email !=''),
username char(30) not null UNIQUE CHECK (username !=''),
password char(100) not null CHECK (password !=''),
phone char(15),
address char(200),
avatar char(200),
classify char(20) default 'basic',
authentication BIT default 0
)
;
insert into customerdata (lastname, firstname, email, username, password, authentication) values
('admin', 'admin', 'admin@gmail.com', 'admin', '$2b$10$49gaTiDL9JLsckTIXI2cDekBBDBcHQrwf/oS5yLLr/KPVl6P4APJW', 1);
-- mật khẩu mặt định là 123 -- cái này hên xui 
-- drop table customerdata;

create table product(
id int not null primary key IDENTITY,
image char(200),
productName char(100) not null CHECK (productName !=''),
author char(70) not null CHECK (author !=''),
length char(10) not null CHECK (length !=''),
width char(10) not null CHECK (width !=''),
price MONEY not null CHECK (price !=''),
publicationDate date not null,
quantity int default 0, -- số lượng sách trong kho 
description text
)
; -- drop table product;

create table classifycustomer(
id int not null primary key IDENTITY,
basic int default 0,
silver int default 0,
gold int default 0,
diamond int default 0
)
;  -- drop table classifycustomer;


create table classifybooks(
id int not null primary key IDENTITY,
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

create table alltransaction(
id int not null primary key IDENTITY,
idProduct int  not null CHECK (idProduct !=''),
idCustomer int  not null CHECK (idCustomer !=''),
timeOfPurchase date,
price MONEY not null,
amount int not null, 
transactionInfor text,
foreign key (idCustomer) references customerdata(id),
foreign key (idProduct) references product(id)
)
;  -- drop table transaction;

create table cart(
id int not null primary key IDENTITY,
idProduct int  not null CHECK (idProduct !=''),
idCustomer int  not null CHECK (idCustomer !=''),
foreign key (idCustomer) references customerdata(id),
foreign key (idProduct) references product(id)
);

