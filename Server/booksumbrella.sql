create database thebooksumbrella -- drop database thebooksumbrella
;
use thebooksumbrella
;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nam123';
flush privileges;

-- ========================================================= TẠO BẢNG ============================================================
create table customerdata(
id int not null primary key AUTO_INCREMENT,
fullname char(60),
birthdate date,
email char(50) not null UNIQUE CHECK (email !=""),
username char(30) not null UNIQUE CHECK (username !=""),
password char(100) not null CHECK (password !=""),
phone char(15),
address char(200),
avatar char(200),
customerGenre int default 1,
authentication boolean default false
)
;
ALTER TABLE customerdata AUTO_INCREMENT = 659323832;

-- mật khẩu của admin mặt định là 12345678
-- drop table customerdata;

create table customergenres(
id int not null primary key AUTO_INCREMENT,
genre char (100) not null
)
;  -- drop table customergenres;

create table product(
id int not null primary key AUTO_INCREMENT,
image varchar(300),
productName varchar(300) not null CHECK (productname !=""),
chapter int,
author char(100) not null CHECK (author !=""),
translator char(100),
price double not null,
publisher int not null,
publicationDate char(100) not null,
age int not null,
packagingSize char(30) not null CHECK (packagingSize !=""),
form int not null,
quantity int default 0, -- số lượng sách trong kho 
description text(1000),
status int default 1
)
; -- drop table product;


create table bookgenredata(
id int not null primary key AUTO_INCREMENT,
productId int not null,
productGenreId int not null,
UNIQUE unique_index(productId, productGenreId)
)
; -- drop table bookgenredata;

create table classifyproducts(
id int not null primary key AUTO_INCREMENT,
typeOfBooks char (100) not null
)
; -- drop table classifyproducts;

create table productgenres(
id int not null primary key AUTO_INCREMENT,
genre char (100) not null,
classifyProductsId int  not null
)
;-- drop table productgenres;


create table classifypublishers(
id int not null primary key AUTO_INCREMENT,
publisher char (100) not null
)
;-- drop table classifypublishers;

create table productform(
id int not null primary key AUTO_INCREMENT,
form char (100) not null
)
;-- drop table productform;

create table productstatus(
id int not null primary key AUTO_INCREMENT,
status char (100) not null
)
;-- drop table productform;


create table transaction(
id int not null primary key AUTO_INCREMENT,
productId int  not null,
customerId int  not null,
timeOfPurchase datetime,
price double not null,
amount int not null, 
transactionInfor text(1000),
UNIQUE unique_index(productId, customerId, timeOfPurchase)
)
;  -- drop table transaction;

create table cart(
id int not null primary key AUTO_INCREMENT,
productId int  not null,
customerId int  not null,
quantity int not null default 1,
UNIQUE unique_index(productId, customerId)
)
;  -- drop table cart;

create table orders(
id int not null primary key AUTO_INCREMENT,
productId int  not null,
customerId int  not null,
quantity int not null default 1,
price double not null,
fullname char(60) not null,
email char(50) not null CHECK(email !=""),
phone char(15) not null,
address char(200) not null,
deliveryMethod int not null default 1,
paymentMethod int not null default 1,
timeOfOrder datetime,
discount int,
status int default 1,
pay int default 1
)
;  -- drop table orders;
ALTER TABLE orders AUTO_INCREMENT = 791928;

create table deliverymethod(
id int not null primary key AUTO_INCREMENT,
delivery char(70) not null
)
; 

create table paymentmethod(
id int not null primary key AUTO_INCREMENT,
payment char(70) not null
)
; 

create table discounttype(
id int not null primary key AUTO_INCREMENT,
type char(30) not null
)
;  -- drop table discounttype;

create table discountcode(
id int not null primary key AUTO_INCREMENT,
code char(30) not null,
discountTypeId int not null,
discountValue double not null
)
;  -- drop table discountcode;

create table orderstatus(
id int not null primary key AUTO_INCREMENT,
status char(30) not null
)
; 

create table payorder(
id int not null primary key AUTO_INCREMENT,
pay char(30) not null
)
; 

-- ========================================================= RÀNG BUỘC ============================================================

alter table customerdata add foreign key (customerGenre) references customergenres(id);
alter table productgenres add foreign key (classifyProductsId) references classifyproducts(id);

alter table bookgenredata add foreign key (productId) references product(id),
add foreign key (productGenreId) references productgenres(id);

alter table product add foreign key (publisher) references classifypublishers(id), 
add foreign key (form) references productform(id),
add foreign key (status) references productstatus(id);

alter table transaction add foreign key (customerId) references customerdata(id), 
add foreign key (productId) references product(id);

alter table cart add foreign key (customerId) references customerdata(id), 
add foreign key (productId) references product(id);

alter table orders add foreign key (customerId) references customerdata(id), 
add foreign key (productId) references product(id),
add foreign key (deliveryMethod) references deliverymethod(id),
add foreign key (paymentMethod) references paymentmethod(id),
add foreign key (discount) references discountcode(id),
add foreign key (status) references orderstatus(id),
add foreign key (pay) references payorder(id);

alter table discountcode add foreign key (discountTypeId) references discounttype(id);


-- ========================================================= Trigger View Proccedure ============================================================

-- call getProductByKeywords('%ănn%')
-- select * from ListAllProducts
delimiter $$
create view ListProducts as
	select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
		c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
	from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
	where p.status = 2
$$
-- drop view ListProducts   

delimiter $$
create view ListAllProducts as
	select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
		c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
	from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
$$
-- drop view ListAllProducts   

delimiter $$
create view ListAllOrders as
	select o.id, o.productId, p.productName, p.chapter, o.customerId, o.quantity, o.price, o.fullname, o.email, o.phone, o.address,
		d.delivery, pm.payment, o.timeOfOrder, dc.code as discountCode, dt.type as discountType, dc.discountValue, os.status,  po.pay
	from orders o
    inner join product p on p.id = o.productId
	inner join deliverymethod d on d.id = o.deliveryMethod 
	inner join paymentmethod pm on pm.id = o.paymentMethod 
	inner join discountcode dc on dc.id = o.discount 
    inner join discounttype dt on dt.id = dc.discountTypeId
	inner join orderstatus os on os.id = o.status 
	inner join payorder po on po.id = o.pay
$$
-- drop view ListAllOrders  

delimiter $$
create trigger TG_INSERT_ORDERS after insert on orders for each row  
begin
    update product set quantity = quantity - new.quantity  where id = new.productId;
    if(new.customerId != 659323833) then 
		delete from cart where customerId = new.customerId and productId = new.productId;
	end if;
end$$
-- drop trigger TG_INSERT_ORDERS   

delimiter $$
create procedure checkQuantity (IN productId int)
begin
    select quantity
    from product 
    WHERE id = productId and status = 2;
end$$ -- drop procedure checkQuantity

delimiter $$
create procedure getProductById(IN id int )
begin
    select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
			c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description, g.id as genreId
    from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
    WHERE p.id = id and p.status = 2;
end$$ -- drop procedure getProductById
 
delimiter $$
create procedure getProductByKeywords(IN keywords text )
begin
    select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
			c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
    from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
    WHERE p.status = 2 and (p.productName like  keywords  
            or p.author like keywords);
end$$ -- drop procedure getProductByKeywords

delimiter $$
create procedure getProductsByGenre(IN genre int )
begin
    select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
			c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
    from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
    WHERE b.productGenreId = genre and p.status = 2;
end$$ -- drop procedure getProductsByGenre            

delimiter $$
create procedure getProductsByPrice(IN minPrice double, maxPrice double )
begin
    select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
			c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
    from (bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId)
    where p.price >= minPrice and p.price <= maxPrice
    order by p.price;
    
end$$ -- drop procedure getProductsByPrice   

delimiter $$
create procedure getProductsByPublisher(IN publisher int )
begin
    select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
			c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
    from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
    WHERE p.publisher = publisher;
end$$ -- drop procedure getProductsByPublisher   

delimiter $$
create procedure getProductsByForm(IN form int )
begin
    select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
			c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
    from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
    WHERE p.form = form;
end$$ 

delimiter $$
create procedure getProductsByAge(IN age int )
begin
    select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
			c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
    from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
    WHERE p.age = age;
end$$ 

-- delimiter $$
-- create procedure getTransaction(IN id int )
-- begin
--     select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
-- 			c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description
--     from bookgenredata b 
-- 	inner join product p on p.id = b.productId 
-- 	inner join productgenres g on g.id = b.productGenreId 
-- 	inner join classifypublishers c on c.id = p.publisher 
-- 	inner join productform f on f.id = p.form 
-- 	inner join classifyproducts cp on cp.id = g.classifyProductsId
--     WHERE p.age = age;
-- end$$ 

delimiter $$
create procedure getCart (IN id int )
begin
	select p.id, p.image, p.productName, p.chapter, g.genre, cp.typeOfBooks, p.author, p.translator, p.price, 
		c.publisher, p.publicationDate, p.age, p.packagingSize, f.form, p.quantity, p.description , ct.quantity as cartQuantity, ct.id as cartId
	from bookgenredata b 
	inner join product p on p.id = b.productId 
	inner join productgenres g on g.id = b.productGenreId 
	inner join classifypublishers c on c.id = p.publisher 
	inner join productform f on f.id = p.form 
	inner join classifyproducts cp on cp.id = g.classifyProductsId
	inner join cart ct on ct.productId = p.id
	where ct.customerId = id;
end$$
-- drop procedure getCart   

delimiter $$
create procedure createProduct (IN image varchar(300),  productName varchar(300), chapter int, author char(100), translator char(100), price double, publisher int,
								publicationDate char(100), age int, packagingSize char(30), form int, quantity int, description text(1000), status int)
begin
	insert into product (image,productName,chapter,author,translator,price,publisher,publicationDate,age, packagingSize, form, quantity, description, status)
    values (image,productName,chapter,author,translator,price,publisher,publicationDate,age, packagingSize, form, quantity, description, status);
    
end$$
-- drop procedure createProduct  

-- ========================================================= SAMPLE DATA ============================================================

INSERT INTO `thebooksumbrella`.`customergenres` (`id`, `genre`) VALUES 
('1', 'basic'), 
('2', 'silver'),
('3', 'gold'),
('4', 'diamond');

INSERT INTO `thebooksumbrella`.`customerdata` (`id`, `email`, `username`, `password`, `authentication`) VALUES 
(659323832, 'admin@gmail.com', 'admin', '$2b$07$wU8/x4Ke7v9Jq3f4./ZBo.7dCW1wYgBNbwaDMCSzIZ9CbXbZQgwYC', '1'),
(659323833, 'tbucustomer@gmail.com', 'customer', '$2b$07$wU8/x4Ke7v9Jq3f4./ZBo.7dCW1wYgBNbwaDMCSzIZ9CbXbZQgwYC', '0'),
(659323834, 'xuaannam@gmail.com', 'xuannam', '$2b$07$wU8/x4Ke7v9Jq3f4./ZBo.7dCW1wYgBNbwaDMCSzIZ9CbXbZQgwYC', '0');

INSERT INTO `thebooksumbrella`.`classifyproducts` (`id`, `typeOfBooks`) VALUES 
('1', 'VĂN HỌC'),
('2', 'KINH TẾ'),
('3', 'TÂM LÝ - KỸ NĂNG SỐNG'),
('4', 'NUÔI DẠY CON'),
('5', 'SÁCH THIẾU NHI');

INSERT INTO `thebooksumbrella`.`productgenres` (`id`, `genre`, `classifyProductsId`) VALUES 
('1', 'Tiểu thuyết', '1'),
('2', 'Truyện ngắn - Tản văn', '1'),
('3', 'Light novel', '1'),
('4', 'Ngôn tình', '1'),
('5', 'Khởi Nghiệp - Làm Giàu', '2'),
('6', 'Quản trị - Lãnh đạo', '2'),
('7', 'Marketing - Bán hàng', '2'),
('8', 'Phân tích kinh tế', '2'),
('9', 'Kỹ năng sống', '3'),
('10', 'Rèn luyện nhân cách', '3'),
('11', 'Tâm lý', '3'),
('12', 'Sách cho tuổi mới lớn', '3'),
('13', 'Cẩm nang làm mẹ', '4'),
('14', 'Phương pháp giáo dục trẻ em', '4'),
('15', 'Phát triển trí tuệ cho trẻ', '4'),
('16', 'Phát triển kỹ năng cho trẻ', '4'),
('17', 'Manga - Comic', '5'),
('18', 'Kiến thức bách khoa', '5'),
('19', 'Tô màu - Luyện chữ', '5'),
('20', 'Kiến Thức - Kỹ Năng Sống Cho Trẻ', '5');

INSERT INTO `thebooksumbrella`.`classifypublishers` (`id`, `publisher`) VALUES 
('1', 'Nhà xuất bản Kim Đồng'),
('2', 'Nhà xuất bản Trẻ'),
('3', 'Skybooks'),
('4', 'NXB Hội Nhà Văn'),
('5', 'NXB Phụ Nữ'),
('6', 'NXB Văn Học'),
('7', 'NXB Thế Giới'),
('8', 'NXB Hà Nội'),
('9', 'NXB Hồng Đức'),
('10', 'NXB Công Thương'),
('11', 'NXB Tổng Hợp TPHCM'),
('12', 'NXB Dân Trí'),
('13', 'NXB Lao Động'),
('14', 'NXB Y Học'),
('15', 'NXB Thanh Niên'),
('16', 'Đông A'),
('17', 'NXB Mỹ Thuật');


INSERT INTO `thebooksumbrella`.`productform` (`id`, `form`) VALUES 
('1', 'Bìa cứng'),
('2', 'Bìa mềm'),
('3', 'Bộ hộp');

INSERT INTO `thebooksumbrella`.`productstatus` (`id`, `status`) VALUES ('1', 'Trong kho'),('2', 'Cửa hàng');


INSERT INTO `thebooksumbrella`.`product` (`image`, `productName`, `chapter`, `author`, `translator`, `price`, `publisher`, `publicationDate`, `age`, `packagingSize`, `form`, `quantity`, `description`) VALUES 
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg', 'Nhà Giả Kim (Tái Bản 2020)', NULL, 'Paulo Coelho', 'Lê Chu Cầu', '79000', '4', '2020', '13', '20.5 x 13', '2', '350', 'Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người. Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc. “Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_217480.jpg', 'Cây Cam Ngọt Của Tôi', NULL, 'José Mauro de Vasconcelos', 'Nguyễn Bích Lan, Tô Yến Ly', '108000', '4', '2020', '13', '20 x 14.5', '2', '562', '“Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng sống... một tác phẩm kinh điển của Brazil.” - Booklist \\n “Một cách nhìn cuộc sống gần như hoàn chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù người đọc ở lứa tuổi nào.” - The National \\n Hãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi. \\n Có hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu. \\n  Mở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil. '),
('https://cdn0.fahasa.com/media/catalog/product/6/0/600ra-bo-suoi---bm_1.jpg', 'Ra Bờ Suối Ngắm Hoa Kèn Hồng - Tặng Kèm Bookmark Bồi Hai Mặt + Thiệp Trái Tim In Bài Thơ Của Tác Giả', NULL, 'Nguyễn Nhật Ánh', NULL, '145000', '2', '2022', '13', '20 x 13', '2', '846', 'Ra bờ suối ngắm hoa kèn hồng là tác phẩm trong trẻo, tràn đầy tình yêu thương mát lành, trải ra trước mắt người đọc khu vườn trại rực rỡ cỏ hoa của vùng quê thanh bình, kèm theo đó là những “nhân vật” đáng yêu, làm nên một “thế giới giàu có, rộng lớn và vô cùng hấp dẫn” mà dường như người lớn đã bỏ quên đâu đó từ lâu. \\n Sau Tôi là Bê Tô, Có hai con mèo ngồi bên cửa sổ, Con chó nhỏ mang giỏ hoa hồng, đây là một cuốn sách nữa của nhà văn Nguyễn Nhật Ánh mà nhân vật chính là những bé động vật ngộ nghĩnh, được mô tả sống động dưới ngòi bút tài hoa và giàu tình thương. \\n Câu chuyện chạy qua 8 phần với 64 chương sách nhỏ đầy ắp lòng thương yêu, tính lương thiện, tình thân bạn bè, lòng dũng cảm và bao dung, đánh bạt sự ác độc và cả mọi thói xấu. Khép cuốn sách lại, tự nhiên thấy lòng mình dịu lắng, bình yên đến lạ lùng… '),
('https://cdn0.fahasa.com/media/catalog/product/b/i/bia_tudientiengem-_1_.jpg', 'Từ Điển Tiếng “Em” - Tái Bản 2021', NULL, 'Khotudien', NULL, '69000', '5', '2021', '13', '12 x 10', '2', '326', 'TỪ ĐIỂN TIẾNG “EM” – Định nghĩa về thế giới mới! \\n Bạn sẽ bất ngờ, khi cầm cuốn “từ điển” xinh xinh này trên tay. \\n Và sẽ còn ngạc nhiên hơn nữa, khi bắt đầu đọc từng trang sách… \\n Dĩ nhiên là vì “Từ điển tiếng “Em” không phải là một cuốn từ điển thông thường rồi! \\n  Nói đến “từ điển”, xưa nay chúng ta đều nghĩ về một bộ sách đồ sộ, giải thích ý nghĩa, cách dùng, dịch, cách phát âm, và thường kèm theo các ví dụ về cách sử dụng từ đó. \\n Tuy nhiên, với cuốn sách “Từ điển tiếng “em”, các bạn sẽ hết sức bất ngờ với những định nghĩa mới, bắt trend, sáng tạo, thông minh và vô cùng hài hước. \\n Tiếng “em” [danh từ] ở đây là tiếng lòng của những người yêu sự thật, ghét sự giả dối \\n Cô đơn [ tính từ ] không phải là không có ai bên cạnh, mà là người mình muốn ở cạnh lại không hề ở bên \\n Sống lỗi [ động từ ] là cách sống của mấy bạn có người yêu cái là bỏ bê bạn bè liền hà... \\n Nhưng đây không chỉ là cuốn sách chỉ biết nói dăm ba câu chuyện về tình yêu. Còn nhiều hơn thế! \\n Là những câu cửa miệng của giới trẻ thời nay; là hoạt động tưởng vô bổ nhưng cần thiết cho sự sống: ăn, ngủ, tắm, gội cũng được định nghĩa hết sức dí dỏm... Và cũng không thiếu những “tật xấu, thói hư” nghĩ đến đã thấy “tức cái lồng ngực”... \\n Và bạn yên tâm, “tập đoàn” Kho Từ Điển điều hành bởi Thịt Kho – Hiệp Thị - 2 chủ xị cho ra đời cuốn sách nhỏ bé xíu xiu nhưng mới mẻ và mặn mà vô cùng này sẽ khiến bạn thoát mác “người tối cổ” cười cả ngày không chán, nhìn bạn bè quanh mình bằng ánh mắt dễ thương, tận hưởng cuộc đời với những định nghĩa hoàn toàn!!! \\n Cuốn sách này giống như một chiếc hộp Pandora thú vị và hấp dẫn người đọc, vì bạn không thể đoán trước được tác giả sẽ “định nghĩa” câu nói đó theo nghĩa nào, cho ta thêm thích thú với những ngôn từ đáng yêu sử dụng mỗi ngày. \\n Vậy nên, ngay bây giờ, bạn đã sẵn sàng để mở ra những điều thú vị trong cuốn sách này chưa!!!'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_227604.jpg', 'Những Đêm Không Ngủ Những Ngày Chậm Trôi', NULL, 'A Crazy Mind', NULL, '86000', '6', '2021', '13', '	20.5 x 13', '2', '523', '“Những đêm không ngủ, những ngày chậm trôi” đại diện cho một hành tinh mới - nơi nỗi đau tinh thần được đưa ra ánh sáng và chữa lành. \\n Cuốn sách là tập hợp những câu chuyện có thật của những số phận khác nhau đang gặp phải các vấn đề về tâm lý: trầm cảm, rối loạn lo âu, rối loạn lưỡng cực… và những người đang học tập và làm việc trong ngành tâm lý học. \\n “Nếu thế giới này còn thứ gì giữ bạn lại, là tình yêu thương hay sự quan tâm trong phút giây nào đó, mong bạn đừng gạt nó đi, bạn đừng bỏ qua sự cố gắng của bản thân dù nhỏ bé nhất!”- Khải Trạch. Hóa ra tận cùng nỗi đau và tận cùng sự chống chọi là một lòng tha thiết sống, lòng tha thiết bám rễ ở cuộc đời này như thế. \\n “Những đêm không ngủ, những ngày chậm trôi”  là một khoảng lặng giữa những nốt nhạc vội vã chạy nhảy giữa cuộc sống hiện đại, để những con người dù mang trong mình những tổn thương tâm lý hay không đều cùng ngồi lại bên nhau, soi tỏ tâm hồn nhau bằng ánh sáng của sự thấu cảm, trao gửi cho nhau thương yêu và kết nối để chữa lành. \\n Thông qua cuốn sách, A Crazy Mind mong muốn đưa một góc nhìn mới đến độc giả về thế giới của những con người đang phải đấu tranh với những nỗi đau tinh thần cũng như những câu chuyện thực tế ít được đề cập của những người đang học tập và làm việc trong ngành tâm lý học. \\n Đây không phải cuốn sách đọc để giải trí, mà là một bức tranh “cảm xúc” được ghép từ những câu chuyện đủ đầy các mảng sáng tối lẩn khuất thẳm sâu trong tâm hồn. Hy vọng đây là một món ăn tinh thần làm đầy thêm sự phong phú trong tâm hồn bạn.'),
('https://cdn0.fahasa.com/media/catalog/product/b/i/bia_chuyen-ke-rang-co-nang-va-toi_final.jpg', 'Chuyện Kể Rằng Có Nàng Và Tôi', NULL, 'Nhiều Tác Giả', NULL, '72000', '5', '2022', '13', '17 x 11', '2', '623', 'Đối với những người trẻ được sống như ý không phải lúc nào cũng dễ dàng, đặc biệt với những người đã phải trải qua một quãng thời gian khó khăn rồi mới có thể tìm được con người thật của mình, là chính mình. Những câu chuyện tình của họ có nhiều dang dở vì những mặc cảm, rào cản, khao khát được làm điều mình muốn, gắn bó với người mình yêu thương cả đời là các mong ước nhỏ trong lòng. Để rồi khi không thể giãi bày cùng ai, họ mang những điều thầm kín thổi vào những vần thơ nơi chỉ có những “câu chuyện về nàng và tôi”. \\n “Chuyện kể rằng có nàng và tôi” là cuốn sách nhỏ với những áng thơ nhẹ nhàng, lãng mạn thể hiện mối giao hòa đẹp đẽ trong tâm hồn những người con gái. Tình yêu của họ vượt trên tất thảy mọi định kiến, chỉ còn lại là những cảm xúc dạt dào, vô tận. Trong những câu thơ đôi khi họ là những người lãng du cô đơn bước chân qua đám đông tranh cãi ồn ào và luôn khao khát tìm kiếm hạnh phúc. \\n “em chỉ là kiến nhỏ \\n còn nàng lại là mây \\n ngẩng đầu lên sẽ thấy \\n mà sao với được đây” \\n Rồi đôi khi lại đưa ta vào những cung bậc hân hoan, hạnh phúc của tình yêu, sự bao dung của những trái tim ngập tràn nắng ấm, vượt qua mọi ánh nhìn xa lạ của xã hội, mãi khiến ta muốn đắm chìm trong đó. \\n “Ta yêu nhau từ những điều nhỏ nhặt \\n Chút vụn vặt ta góp lại yêu thương \\n Ta yêu nhau giữa cuộc sống vô thường \\n Nắm tay nhau qua một đời nghiêng ngả” \\n Dưới ngòi bút uyển chuyển, sắc sảo của nhiều tác giả, “Chuyện kể rằng có nàng và tôi” không chỉ là một cuốn sách về tình yêu dang dở, bao cảm xúc mật ngọt tán tỉnh của những nàng đồng tính nữ mà còn là những bản ngã, niềm tin và hy vọng, đủ ngọt ngào để quyến rũ tâm hồn độc giả. \\n Cuốn sách giúp bạn gỡ bỏ những bức tường thành định kiến để đắm mình trong tình yêu nhiệm màu, vì ai rồi cũng có quyền hạnh phúc trong thế giới nhỏ của họ dù là giới tính nào đi chăng nữa.'),
('https://cdn0.fahasa.com/media/catalog/product/c/h/chitose-trong-chai-ramune---tap-1---ban-gioi-han.jpg', 'Chitose Trong Chai Ramune - Tập 1 - Bản Giới Hạn - Tặng Bìa Áo Limited + 02 Postcard', '1', 'Hiromu, Raemz', 'Suigyo', '105000', '1', '2022', '13', '19 x 13', '2', '423', '\"Chitose lớp E là một tên cặn bã lăng nhăng.” - Bị chỉ trích như vậy trên web kín của trường, nhưng Chitose Saku vẫn là riajuu “ngự trị trên đỉnh” của trường Fuji. \\n Xung quanh cậu là những người bạn xuất sắc về mọi mặt. Một Hiragii Yuuko hồn nhiên, năng động, một Uchida Yua hiền lành, dễ thương, một Nanase Yuzuki bí ẩn, quyến rũ, một Aomi Haru tràn đầy sức sống... Nhưng ngay khi vừa bắt đầu năm học mới với những người bạn thân, Saku lại nhận được lời đề nghị giúp đỡ một hikikomori nọ tái hòa nhập với cuộc sống học đường. Đây là câu chuyện về dàn “hậu cung” riajuu của Chitose Saku, hay là...? \\n Bộ truyện tình cảm hài về thế giới của các riajuu, mang theo làn gió của thời đại mới, đã chính thức bắt đầu!! \\n * CHITOSE TRONG CHAI RAMUNE là tác phẩm về chủ đề thanh xuân học đường đến từ NXB Shogakukan, 2 năm liên liên tiếp (2021-2022) đạt top 1 trên bảng xếp hạng Kono Light Novel Ga Sugoi. \\n Số tập: 6+'),
('https://cdn0.fahasa.com/media/catalog/product/6/0/600_nh-s_ch-th_-gi_i-otome-game...-5.jpg', 'Thế Giới Otome Game Thật Khắc Nghiệt Với Nhân Vật Quần Chúng', '5', 'Mishima Yomu', 'Roku', '129000', '7', '2022', '13', '18 x 13', '2', '415', '“Nếu huy hiệu mà cũng hiện ra trên bàn tay của Leon thì… chúng tớ tâm đầu ý hợp nhỉ?” \\n Noelle, người luôn thầm nghĩ về Leon, đang tỏ ra rất hạnh phúc khi huy hiệu của Vu Nữ đang hiện trên tay mình. Tuy nhiên, niềm hy vọng ấy nhanh chóng sụp đổ khi cô nhìn thấy hôn thê của Leon – Angie và Livia, những con người đang có mối quan hệ rất thân thiết. Trái tim tan vỡ, Noelle trở nên suy sụp. Và rồi, khi Leon tạm thời trở về Vương quốc, mọi chuyện bắt đầu trở nên nguy cấp. Lợi dụng tình thế đó, tên bám đuôi Loic đã đe dọa Noelle và bắt cóc cô. Sau khi trở lại nước Cộng hòa và nghe thông báo về điều đó, Leon nhanh chóng lên kế hoạch giải cứu Noelle.'),
('https://cdn0.fahasa.com/media/catalog/product/s/a/sao-pro-7---bia-1_1.jpg', 'Sword Art Online Progressive 007', '7', 'REKI KAWAHARA', NULL, '125000', '8', '2022', '16', '18 x 13', '2', '623', 'Dễ thấy Sword Art Online có không gian kể chuyện rất rộng, lại tỉ mỉ đi theo từng tầng, tạo cảm giác tận hưởng rõ rệt cho người chơi và cả người đọc. \\n Câu chuyện hiện đã đến tầng 7, vẫn là tầng từng trải nghiệm trong giai đoạn chạy thử của SAO, nói cách khác, cho đến đây, Kirito vẫn biết nhiều hiểu rộng hơn Asuna. Thành ra theo thói quen, vừa tới nơi Asuna đã lập tức hỏi cậu xem chỗ ăn chỗ chơi nào ngon. So với các lần trước, lần này Kirito tỏ ra ngần ngừ rõ rệt. \\n Không phải cậu không muốn cho cô biết, mà là tầng này đã để lại cho cậu dư vị cay đắng đến nỗi tiềm thức luôn muốn chối bỏ hết thông tin. Cho đến lúc sắp ra bãi săn bên ngoài, nhìn thấy có tận hai cổng để đi, Kirito mới khôi phục kí ức. Một cổng ốp phù điêu hình người sang trọng nâng ly rượu, mở ra con đường thênh thang phơi phới. Một cổng là người ăn mặc lam lũ gò mình đi dưới gió táp mưa sa, hứa hẹn hành trình gập ghềnh. \\n Sau khi nghe giải thích, Asuna chọn đường gió táp mưa sa… \\n Tập 7 chứa đựng đôi chút suy luận điều tra dựa trên một manh mối vô lý, gợi nhớ không khí tập làm thám tử của Kirito khi gặp án mạng trong khu vực an toàn ở Sword Art Online 008 “Early and Late”.'),
('https://cdn0.fahasa.com/media/catalog/product/b/i/bia-mem_tqtp5.jpg', 'Thiên Quan Tứ Phúc', '5', 'Mặc Hương Đồng Khứu', 'Mạc Phong', '159000', '8', '2022', '16', '20.5 x 14 x 2', '2', '392', 'Chuyến đi vào Đồng Lô vẫn đang tiếp tục. Lần này nhóm của bọn họ có thêm những gương mặt mới, không chỉ có thần quan mà còn cả ma quỷ. Trên hành trình ấy bọn họ bắt gặp những bức bích họa ẩn giấu dưới lớp vỏ đen sì trong thần điện Ô Dung hoang phế, nghe thấy giọng nói vừa bí ẩn vừa quen thuộc vang lên giữa ngọn núi quái dị và nhìn thấy những bức tượng được điêu khắc tinh xảo trong hang Vạn Thần. \\n Những bức tranh này có ý nghĩa gì? Phải chăng đó là một lời cảnh báo dành riêng cho Tạ Liên? \\n Giọng nói ấy là của ai? Liệu Tạ Liên có từng quen biết? \\n Và, trong hang Vạn Thần là tượng của vị thần nào?'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_38340.jpg', 'All In Love - Ngập Tràn Yêu Thương (Tái Bản 2020)', NULL, 'Cố Tây Tước', 'Hà Giang', '119000', '5', '2020', '16', '	20.5 x 14.5', '2', '324', 'Từ Vi Vũ hơi mắc bệnh sạch sẽ, có chút bỉ ổi, có chút mặt dày, tuy nhiên trước mặt người ngoài anh luôn hào hoa phong nhã, sống tách biệt, độc lập, lạnh lùng mà kiêu ngạo, lạnh lùng mà xa cách, trong sự xa cách ấy lại toát lên sự cao quý. Nhưng cứ về đến nhà, anh liền biến thành quý ông “thích cởi”, luôn miệng kêu: “Tắm, tắm, tắm! Cố Thanh Khê, em có muốn đến chà đạp anh không?” \\n Cố Thanh Khê luôn nghĩ, con người này còn có thể bỉ ổi hơn được nữa không? \\n Nếu không sẽ là: \\n “Vợ ơi, mau nấu cơm cho anh, yêu cầu hợp pháp đấy!” \\n “Vợ ơi, hôm nay đi xem phim nhé! Yêu cầu hợp pháp đấy!” \\n “Thanh Khê, hát tặng anh một bài đi, yêu cầu hợp pháp đấy!” \\n Mỗi lần như thế, bạn Cố Thanh Khê lại phải cố kiềm chế không xử lý anh một cách phi pháp. \\n Hạnh phúc là gì? \\n Hạnh phúc là mười ba năm trước, cứ tan học về, có một cậu bé lại đi hình chữ S đến trước mặt bạn. \\n Mười ba năm sau, vẫn cậu bé đó ôm bạn vào lòng, thủ thỉ: “Cố Thanh Khê, cả tuổi thanh xuân của anh đều dành hết cho em, thế nên em phải có trách nhiệm với anh đấy!”'),
('https://cdn0.fahasa.com/media/catalog/product/n/h/nhietdoxagiao.jpg', 'Nhiệt Độ Xã Giao', NULL, 'Carbeeq', 'Mèo Béo', '109000', '9', '2020', '16', '20.5 x 14.5', '2', '415', '“Này, ông có biết người ta bảo ‘kỳ thị đồng tính tức  gay ngầm’ không?” \\n “Tôi thấy cũng có lý phết đấy, ông nghĩ sao?” \\n Tống Viễn Tuần – một gã trai thẳng vừa lạnh lùng vừa đẹp trai nhưng lại kỳ thị đồng tình. Qua lời kể của một người bạn mà trở nên không có thiện cảm với du học sinh trao đổi Phương Chiêu Mộ. Cảm xúc không thích hình thành ngay từ khi chưa gặp mặt và càng rõ ràng hơn đến khi gặp bởi mùi hương quá ngọt trên cơ thể cậu. \\n Phương Chiêu Mộ - một cậu trai vốn dĩ rất hoạt bát, vui vẻ trong cuộc sống nhưng vì sự ghét bỏ ngầm của Tống Viễn Tuần mà quãng đời sinh viên trao đổi tưởng chừng như đẹp đẽ của cậu hoàn toàn chấm dứt. Trở thành một người khép kín hơn, luôn thui thủi một mình và bị cô lập. \\n Hai con người tưởng chừng như chẳng có nổi một điểm nào có thể chạm nhau trên cuộc đời của họ thì ông mối – Triệu Hàm vừa trực tiếp lại gián tiếp se duyên cho cả hai qua phần mềm kết bạn. Từ đó Mu – Phương Chiêu Mộ và Andrew – Tống Viễn Tuần với vai diễn là chàng kỹ sư 29 tuổi quen nhau. Chính nhờ có Andrew mà cuộc sống của Phương Chiêu Mộ trở nên tươi sáng, vui vẻ và có mục đích hơn. \\n Nhưng nếu Mu và Andrew càng ngày càng gần nhau hơn, thân cận nhau hơn bao nhiều thì khoảng cách giữa Phương Chiêu Mộ và Tống Viễn Tuần lại cách xa nhau bấy nhiêu… Sự xa lánh của Phương Chiêu Mộ dành cho Tống Viễn Tuần chính là điều khiến anh không biết phải làm sao để cho Andrew đối mặt với cậu ngoài đời. \\n “Mộ Mộ,” Tống Viễn Tuần cất tiếng, “em cứ xem tôi là Andrew đi. Nếu có chỗ nào khác thì tôi sẽ thay đổi cho giống.” \\n \"Những gì hồi trước làm sai, tôi sẽ sửa lại từng chút một. Em thấy không vui thì mắng tôi thế nào cũng được.”  \\n \"Tình cảm của tôi không đáng giá, em cứ mang ra mà dùng, tình cảm của em rất đáng giá, nên em đừng đòi lấy lại.” \\n Nhiệt độ xã giao – Cuốn sách nhẹ nhàng, dịu dàng nhưng không kém phần thực tế mà ngoài xã hội chúng ta ai cũng từng thấy, trải nghiệm về một cuộc sống nịnh nọt, vụ lợi, cô lập,.. diễn ra hằng ngày. Chỉ là chẳng phải ai cũng đủ may mắn như Phương Chiêu Mộ may mắn có một Tống Viễn Tuần yêu thương mình!'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_47056.jpg', 'Tiền Đẻ Ra Tiền - Đầu Tư Tài Chính Thông Minh', NULL, 'Duncan Bannatyne', NULL, '120000', '9', '2020', '13', '20.5 x 13', '2', '734', 'Sau sự thành công của hai cuốn sách “Thức tỉnh và thay đổi cuộc đời bạn: Bí quyết thành công của triệu phú Anh” và “Quản lý thời gian thông minh của người thành đạt: Bí quyết thành công của triệu phú Anh” là những câu chuyện, những lời khuyên dựa trên những kinh nghiệm phong phú của cuộc đời mình và nhằm mục đích truyền cảm hứng động lực làm giàu cho mọi công dân đều có thể trở thành triệu phú, thì triệu phú người Anh và tác giả của nhiều đầu sách nổi tiếng Duncan Bannatyne đã cho ra mắt cuốn sách “ Tiền Đẻ Ra Tiền – Đầu Tư Tài Chính Thông Minh”. \\n Có điều gì đặc biệt ở cuốn sách “ Tiền Đẻ Ra Tiền” ? \\n Điều đặc biệt so với những cuốn sách khác ông từng viết trước đây, đó là cuốn sách này không nói về chuyện làm giàu, cũng là một phần trong chuỗi câu chuyện “Bí quyết thành công của triệu phú Anh” nhưng nó bàn đến việc kiểm soát tiền bạc. Đến với cuối cuốn sách, bạn sẽ có sự tự tin để đưa ra những quyết định đúng đắn cho bản thân mình và những kỹ năng để khiến đồng tiền của mình đi xa hơn, có hiệu quả dù nền kinh tế có ra sao đi chăng nữa. \\n Nó sẽ bàn tới những khía cạnh, những thành tố cốt yếu của tài chính và mối quan hệ cốt lõi của bạn với đồng tiền. Nếu bạn không suy nghĩ theo một cách có chiến lược về tiền bạc, bạn sẽ không thể làm bất cứ thứ gì có tính chiến lược với tiền bạc – thứ cứ thế trôi tuột ra khỏi tài khoản ngân hàng và ví của bạn. Nội dung của cuốn sách sẽ là những lời khuyên theo một kế hoạch cụ thể của Duncan mà bạn có thể áp dụng ngay được để có thể giúp bạn quản lý chi tiêu một cách tối ưu nhất, khiến “Tiền đẻ ra tiền” và giúp bạn đầu tư tài chính một cách thông minh. Cụ thể, cuốn sách được chia thành 6 phần: \\n Phần 01: Lý thuyết tiền tệ \\n Phần 02: Kiếm tiền nhiều hơn \\n Phần 03: Chi tiêu \\n Phần 04: Vay mượn \\n Phần 05: Tiết kiệm và đầu tư \\n Phàn 06: Kế hoạch \\n Cuốn sách “Tiền đẻ ra tiền” dành cho những ai? \\n Câu trả lời chính là dành cho tất cả mọi người. Dù bạn có tiền gửi ngân hàng hay không, bạn mười tám hay tám mươi tuổi, làm chủ, thất nghiệp hay làm giờ hành chính, những nguyên tắc để thông minh trong chuyện tiền bạc cũng vẫn được giữ nguyên. Thế nên nếu bạn muốn tối ưu hóa những gì bạn kiếm được thì đây chính là cuốn sách dành cho bạn. \\n Mỗi chúng ta cần có trách nhiệm với những lựa chọn tài chính của mình bởi “Cái làm cho bạn giàu có không phải là lương bổng, mà đó là thói quen tiêu pha của bạn” và hy vọng cuốn sách sẽ tiếp thêm cho bạn sự tự tin để kiểm soát những vấn đề tài chính của mình. \\n Thuộc dòng sách quản lý tài chính của Bizbooks, Bạn sẽ không phải đọc cuốn sách theo trình tự của nó. Ví dụ, nếu bạn muốn bắt đầu với phần tiết kiệm thì cứ đọc nó trước. Thậm chí có thể có một số lí thuyết trong Phần Một sẽ ngấm sâu hơn một chút khi bạn đọc những ví dụ thực tế ở Phần Hai. Nhưng “Tôi hi vọng, rằng dù bạn đọc cuốn này theo thứ tự nào, khi bạn xem xét nó một cách tổng thể, nó sẽ tạo thành một cẩm nang hoàn thiện để giúp bạn hiểu về tiền, hỗ trợ bạn chịu trách nhiệm về những lựa chọn tài chính của bản thân và cuối cùng là khiến bạn giàu có hơn.” – Duncan Bannatyne.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_19337.jpg', 'How Business Works - Hiểu Hết Về Kinh Doanh', NULL, 'Nhiều Tác Giả', 'Tân Thành', '380000', '7', '2020', '13', '19.5 x 23', '2', '613', 'Một trong những cuốn cẩm nang về Kinh doanh dễ hình dung nhất từ trước tới nay! \\n  Tại sao dòng tiền lại quan trọng? Sản xuất tinh gọn là gì? Marketing kỹ thuật số hoạt động ra sao? Thành viên hội đồng quản trị gồm những ai? Mua bán doanh nghiệp là gì? Cấu trúc doanh nghiệp ra sao? Khấu hao là gì? Trách nhiệm xã hội của doanh nghiệp ra sao? Làm thế nào để có thể thành công trong thị trường toàn cầu của thế kỷ 21? \\n  Với những hình ảnh bắt mắt, đơn giản, không sử dụng thuật ngữ, How business works \\n  Hiểu hết về kinh doanh giải thích mọi khái niệm liên quan đến lĩnh vực kinh doanh, biến những khái niệm khó hiểu nhất trở nên dễ hiểu. Mọi khía cạnh của hoạt động kinh doanh sẽ được xem xét, phân tích giúp độc giả hiểu rõ hơn về kinh doanh, và cách các hình thái kinh doanh định hình xã hội hiện đại. \\n  Dù bạn đang muốn thăng tiến trong công việc, khởi sự doanh nghiệp của riêng mình hay chỉ đơn giản là muốn hiểu rõ hơn thế giới kinh doanh và tài chính, How business works \\n  Hiểu hết về kinh doanh chính là cuốn cẩm nang không thể bỏ qua!'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_41289.jpg', 'Internet Phù Phép Start-Up', NULL, 'Phạm Băng', '	Đặng Hồng Quân', '149000', '10', '2020', '13', '20.5 x 14.5', '2', '425', 'INTERNET PHÙ PHÉP START-UP - Thuật quảng bá kì lạ cho doanh nghiệp với chi phí 0 đồng \\n Vấn đề lớn nhất đối với các công ty khởi nghiệp chính là quảng bá. Không phải do các kênh quảng cáo hiện tại không hiệu quả, ngược lại, hiệu quả quá tốt nhưng mức giá không hề rẻ, những công ty mới khởi nghiệp mới không thể gánh nổi. Những năm gần đây, một phương thức xúc tiến tiếp thị sản phẩm phù hợp với đội ngũ khởi nghiệp đã xuất hiện. Nếu sử dụng một cách hợp lý, phương pháp này có thể mang tới hiệu quả tiếp thị đáng kinh ngạc với mức chi phí tối thiểu. Đó chính là “phép màu” “hacker tăng trưởng”. Cuốn sách chứa đựng bí kíp giúp bạn: \\n - Lựa chọn phát triển những sản phẩm phù hợp \\n - Tiếp thị lan truyền kiểu virus \\n - Thu hút sự chú ý của người dùng \\n - Quảng bá thương hiệu  đến mọi nơi \\n - Giữ chân khách hàng quan trọng \\n - Gia tăng doanh thu cho công ty \\n Cầm cuốn sách này trên tay, bạn sẽ không còn băn khoăn, lo lắng cho câu hỏi làm thế nào để “đứa con tinh thần” của mình đến được tới khách hàng. Với mục tiêu quảng bá sản phẩm ra toàn thế giới ở mức độ tối đa với chi phí thấp nhất hoặc thậm chí là không có ngân sách, bạn hoàn toàn chủ động trong việc tạo ra giá trị và đưa chúng đến người dùng tiềm năng. Trên nền tảng đó, công ty sẽ có những đột phá tăng trưởng để phát triển rực rỡ. \\n Và, bạn biết rồi đấy, đây chính là THUẬT QUẢNG BÁ KÌ LẠ CHO DOANH NGHIỆP VỚI CHI PHÍ 0 ĐỒNG. Internet sẽ giúp bạn “phù phép” start-up của mình trở thành những gã khổng lồ trong tương lai. \\n Và chính bạn sẽ trở thành người nắm giữ phép màu đó.'),
('https://cdn0.fahasa.com/media/catalog/product/8/9/8935280909182.jpg', 'Đọc Vị Bất Kỳ Ai - Áp Dụng Trong Doanh Nghiệp (Tái Bản)', NULL, 'David J. Lieberman', 'Xuân Chi', '105000', '10', '2021', '13', '19 x 13 x 1', '2', '623', 'Đọc Vị Bất Kỳ Ai - Áp Dụng Trong Doanh Nghiệp \\n (Tái bản từ tựa Làm Sếp Không Chỉ Là Nghệ Thuật) \\n Phần lớn các cuốn sách kinh doanh – dù nói về quản lý, lãnh đạo, phát triển cá nhân hay dịch vụ khách hàng – đều đưa ra những ý tưởng và lời khuyên tốt đẹp để bạn có thể hành động sáng suốt, khôn ngoan như: Mỉm cười và tỏ ra gần gũi, Lắng nghe trước khi phản ứng và Nếu bạn thất bại trong việc lập kế hoạch, hãy lập kế hoạch cho việc thất bại. Đây là những lời khuyên tốt và hữu dụng. Tuy nhiên, trong thị trường cạnh tranh khốc liệt ngày nay, người kinh doanh cần thứ gì đó thiết thực và có sức thuyết phục mạnh mẽ hơn so với những lời trích dẫn hay triết lý đơn thuần. \\n Chẳng hạn như, bạn đã biết được lòng trung thành của khách hàng và nhân viên quan trọng đến mức nào. Vậy làm thế nào để có được một chiến lược tâm lý tốt, có thể giúp bạn tránh được việc mọi người đi khỏi công ty bạn? Rất nhiều cuốn sách đã đề cập đến một quan niệm vốn dĩ đã thành quy ước, rằng khách hàng là thượng đế, nhưng liệu bạn có muốn biết được một kỹ thuật hiệu quả và rõ ràng có thể giúp bạn tìm lại được những khách hàng đã mất? Tất nhiên, khuyến khích nhân viên và gây ấn tượng tốt với khách hàng là việc làm cần thiết, luôn cần thực hiện nhưng chắc chắn là khả năng của bạn sẽ được nâng lên một tầm cao mới khi bạn khám phá được cách khai thác sức mạnh của nguồn cảm hứng bất tận trong con người mình, theo ý muốn. \\n Đọc Vị Bất Kỳ Ai - Áp Dụng Trong Doanh Nghiệp cung cấp cho bạn những công cụ nhanh chóng và hiệu quả, chỉ cho bạn từng bước một, chi tiết và cẩn trọng cách xây dựng những chiến thuật có thể áp dụng trong bất cứ tình huống nào. Đây không chỉ là ý tưởng, lý thuyết hay thủ thuật chỉ có tác dụng trong một vài hoàn cảnh hoặc với một vài người, mà nó thực sự mở ra cho bạn một cơ hội sử dụng những công cụ tâm lý quan trọng giúp chi phối hành vi của con người để có được ưu thế tất yếu. \\n Với lối viết giản dị, đi thẳng vào vấn đề, không rườm rà, không có quá nhiều thuật ngữ tâm lý học, David Lieberman sẽ cung cấp cho người đọc rất nhiều công cụ hữu dụng: Đó là công cụ mà FBI đã sử dụng, là bài giảng mà sinh viên ngành tâm lý buộc phải xem bởi ông là một trong số những người tham gia đào tạo trong quân đội Mỹ. Là người dạy chiến thuật cho nhiều nhà đàm phán cấp cao trong chính phủ, ông làm việc với những chuyên gia sức khỏe tâm thần hàng đầu và ông là một trong số không nhiều người đào tạo các nhà quản lý kinh doanh của hơn 25 nước trên toàn thế giới. \\n Có rất nhiều sách kinh doanh cung cấp cho bạn đọc quy luật, nguyên tắc, chiến lược và các câu chuyện. Nhưng đây là một cuốn sách cung cấp giải pháp chi tiết cho những vấn đề có thật. Bạn sẽ có được những lợi ích rõ ràng khi đọc cuốn sách này dù bạn đang điều hành một doanh nghiệp nhỏ, vừa hay lớn. Bạn sẽ được đảm bảo an toàn khi biết điều gì đang thực sự xảy ra ở mọi thời điểm, có được sức mạnh để giữ cho những tình huống nguy hiểm tiềm tàng không bao giờ xảy ra, và khi cần thiết là khả năng vượt qua các tình huống khó khăn nhất một cách nhanh chóng và thuận lợi. \\n Khi tiền cược lớn, hãy làm nhiều hơn việc đơn thuần đặt cược vào cửa bạn thích – hãy dồn sức vào trò chơi để đảm bảo rằng bạn sẽ không thua cuộc.'),
('https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179184.jpg', 'Nhà Lãnh Đạo Không Chức Danh (Tái Bản 2022)', NULL, 'Robin Sharma', 'Nguyễn Minh Thiên Kim', '105000', '2', '2022', '16', '20.5 x 13 x 1.2', '2', '512', 'Nhà Lãnh Đạo Không Chức Danh \\n Suốt hơn 15 năm, Robin Sharma đã thầm lặng chia sẻ với những công ty trong danh sách Fortune 500 và nhiều người siêu giàu khác một công thức thành công đã giúp ông trở thành một trong những nhà cố vấn lãnh đạo được theo đuổi nhiều nhất thế giới. Đây là lần đầu tiên Sharma công bố công thức độc quyền này với bạn, để bạn có thể đạt được những gì tốt nhất, đồng thời giúp tổ chức của bạn có thể có những bước đột phá đến một cấp độ thành công mới trong thời đại thiên biến vạn hóa như hiện nay. \\n Trong cuốn sách Nhà Lãnh Đạo Không Chức Danh, bạn sẽ học được: \\n Làm thế nào để làm việc và tạo ảnh hưởng với mọi người như một siêu sao, bất chấp bạn đang ở vị trí nào \\n Một phương pháp để nhận biết và nắm bắt cơ hội vào những thời điểm thay đổi \\n Những bí mật thật sự của sự đổi mới \\n Một chiến lược tức thời để xây dựng đội nhóm tuyệt vời và trở thành một nhà cung cấp ngoạn mục của khách hàng \\n Những thủ thuật cứng rắn giúp trở nên mạnh mẽ cả về thể chất lẫn tinh thần để có thể đi đầu trong lĩnh vực của bạn \\n Những phương thức thực tế để đánh bại sự căng thẳng, xây dựng một ý chí bất bại, giải phóng năng lượng, và cân bằng cuộc sống cá nhân \\n Bất kể bạn làm gì trong tổ chức và cuộc sống hiện tại của bạn như thế nào, một thực tế quan trọng duy nhất là bạn có khả năng thể hiện năng lực lãnh đạo. Cho dù sự nghiệp hiện tại của bạn đang ở đâu, bạn vẫn luôn cần phải thể hiện những khả năng tột đỉnh của mình. Cuốn sách này sẽ hướng dẫn bạn làm thế nào để khai thác tối đa khả năng đó, cũng như thay đổi cuộc sống và thế giới xung quanh bạn.'),
('https://cdn0.fahasa.com/media/catalog/product/c/o/cover-measure-what-matte-_b_a_1_1.jpg', 'Làm Điều Quan Trọng', NULL, 'John Doerr', 'Lương Trọng Vũ', '154000', '11', '2018', '16', '16 x 24', '2', '532', 'Làm Điều Quan Trọng Google, Intel, Adobe, Youtube,… đã dịch chuyển thế giới bằng OKRs như thế nào? \\n “OKRs đã giữ cho tôi và Google đúng hẹn và đúng hướng khi chúng tôi chọn ra được “Cái gì là quan trọng nhất”. Tôi muốn tất cả mọi người đều hiểu OKRs như chúng tôi đã hiểu” - Lời giới thiệu được viết bởi nhà đồng sáng lập Google, Larry Page, cho quyển sách “Làm điều quan trọng” của John Doerr. \\n “Làm điều quan trọng” giống như một quyển nhật ký ghi chép lại kinh nghiệm về những trường hợp điển hình đã thành công nhờ phương pháp OKRs. Với mục đích có thêm ngày càng nhiều các công ty khởi nghiệp, hay những công ty lâu năm cũng sẽ nhận ra những lợi ích và bắt đầu áp dụng OKRs vào mô hình vận hành. \\n OKRs là viết tắt của Mục tiêu và Kết quả then chốt, do Andy Grove – cựu CEO Intel - đặt nền tảng. \\n Mục tiêu là những gì chúng ta muốn đạt được, không hơn không kém. Nó phải có ý nghĩa, rõ ràng, theo hướng khả thi và lý tưởng nhất là tạo cảm giác muốn đạt được. \\n Kết quả then chốt sẽ đánh dấu và giám sát cách chúng ta đi đến những mục tiêu đó như thế nào? KRs hữu hiệu phải thể hiện được một cách rõ ràng và có khống chế thời gian, phải có tính công kích nhưng vẫn đảm bảo tính hiện thực. \\n OKRs được truyền bá rộng rãi hơn khi John Doerr đến gặp và tiếp xúc với từng nhà sáng lập ở giai đoạn bước đầu thành lập doanh nghiệp của họ. Với những kinh nghiệm làm việc tại Intel cùng Andy Grove, John đã đi khắp nơi để trình bày lý thuyết về mục tiêu và kết quả then chốt để từ đó truyền cảm hứng và giúp đỡ được rất nhiều công ty khởi nghiệp tạo nên những đột phá, làm dịch chuyển cả thế giới. \\n Quyển sách là tập hợp các câu chuyện có thật được chính những nhà sáng lập của Google, Nuna, MyFitnessPal, Remind, Gates Foundation, Ford, Wells Fargo,… kể lại. Có người thành công và cũng không thiếu người thất bại. Nhưng điểm chung là chúng đều để lại những bài học kinh nghiệm cho các nhà lãnh đạo khi muốn áp dụng OKRs. \\n Qua từng trang sách, người đọc sẽ hiểu một cách đúng đắn để thiết lập OKRs sao cho phù hợp với doanh nghiệp cũng như với bản thân mình, những gì cần nắm rõ trước khi ấn định OKRs và lời khuyên về việc điều chỉnh OKRs để thích ứng với từng biến động bên ngoài. \\n OKRs giờ đây đã dần phổ biến và con số các doanh nghiệp thành công nhờ OKRs cũng liên tục tăng. Điều này chứng minh OKRs đang ngày càng đóng vai trò quan trọng giúp các nhà lãnh đạo tạo ra những đột phá trong thị trường. Đồng thời biến “Làm điều quan trọng” trở thành kim chỉ nam trong giới kinh doanh.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_15424.jpg', 'Nghệ Thuật Bán Hàng Bằng Câu Chuyện', NULL, 'Paul Smith', 'Phúc Chi', '180000', '9', '2019', '16', '13 x 20.5', '2', '831', 'Một câu chuyện bán hàng tuyệt hay sẽ thay đổi tất thảy. Nó khiến người mua gỡ bỏ hàng rào đề phòng. Nó giúp họ thư giãn. Nó chiếm được lý trí lẫn tình cảm của họ bằng cách lôi cuốn được trí tuệ và cảm xúc của họ. \\n Một câu chuyện hay xây dựng được uy tín và định vị bạn trong mắt người mua một cách chuẩn xác. Thay vì chỉ được coi là người chào hàng, một câu chuyện hấp dẫn sẽ giúp bạn trở thành một người tạo ra giá trị, người giải quyết vấn đề một cách chuyên nghiệp, và là nhà tư vấn mà bạn mong muốn trở thành.\\n Câu chuyện là vũ khí bán hàng quan trọng nhất của người bán hàng \\n Câu chuyện là vũ khí bán hàng quan trọng nhất của người bán hàng. Tuy nhiên rất nhiều nhân viên quản lý kinh doanh và nhân viên bán hàng thường kể chuyện rất dở. Rất dở! Các câu chuyện của họ nhàm chán, lộn xộn, thường vô nghĩa, và hầu hết luôn hướng về bản thân. Trên thực tế, như bạn sẽ đọc được trong Chương 1, nhiều câu chuyện thậm chí còn thiếu các thành phần quan trọng để có thể được xem là một “câu chuyện”. \\n Một câu chuyện bán hàng tuyệt hay sẽ thay đổi tất thảy. Nó khiến người mua gỡ bỏ hàng rào đề phòng. Nó giúp họ thư giãn. Nó chiếm được lý trí lẫn tình cảm của họ bằng cách lôi cuốn được trí tuệ và cảm xúc của họ. Một câu chuyện hay xây dựng được uy tín và định vị bạn trong mắt người mua một cách chuẩn xác. Thay vì chỉ được coi là một người chào hàng (bằng những kiến thức quý báu Smith đã đúc rút từ người làm nghề thu mua vật tư), một câu chuyện hấp dẫn sẽ giúp bạn trở thành một người tạo ra giá trị, người giải quyết vấn đề một cách chuyên nghiệp, và là nhà tư vấn mà bạn mong muốn trở thành. \\n Thậm chí, có lẽ còn quan trọng hơn, câu chuyện đầy sức mạnh của bạn cho phép người mua mở lòng và chia sẻ câu chuyện của chính họ. Chẳng gì có thể khích lệ khách hàng tiềm năng trả lời cho những câu hỏi mang tính chất thăm dò của bạn, tiết lộ vấn đề, nhu cầu, kết quả họ muốn, tâm tình, thất vọng, và những cơ hội hơn là năng lực kể được một câu chuyện liên quan, đúng cách và đúng lúc! Thường thường, chúng ta làm hỏng chuyện rất nhanh ở giai đoạn tìm hiểu, bởi lẽ người mua chưa sẵn sàng chia sẻ thông tin. Điển hình là sự thăm dò của bạn không hiệu quả vì chúng ta chưa “hâm nóng” được khách hàng tiềm năng, thiết lập lòng tín nhiệm, hay giành được quyền nêu lên những câu hỏi gợi mở mạnh – tất thảy những gì một câu chuyện tuyệt vời có thể thực hiện cho chúng ta. \\n Có gì trong cuốn sách: Nghệ thuật bán hàng bằng câu chuyện \\n Nghệ thuật bán hàng bằng câu chuyện thể hiện đúng hứa hẹn trong tiêu đề phụ của sách: Phương pháp gây chú ý, xây dựng niềm tin, và chốt được đơn hàng – bằng cách cho thấy các nhân viên bán hàng bỏ thật kể các câu chuyện xuyên suốt từng giai đoạn của quá trình bán hàng như thế nào. Riêng các câu chuyện chân thật về cách những người bán hàng triển khai các câu chuyện của mình trong lúc xây dựng mối quan hệ, thuyết trình, xử lý ý kiến phản bác, chốt đơn hàng, và chăm sóc khách hàng hậu mãi, đã đáng để độc giả bỏ tiền mua sách. Một trong những khía cạnh thú vị nhất của cuốn sách này là, ngoài việc mang tính giải trí cao và dễ đọc (vì chứa đầy những câu chuyện hấp dẫn!), nó còn giúp bạn áp dụng những nguyên tắc hữu ích này vào thực tế. \\n Hãy coi nó như sách bài tập: giữ một cây bút và cuốn sổ tiện dụng; tải các bảng mẫu về; xác định những chuyện kể bạn cần, và chế tác chúng thành những câu chuyện lôi cuốn có thể sử dụng. Tác giả đã thực hiện phần bài tập của ông, là phỏng vấn hàng trăm người, và ông ấy giành được quyền để yêu cầu bạn làm bài tập của bạn. Nếu bạn nghiêm túc muốn nâng cao hiệu suất trong vai trò một người truyền tải thông điệp, và mong muốn cải biến kết quả bán hàng của mình, thì Nghệ thuật bán hàng bằng câu chuyện là dành cho bạn.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_49929.jpg', 'Nâng Tầm Dịch Vụ (Tái Bản 2020)', NULL, 'Ron Kaufman', 'Trần Lê', '150000', '2', '2020', '16', '20.5 x 13', '2', '241', 'Cuốn sách tiết lộ sức mạnh của việc cung cấp dịch vụ nâng tầm và các bước đi mà người làm dịch vụ có thể áp dụng nhằm xây dựng văn hóa dịch vụ bền vững, có thể phát huy hiệu quả hàng ngày. Cuốn sách cũng trả lời rất nhiều câu hỏi về quá trình thúc đẩy dịch vụ liên tục và xóa đi những quan niệm sai lầm về dịch vụ. Cuốn sách sẽ làm nổi bật lên các công ty và những con người luôn đặt ưu tiên vào sự phục vụ, và có được những thành quả và danh tiếng tuyệt vời. Cuốn sách đưa ra những vấn đề cốt yếu cần thiết để bắt đầu thúc đẩy tổ chức kinh doanh dịch vụ – và tầm nhìn của lãnh đạo kinh doanh dịch vụ.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_47973.jpg', 'Người Bán Hàng Vĩ Đại Nhất Thế Giới', '2', 'Og Mandino', NULL, '148000', '11', '2020', '16', '20.5 x 13', '2', '412', '\"Người Bán Hàng Vĩ Đại Nhất Thế Giới\" kể về câu chuyện của Hafid, một cậu bé chăn lạc đà nghèo, ở Jerusalem thời cổ đại.  Xuất thân là một cậu nhóc trông lạc đà cho đoàn buôn của Pathros, nhưng với quyết tâm đổi đời, muốn cải thiện vị trí của mình trong cuộc sống, Hafid luôn nuôi ước mơ được trở thành người bán hàng. Cậu tin chỉ như thế mình mới có cơ hội trở nên giàu có và thành công. \\n Giống như nhiều người theo đuổi đam mê khác, trong suốt hành trình ấy đôi lúc Hafid đã nghĩ đến việc quay trở về với công việc chăn lạc đà, kiếm những đồng xu lẻ sống qua ngày. Biết bao nhiêu mối suy tư nghi ngờ, thương tiếc bản thân đã nảy ra trong tâm trí và bủa vây lấy cậu, nhưng với ý chí và quyết tâm, cuối cùng Hafid cũng trở thành người bán hàng tài năng nhất lúc bấy giờ. \\n Bí mật nào đã làm nên thành công? Đó chính là những nguyên tắc được một thương nhân giàu có và thành công truyền lại và Hafid đã giữ kỹ trong 10 cuộn giấy da trong suốt hơn ba thập kỉ qua. Với Hafid, những thứ giản dị này còn quý hơn cả kim cương. Nhờ áp dụng những nguyên tắc trong cuộn giấy da đó mà Hafid được mệnh danh là “Người bán hàng vĩ đại nhất thế giới”. Tuy nhiên, sách không chỉ dạy bạn cách “bán hàng”, mà nó còn là một cuốn sách dạy bạn làm người, giúp bạn trở thành người “vĩ đại nhất” trong lĩnh vực mà bạn chọn. \\n Vậy những nguyên tắc ấy là gì và làm cách nào để đưa chúng vào thực tiễn? Những bí mật này chỉ được tiết lộ khi bạn cầm trên tay cuốn sách Người bán hàng vĩ đại nhất thế giới, đọc thật cẩn thận, tiếp thu và lưu từng chi tiết. \\n Cho đến nay, cuốn sách này được dịch ra 25 ngôn ngữ và đã bán hơn 50 triệu bản, trở thành cuốn sách gối đầu giường của nhiều doanh nhân và truyền lửa cho hàng triệu người. Khi cảm thấy chán nản hoặc sợ hãi, hãy đọc cuốn sách này thật chậm, rồi bạn sẽ cảm thấy nhẹ nhõm và trở nên thông suốt, nhận ra con đường dẫn đến thành công bằng cách lắng nghe sự khôn ngoan bên trong bản thân của mình. \\n  Ấn bản Người bán hàng vĩ đại nhất thế giới lần này được tổng hợp và chỉnh sửa nội dung từ bộ sách hai tập Người bán hàng vĩ đại nhất thế giới mà First News - Trí Việt đã xuất bản trước đây.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_603.jpg', 'Doanh Nghiệp Của Thế Kỷ 21 (Tái Bản 2019)', NULL, 'Robert T Kiyosaki, John Fleming, Kim Kiyosaki', NULL, '85000', '2', '2019', '16', '13 x 20.5', '2', '442', 'Một quyển sách khác của tác giả bộ sách nổi tiếng Dạy con làm giàu. Trong cuốn sách này, Robert T. Kiyosaki sẽ chỉ ra cho bạn đọc thấy lý do tại sao mình cần phải gây dựng doanh nghiệp riêng của mình và chính xác đó là doanh nghiệp gì. Nhưng đây không phải là việc thay đổi loại hình doanh nghiệp mình đang triển khai mà đó là việc thay đổi chính bản thân. Tác giả còn cho bạn đọc biết cách thức tìm kiếm những gì mình cần để phát triển doanh nghiệp hoàn hảo, nhưng để doanh nghiệp của mình phát triển thì mình cũng sẽ phải phát triển theo.'),
('https://cdn0.fahasa.com/media/catalog/product/e/c/economix-01.jpg', 'Economix - Các Nền Kinh Tế Vận Hành (Và Không Vận Hành) Thế Nào Và Tại Sao?', NULL, 'Michael Goodwin', 'Phan Linh Lan', '152000', '12', '2020', '16', '24.5 x 17 x 0.5', '2', '123', 'Nếu các bạn từng tìm cách hiểu những khái niệm kinh tế qua việc đọc vô số giáo trình kinh tế học, nhưng vẫn thấy thật khó hình dung được bức tranh toàn cảnh về bộ môn này, thì cuốn sách sẽ cung cấp cho các bạn một mảnh ghép hoàn chỉnh cho những mảnh nho nhỏ mà các bạn đã đọc qua. \\n Chúng ta sẽ hiểu rõ hơn về những khái niệm kinh tế cơ bản cùng những học thuyết kinh tế lớn còn ảnh hưởng tới ngày nay, qua tư tưởng của các nhà kinh tế học lớn như: Adam Smith, John Keynes... \\n Có thể coi đây là một cuốn sử về lịch sử kinh tế thế giới kể từ khi nền kinh tế hàng hóa ra đời. Chúng ta sẽ lướt qua vài thế kỷ với vô số học thuyết về kinh tế học cùng những vụ khủng hoảng kinh tế lớn như thể đang đọc một cuốn truyện tranh, cả bi lẫn hài, căng thẳng mà không kém phần sảng khoái.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_27686.jpg', 'Thiên Nga Đen (Tái Bản 2020)', NULL, 'Nassim Nicholas Taleb', 'Cam Thảo, Hoàng Trung', '299000', '7', '2020', '16', '16 x 24', '2', '134', 'Trước khi khám phá ra thiên nga đen tồn tại trên đời (ở Úc), người ta vẫn tin rằng tất cả chim thiên nga trên đời đều có màu trắng. Phát hiện bất ngờ này đã thay đổi toàn bộ thế giới quan của nhân loại (về thiên nga). \\n Chúng ta không biết rất nhiều thứ nhưng lại hành động như thể mình có khả năng dự đoán được mọi điều. Và trong cuốn sách này, tác giả Nassim Nicholas Taleb đã đi sâu vào khai thác những sai lầm của tư tưởng cố hữu ấy. Theo ông, “thiên nga đen” là một biến cố tưởng chừng như không thể xảy ra với ba đặc điểm chính: không thể dự đoán, có tác động nặng nề và sau khi nó xảy ra, người ta lại dựng lên một lời giải thích để khiến nó trở nên ít ngẫu nhiên hơn, dễ dự đoán hơn so với bản chất thật của nó. Thành công đáng kinh ngạc của Facebook có thể được coi là một “thiên nga đen”, việc nước Anh rời khỏi Liên minh châu Âu cũng là một “thiên nga đen”. Thiên nga đen luôn ẩn hiện trong mọi mặt của cuộc sống với những tác động khó lường, theo cả hướng tiêu cực và tích cực. \\n Tinh tế, táo bạo nhưng không kém phần thú vị, Thiên Nga Đen chắc chắn là cuốn sách không thể bỏ qua cho những ai đam mê hiểu biết. Và cuốn sách này, bản thân nó cũng chính là một thiên nga đen…'),
('https://cdn0.fahasa.com/media/catalog/product/t/d/tdcsvnsh.jpg', 'Thay Đổi Cuộc Sống Với Nhân Số Học', NULL, 'Lê Đỗ Quỳnh Hương', NULL, '248000', '11', '2020', '16', '20.5 x 14.5', '2', '152', 'Cuốn sách Thay đổi cuộc sống với Nhân số học là tác phẩm được chị Lê Đỗ Quỳnh Hương phát triển từ tác phẩm gốc “The Complete Book of Numerology” của tiến sỹ David A. Phillips, khiến bộ môn Nhân số học khởi nguồn từ nhà toán học Pythagoras trở nên gần gũi, dễ hiểu hơn với độc giả Việt Nam. \\n Đầu năm 2020, chuỗi chương trình “Thay đổi cuộc sống với Nhân số học” của  biên tập viên, người dẫn chương trình quen thuộc tại Việt Nam Lê Đỗ Quỳnh Hương ra đời trên Youtube, với mục đích chia sẻ kiến thức, giúp mọi người tìm hiểu và phát triển, hoàn thiện bản thân, các mối quan hệ xã hội thông qua bộ môn Nhân số học. Chương trình đã nhận được sự yêu mến và phản hồi tích cực của rất nhiều khán giả và độc giả sau mỗi tập phát sóng. \\n Nhân số học là một môn nghiên cứu sự tương quan giữa những con số trong ngày sinh, cái tên với cuộc sống, vận mệnh, đường đời và tính cách của mỗi người. Bộ môn này đã được nhà toán học Pythagoras khởi xướng cách đây 2.600 năm và sau này được nhiều thế hệ học trò liên tục kế thừa, phát triển.  \\n Có thể xem, Nhân số học là một bộ môn Khám phá Bản thân (Self-Discovery), đọc vị về số. Bộ môn này giúp giải mã những tín hiệu mà cuộc sống đã gửi đến từng cá thể con người trong đời sống, tương tự như Nhân tướng học hay Nhân trắc học…Khi nghiêm túc nghiên cứu sự tồn tại và mối tương quan giữa các con số xuất hiện trong ngày, tháng, năm sinh của mỗi người qua Nhân số học, ta có thể hiểu được khá nhiều về bản thân mình, cũng như mối quan hệ của mình với người khác. Nếu hiểu những \"mật mã\" nằm ẩn dưới những con số, chúng ta có thể kiểm soát cuộc sống của mình, điều chỉnh chúng theo hướng ngày càng tốt đẹp hơn, phù hợp với năng lực, tính cách của mình hơn. \\n Trong quyển sách “Thay đổi cuộc sống với Nhân số học”, Lê Đỗ Quỳnh Hương đã sử dụng khoảng 60% nền tảng tri thức từ quyển sách “The Complete Book of Numerology” (tạm dịch: Một quyển sách toàn diện về Nhân số học) của Tiến sĩ David A. Phillips (1934 – 1993) và 40% kết quả nghiên cứu của chị sau khi phân tích hơn 500 trường hợp cụ thể của những người Việt Nam sinh ra trong thế kỷ 21. \\n Cuốn sách “Thay đổi cuộc sống với Nhân số học”mang lại đầy đủ những kiến thức quan trọng nhất mà người hứng thú với Nhân số học cần tìm hiểu. Sách bao gồm các kiến thức về ba thể trong một con người, con số chủ đạo, biểu đồ ngày sinh, các mũi tên chỉ đặc điểm, con số ngày sinh, chu kỳ 9 năm, ba giai đoạn và bốn đỉnh cao của đời người cùng ý nghĩa, sức mạnh của cái tên của mỗi người. Các kiến thức này được diễn giải, phân tích và đi kèm các ví dụ cụ thể. \\n Với mục đích đem Nhân số học trở nên gần gũi, dễ ứng dụng và mang lại những giá trị tích cực cho mỗi người trong đời sống, chị Lê Đỗ Quỳnh Hương mong rằng trong hành trình khám phá bản thân qua những con số, người đọc có thể hiểu về mình - hiểu được những thuận lợi và bất lợi mà mình gặp phải, từ đó tìm được động lực lớn để thay đổi cuộc sống. Giá trị của cuốn sách “Thay đổi cuộc sống với Nhân số học” nằm ở kiến thức tổng quan về Nhân số học và những lời khuyên sâu sắc để mỗi người có thể chuyển mình theo những hướng tích cực hơn như sống có lý tưởng, mở lòng, chăm chỉ, biết lắng nghe người khác, luyện tập thiền định, tập trung, sống có trách nhiệm, biết ơn và yêu thương… \\n Trong cuộc đời của mỗi con người, chúng ta thường phải mày mò, tìm kiếm con đường riêng cho mình mà không biết chắc con đường đó có phù hợp với mình hay không. Đôi lúc, chúng ta phải phải trầy trật, vấp ngã thậm chí lạc lối mới rút ra được kinh nghiệm, bài học. Nếu hiểu về Nhân số học, và thông qua những kiến thức nhất định về ý nghĩa và sự kết hợp của các con số, chúng ta có thể tự vạch ra cho mình một hướng đi tương đối cụ thể, giảm thiểu được các lần “thử và sai”, từ đó tìm được nhiều niềm vui, hạnh phúc, ý nghĩa trong cuộc sống. \\n Đó chính là thông điệp và mục đích lớn nhất mà tiến sỹ David A. Phillips và Lê Đỗ Quỳnh Hương mong muốn gửi gắm cho đông đảo bạn đọc.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_12542.jpg', 'Đọc Vị Bất Kỳ Ai (Tái Bản 2019)', NULL, 'TS David J Lieberman', NULL, '79000', '13', '2019', '16', '13 x 20.5', '2', '213', 'Bạn băn khoăn không biết người ngồi đối diện đang nghĩ gì? Họ có đang nói dối bạn không? Đối tác đang ngồi đối diện với bạn trên bàn đàm phán đang nghĩ gì và nói gì tiếp theo? \\n ĐỌC người khác là một trong những công cụ quan trọng, có giá trị nhất, giúp ích cho bạn trong mọi khía cạnh của cuộc sống. ĐỌC VỊ người khác để: \\n Hãy chiếm thế thượng phong trong việc chủ động nhận biết điều cần tìm kiếm - ở bất kỳ ai bằng cách “thâm nhập vào suy nghĩ” của người khác. ĐỌC VỊ BẤT KỲ AI là cẩm nang dạy bạn cách thâm nhập vào tâm trí của người khác để biết điều người ta đang nghĩ. Cuốn sách này sẽ không giúp bạn rút ra các kết luận chung về một ai đó dựa vào cảm tính hay sự võ đoán. Những nguyên tắc được chia sẻ trong cuốn sách này không đơn thuần là những lý thuyết hay mẹo vặt chỉ đúng trong một số trường hợp hoặc với những đối tượng nhất định. Các kết quả nghiên cứu trong cuốn sách này được đưa ra dựa trên phương pháp S.N.A.P - cách thức phân tích và tìm hiểu tính cách một cách bài bản trong phạm vi cho phép mà không làm mếch lòng đối tượng được phân tích. Phương pháp này dựa trên những phân tích về tâm lý, chứ không chỉ đơn thuần dựa trên ngôn ngữ cử chỉ, trực giác hay võ đoán. \\n Cuốn sách được chia làm hai phần và 15 chương: \\n Phần 1: Bảy câu hỏi cơ bản: Học cách phát hiện ra điều người khác nghĩ hay cảm nhận một cách dễ dàng và nhanh chóng trong bất kỳ hoàn cảnh nào. \\n Phần 2: Những kế hoạch chi tiết cho hoạt động trí óc - hiểu được quá trình ra quyết định. Vượt ra ngoài việc đọc các suy nghĩ và cảm giác đơn thuần: Hãy học cách người khác suy nghĩ để có thể nắm bắt bất kỳ ai, phán đoán hành xử và hiểu được họ còn hơn chính bản thân họ. \\n Trích đoạn sách hay: \\n Một giám đốc phụ trách bán hàng nghi ngờ một trong những nhân viên kinh doanh của mình đang biển thủ công quỹ. Nếu hỏi trực tiếp “Có phải cô đang lấy trộm đồ của công ty?” sẽ khiến người bị nghi ngờ phòng bị ngay lập tức, việc muốn tìm ra chân tướng sự việc càng trở nên khó khăn hơn. Nếu cô ta không làm việc đó, dĩ nhiên cô ta sẽ nói với người giám đốc mình không lấy trộm. Ngược lại, dù có lấy trộm đi chăng nữa, cô ta cũng sẽ nói dối mình không hề làm vậy. Thay vào việc hỏi trực diện, người giám đốc khôn ngoan nên nói một điều gì đó tưởng chừng vô hại, như “Jill, không biết cô có giúp được tôi việc này không. Có vẻ như dạo này có người trong phòng đang lấy đồ của công ty về nhà phục vụ cho tư lợi cá nhân. Cô có hướng giải quyết nào cho việc này không?” rồi bình tĩnh quan sát phản ứng của người nhân viên. \\n Nếu cô ta hỏi lại và có vẻ hứng thú với đề tài này, anh ta có thể tạm an tâm rằng cô ta không lấy trộm, còn nếu cô ta đột nhiên trở nên không thoải mái và tìm cách thay đổi đề tài thì rõ ràng cô ta có động cơ không trong sáng. \\n Người giám đốc khi đó sẽ nhận ra sự chuyển hướng đột ngột trong thái độ và hành vi của người nhân viên. Nếu cô gái đó hoàn toàn trong sạch, có lẽ cô ta sẽ đưa ra hướng giải quyết của mình và vui vẻ khi sếp hỏi ý kiến của mình. Ngược lại, cô ta sẽ có biểu hiện không thoải mái rõ ràng và có lẽ sẽ cố cam đoan với sếp rằng cô không đời nào làm việc như vậy. Không có lí do gì để cô ta phải thanh minh như vậy, trừ phi cô là người có cảm giác tội lỗi…'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_18448.jpg', 'Rèn Luyện Tư Duy Phản Biện', NULL, 'Albert Rutherford', 'Nguyễn Ngọc Anh', '99000', '5', '2020', '16', '13 x 20.5', '2', '151', 'Như bạn có thể thấy, chìa khóa để trở thành một người có tư duy phản biện tốt chính là sự tự nhận thức. Bạn cần phải đánh giá trung thực những điều trước đây bạn nghĩ là đúng, cũng như quá trình suy nghĩ đã dẫn bạn tới những kết luận đó. Nếu bạn không có những lý lẽ hợp lý, hoặc nếu suy nghĩ của bạn bị ảnh hưởng bởi những kinh nghiệm và cảm xúc, thì lúc đó hãy cân nhắc sử dụng tư duy phản biện! Bạn cần phải nhận ra được rằng con người, kể từ khi sinh ra, rất giỏi việc đưa ra những lý do lý giải cho những suy nghĩ khiếm khuyết của mình. Nếu bạn đang có những kết luận sai lệch này thì có một sự thật là những đức tin của bạn thường mâu thuẫn với nhau và đó thường là kết quả của thiên kiến xác nhận, nhưng nếu bạn biết điều này, thì bạn đã tiến gần hơn tới sự thật rồi! \\n Những người tư duy phản biện cũng biết rằng họ cần thu thập những ý tưởng và đức tin của mọi người. Tư duy phản biện không thể tự nhiên mà có. \\n Những người khác có thể đưa ra những góc nhìn khác mà bạn có thể chưa bao giờ nghĩ tới, và họ có thể chỉ ra những lỗ hổng trong logic của bạn mà bạn đã hoàn toàn bỏ qua. Bạn không cần phải hoàn toàn đồng ý với ý kiến của những người khác, bởi vì điều này cũng có thể dẫn tới những vấn đề liên quan đến thiên kiến, nhưng một cuộc thảo luận phản biện là một bài tập tư duy cực kỳ hiệu quả. \\n Việc lắng nghe những ý kiến của người khác cũng có thể giúp bạn nhận ra rằng phạm vi tri thức của bạn không phải là vô hạn. Không ai có thể biết hết tất cả mọi thứ. Nhưng với việc chia sẻ và đánh giá phê bình kiến thức, chúng ta có thể mở rộng tâm trí. Nếu điều này khiến bạn cảm thấy không thoải mái, không sao cả. Trên thực tế, bước ra ngoài vùng an toàn là một điều quan trọng để mở rộng niềm tin và suy nghĩ của bạn. Tư duy phản biện không phải là chỉ biết vài thứ, và chắc chắn không phải việc xác nhận những điều bạn đã biết. Thay vào đó, nó xoay quanh việc tìm kiếm sự thật – và biến chúng trở thành thứ bạn biết.'),
('https://cdn0.fahasa.com/media/catalog/product/d/n/dntttttuntitled_1.jpg', 'Đắc Nhân Tâm - Bìa Cứng (Tái Bản 2021)', NULL, 'Dale Carnegie', 'Nguyễn Văn Phước', '108000', '11', '05/2021', '16', '	20.5 x 14.5', '1', '432', 'Đắc nhân tâm của Dale Carnegie là quyển sách của mọi thời đại và một hiện tượng đáng kinh ngạc trong ngành xuất bản Hoa Kỳ. Trong suốt nhiều thập kỷ tiếp theo và cho đến tận bây giờ, tác phẩm này vẫn chiếm vị trí số một trong danh mục sách bán chạy nhất và trở thành một sự kiện có một không hai trong lịch sử ngành xuất bản thế giới và được đánh giá là một quyển sách có tầm ảnh hưởng nhất mọi thời đại. \\n Đây là cuốn sách độc nhất về thể loại self-help sở hữu một lượng lớn người hâm mộ. Ngoài ra cuốn sách có doanh số bán ra cao nhất được tờ báo The New York Times bình chọn trong nhiều năm. Cuốn sách này không còn là một tác phẩm về nghệ thuật đơn thuần nữa mà là một bước thay đổi lớn trong cuộc sống của mỗi người. \\n Nhờ có tầm hiểu biết rộng rãi và khả năng ‘ứng xử một cách nghệ thuật trong giao  tiếp’ – Dale Carnegie đã viết ra một quyển sách với góc nhìn độc đáo và mới mẻ trong giao tiếp hàng ngày một cách vô cùng thú vị – Thông qua những mẫu truyện rời rạc nhưng lại đầy lý lẽ thuyết phục. Từ đó tìm ra những kinh nghiệm để đúc kết ra những nguyên tắc vô cùng ‘ngược ngạo’, nhưng cũng rất logic dưới cái nhìn vừa sâu sắc, vừa thực tế. \\n Hơn thế nữa, Đắc Nhân Tâm còn đưa ra những nghịch lý mà từ lâu con người ta đã hiểu lầm về phương hướng giao tiếp trong mạng lưới xã hội, thì ra, người giao tiếp thông minh không phải là người có thể phát biểu ra những lời hay nhất, mà là những người học được cách mỉm cười, luôn biết cách lắng nghe, và khích lệ câu chuyện của người khác. \\n Cuốn sách Đắc Nhân Tâm được chia ra làm 4 nội dung chính và mỗi phần cũng là một bài học về cuộc sống. \\n Phần 1: Nghệ thuật ứng xử cơ bản \\n - Không nên trách móc và than phiền, thù oán \\n - Muốn lấy được mật ong thì không nên phá tổ \\n - Trách móc một người nào đó là một việc dễ dàng. Thay vào đó, bạn hãy ngó lơ sự phán xét đó mà rộng lượng. Đồng thời tha thứ cho người đó và bỏ qua hết mọi chuyện thì mới đáng được tự hào. \\n - Biết khen ngợi và nhận được ơn nghĩa của người khác mới là bí mật lớn nhất về phép cư xử. \\n - Bạn cần phải biết khen ngợi và biết ơn người khác một cách thành thật nhất, chính là chìa khóa tạo nên tình nhân ái. \\n Phần 2: \\n - Bạn nên thật lòng quan tâm đến người khác \\n - Mỉm cười đó là cách để tạo ấn tượng tốt nhất \\n - Hay ghi nhớ lấy tên của người bạn đã và đang giao tiếp với bạn \\n - Bạn nên lắng nghe và khuyến khích người khác để trở thành người có khả năng giao tiếp cao \\n - Hãy nói về cái mà người khác để ý sẽ thu hút được người đó \\n Phần 3: Cách hướng người khác làm theo suy nghĩ của mình \\n - Không được để ra tranh cãi và cách giải quyết tốt nhất đó là không nên để nó xảy ra \\n - Tôn trọng ý kiến của mọi người, không bao giờ được nói người khác sai \\n - Thừa nhận được sai làm của mình, nếu phạm phải thì bạn cần phải thừa nhận điều đó \\n - Bạn cần phải hỏi những câu hỏi cần thiết để họ trả lời bạn bằng tiếng vâng ngay lập tức \\n - Khi nói chuyện bạn hãy để cho đối phương cảm nhận được họ làm chủ trong câu chuyện \\n - Để nhận được sự hợp tác thì bạn cần phải để họ nghĩ họ là người đưa ra ý tưởng \\n - Bạn cần phải đặt mình vào hoàn cảnh của họ để có thể hiểu hết về bản thân của họ \\n - Bạn hãy đồng cảm với mong muốn của mọi người \\n - Trong cuộc sống bạn hãy gợi lên sự cao thượng \\n - Thân thiện trong giao tiếp đó chính là sử dụng mật ngọt để bắt đầu được câu chuyện \\n - Bạn nên trình bày một cách rõ ràng và sinh động nhất \\n - Trong cuộc sống bạn cần phải vượt lên được thử thách \\n - Trước khi phê bình người khác bạn hãy khen ngợi người đó \\n - Khi phê bình bạn nên phê bình một cách gián tiếp \\n - Bạn nên khen ngợi người khác để có được một cuộc sống xứng đáng \\n - Bạn nên mở đường cho người khác để khắc phục sai lầm \\n - Bạn nên tôn vinh người khác khi nói chuyện \\n - Trước khi phê bình người khác thì bạn nên nhìn nhận lại bản thân của mình \\n - Thay vì ra lệnh cho người khác thì bạn hãy gợi ý cho họ \\n - Trong mọi chuyện bạn nên giữ thể diện cho người khác \\n - Bạn cần phải lưu ý những mối quan hệ của mình \\n Phần 4: Chuyển hóa được con người và không tạo lên sự oán hận và chống đối'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_22478.jpg', 'Nói Nhiều Không Bằng Nói Đúng', NULL, 'Phương Lan', NULL, '50000', '12', '2012', '16', '17 x 23', '2', '542', 'Quyển sách cung cấp 36 bí quyết để chiếm được cảm tình của người khác. \\n Muốn có mối quan hệ xã hội tốt, hãy bắt đầu từ những lời nói làm đẹp lòng mọi người. Trong giao tiếp, hãy luôn nhớ các nguyên tác: Im lặng - Quan sát - Lắng nghe. \\n Đừng nói quá thẳng thắn, khiến người nghe thấy khó chịu! \\n Nói chuyện không dễ nghe sẽ khiến mọi người phản cảm và xa cách bạn, đồng thời dẫn đến việc bạn trở thành người có ấn tượng xấu. \\n Lời nói hay như những giai điệu đẹp, ai cũng muốn nghe.'),
('https://cdn0.fahasa.com/media/catalog/product/8/9/8935095625154.jpg', 'Quẳng Gánh Lo Đi', NULL, 'Dale Carnege', 'Tâm An', '68000', '12', '2017', '16', '20.5 x 13.5', '1', '258', 'Quẳng Gánh Lo Đi Vui Sống Trong Mọi Hoàn Cảnh (Tái Bản) \\n Cùng với Đắc Nhân Tâm, Quẳng gánh lo đi - vui sống trong mọi hoàn cảnh là cuốn sách bán chạy nhất mọi thời đại của Dale Carnegie. Bạn sẽ tìm thấy những lời khuyên quý báu có thể giúp bạn giảm thiểu lo lắng rất đơn giản như chia sẻ với người khác, tìm cách để giải quyết vấn đề hay bỏ những điều phiền muộn ra khỏi suy nghĩ của bạn… \\n Nếu thực hiện đều đặn những điều này mỗi ngày, bạn sẽ thấy cuộc sống của mình nhẹ nhàng hơn rất nhiều, bởi bớt một chút phiền muộn là ta đã có thêm niềm vui. \\n Nói thì có vẻ dễ nhưng những vấn đề liên quan đến các trạng thái tinh thần chẳng bao giờ là dễ dàng để giải quyết. Chấm dứt lo lắng là điều không thể nhưng bớt đi sự lo lắng thì có thể, chỉ cần bạn đủ quyết tâm.'),
('https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-thi_n-t_i-b_n-tr_i-k_-_i_n-b_n-ph_i_1.jpg', 'Thiên Tài Bên Trái, Kẻ Điên Bên Phải (Tái Bản 2021)', NULL, 'Cao Minh', NULL, '179000', '7', '2021', '16', '24 x 16', '2', '438', 'Thiên Tài Bên Trái, Kẻ Điên Bên Phải \\n NẾU MỘT NGÀY ANH THẤY TÔI ĐIÊN, THỰC RA CHÍNH LÀ ANH ĐIÊN ĐẤY! \\n Hỡi những con người đang oằn mình trong cuộc sống, bạn biết gì về thế giới của mình? Là vô vàn thứ lý thuyết được các bậc vĩ nhân kiểm chứng, là luật lệ, là cả nghìn thứ sự thật bọc trong cái lốt hiển nhiên, hay những triết lý cứng nhắc của cuộc đời? \\n Lại đây, vượt qua thứ nhận thức tẻ nhạt bị đóng kín bằng con mắt trần gian, khai mở toàn bộ suy nghĩ, để dòng máu trong bạn sục sôi trước những điều kỳ vĩ, phá vỡ mọi quy tắc. Thế giới sẽ gọi bạn là kẻ điên, nhưng vậy thì có sao? Ranh giới duy nhất giữa kẻ điên và thiên tài chẳng qua là một sợi chỉ mỏng manh: Thiên tài chứng minh được thế giới của mình, còn kẻ điên chưa kịp làm điều đó. Chọn trở thành một kẻ điên để vẫy vùng giữa nhân gian loạn thế hay khóa hết chúng lại, sống mãi một cuộc đời bình thường khiến bạn cảm thấy hạnh phúc hơn? \\n Thiên tài bên trái, kẻ điên bên phải là cuốn sách dành cho những người điên rồ, những kẻ gây rối, những người chống đối, những mảnh ghép hình tròn trong những ô vuông không vừa vặn… những người nhìn mọi thứ khác biệt, không quan tâm đến quy tắc. Bạn có thể đồng ý, có thể phản đối, có thể vinh danh hay lăng mạ họ, nhưng điều duy nhất bạn không thể làm là phủ nhận sự tồn tại của họ. Đó là những người luôn tạo ra sự thay đổi trong khi hầu hết con người chỉ sống rập khuôn như một cái máy. Đa số đều nghĩ họ thật điên rồ nhưng nếu nhìn ở góc khác, ta lại thấy họ thiên tài. Bởi chỉ những người đủ điên nghĩ rằng họ có thể thay đổi thế giới mới là những người làm được điều đó. \\n Chào mừng đến với thế giới của những kẻ điên.'),
('https://cdn0.fahasa.com/media/catalog/product/6/7/67db9bf2590d75f978e68f9dcfe0db9a.jpg', 'Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)', NULL, 'Brian L Weiss', 'Du An', '99000', '13', '2022', '16', '20.5 x 14 x 0.5', '2', '298', 'Kiếp nào ta cũng tìm thấy nhau là cuốn sách thứ ba của Brain L. Weiss – một nhà tâm thần học có tiếng. Trước đó ông đã viết hai cuốn sách: cuốn đầu tiên là Ám ảnh từ kiếp trước, cuốn sách mô tả câu chuyện có thật về một bệnh nhân trẻ tuổi cùng với những liệu pháp thôi miên về kiếp trước đã làm thay đổi cả cuộc đời tác giả lẫn cô ấy. Cuốn sách đã bán chạy trên toàn thế giới với hơn 2 triệu bản in và được dịch sang hơn 20 ngôn ngữ. Cuốn sách thứ hai Through Time into Healing (Đi qua thời gian để chữa lành), mô tả những gì tác giả đã học được về tiềm năng chữa bệnh của liệu pháp hồi quy tiền kiếp. Trong cuốn sách đều là những câu chuyện người thật việc thật. Nhưng câu chuyện hấp dẫn nhất lại nằm trong cuốn sách thứ ba. \\n Kiếp nào ta cũng tìm thấy nhau nói về những linh hồn tri kỷ, những người có mối liên kết vĩnh viễn với nhau bằng tình yêu thương, luôn gặp lại nhau hết lần này đến lần khác, qua hết kiếp này tới kiếp khác. Chúng ta sẽ tìm thấy và nhận ra tri kỷ của mình như thế nào, rồi đưa ra những quyết định làm thay đổi cuộc sống của chính mình ra sao là những khoảnh khắc quan trọng và xúc động nhất trong cuộc đời mỗi người. \\n Định mệnh sẽ dẫn lối cho những linh hồn tri kỷ hội ngộ. Chúng ta sẽ gặp họ. Nhưng quyết định làm gì sau đó lại là quyền tự do lựa chọn của mỗi người. Một lựa chọn sai lầm hoặc một cơ hội bị bỏ lỡ có thể dẫn đến nỗi cô đơn và thống khổ tột cùng. Và một lựa chọn đúng đắn, một cơ hội được nắm bắt có thể mang lại niềm hạnh phúc sâu sắc. \\n Những gì tác giả viết trong sách được ghi lại từ hồ sơ bệnh án, băng thu âm và trí nhớ. Chỉ có tên và một vài chi tiết nhỏ được thay đổi để giữ tính bảo mật. Đây là câu chuyện về vận mệnh và hy vọng. Đây là câu chuyện xảy ra âm thầm mỗi ngày. \\n Ngày này năm đó, đã có người lắng nghe.  \\n Linh hồn tựa như nước \\n Rơi xuống từ thiên đường \\n Lên trời như khói sương \\n Rồi trở về với đất \\n Chuỗi tuần hoàn bất tận. \\n GOETHE'),
('https://cdn0.fahasa.com/media/catalog/product/t/h/th_ng-tin-xu_t-b_n-s_ch-t_m-l_-ng_i-nh_y-c_mbia1.jpg', 'Tâm Lý Dành Cho Người Nhạy Cảm', NULL, 'Hiroko Mizushima', 'Liên Vũ', '89000', '7', '2022', '16', '	19 x 13', '2', '528', 'Tâm Lý Dành Cho Người Nhạy Cảm \\n Trong cuộc sống thường nhật, nếu tâm trí của bạn luôn bị chi phối bởi những suy nghĩ tiêu cực như không biết người khác nghĩ gì về mình, mọi hành động và lời nói của mình sẽ khiến mọi người cảm thấy ra sao, nếu không hoàn thành tốt công việc thì hậu quả sẽ như thế nào… thì chứng tỏ bạn đang có những dấu hiệu của một người nhạy cảm, và đây chính là cuốn sách dành cho bạn. \\n Việc chúng ta để tâm đến cảm xúc của chính mình và ý kiến của người khác là điều rất tốt, bởi nó sẽ giúp chúng ta gắn kết bản thân với thế giới xung quanh. Song nếu tính nhạy cảm quá cao, chúng ta sẽ rất dễ tức giận, buồn rầu, sợ hãi và tổn thương, gây ảnh hưởng không nhỏ tới chất lượng cuộc sống, các mối quan hệ cũng như khiến chúng ta không đủ tự tin để phát huy hết năng lực của bản thân. \\n Cuốn sách này là tổng hợp những phương pháp vô cùng hiệu quả được viết bởi một bác sỹ - chuyên gia tâm lý học hàng đầu Nhật Bản giúp bạn làm chủ vô vàn cảm xúc của chính mình, cũng như cách thức để bạn luôn có được trạng thái thân an tâm lạc thay vì rơi vào vòng xoáy bế tắc dù là trong bất cứ hoàn cảnh nào. Hy vọng qua cuốn sách này, bạn sẽ buông bỏ được mọi âu lo, sống đúng với con người mình và có một cuộc đời an yên, hạnh phúc. \\n Trích dẫn trong sách: \\n Chỉ khi tâm hồn được thanh thản, chúng ta mới có thể phát huy được tối đa sức mạnh vốn có của bản thân cũng như tạo dựng được sự gắn kết với chính mình và người khác. \\n Đừng để nỗi bất an quẩn quanh trong tâm trí và tự vật lộn với nó, bởi chắc chắn điều ấy sẽ làm cho bạn càng lúc càng căng thẳng. Còn nếu biết cách vừa chia sẻ tâm sự với người khác, vừa điều chỉnh lại cách nghĩ của bản thân, có khi bạn sẽ nhận thấy những điều mình vốn đang băn khoăn hóa ra lại chẳng hề to tát như bạn đang tưởng tượng.'),
('https://cdn0.fahasa.com/media/catalog/product/8/9/8935244826487.jpg', 'Búp Sen Xanh (Tái Bản 2020)', NULL, 'Sơn Tùng', NULL, '72000', '1', '2020', '16', '20.5 x 12.5', '2', '175', 'Có thể xếp “Búp Sen Xanh” vào nhóm tác phẩm văn học dành cho thiếu nhi và là tác phẩm nổi tiếng nhất viết về chủ tịch Hồ Chí Minh trong suốt thời thơ ấu cho đến khi rời Việt Nam sang Pháp. \\n “Búp Sen Xanh” là nơi tiểu thuyết và lịch sử đã gặp nhau và hoạ nên một giai đoạn trong cuộc đời người Cha già của dân tộc Việt Nam. Nơi ấy, có quê nhà xứ Nghệ, có làng Sen, có khung dệt của mẹ, có lời dạy của cha, có những người bạn và những kỷ niệm ấu thơ. Nơi ấy có xứ Huế mà trong cuộc sống nghèo khổ có trăn trở tuổi trẻ, về con người, về vận mệnh dân tộc, có mất mát và đau thương... \\n “Búp Sen Xanh” vượt ra ngoài những giới hạn của một tác phẩm thiếu nhi, có thể làm bất kỳ ai rung động đến rơi nước mắt trong đêm chia ly, khi người con từ biệt cha ra đi để tìm một con đường cho chính mình và cho dân tộc. Một phần cuộc đời, trọn vẹn lý tưởng và dấn thân... Búp Sen Xanh không chỉ là câu chuyện về lãnh tụ mà còn là câu chuyện để làm người.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_237696.jpg', '39 Câu Hỏi Cho Người Trẻ', NULL, 'Phan Đăng', NULL, '90000', '1', '2021', '16', '20.5 x 14.5', '2', '521', 'Là một người trẻ, với biết bao băn khoăn về cuộc đời và nhân sinh đang mở ra trước mắt, đã bao giờ bạn tự hỏi: Tại sao phải hoài nghi? Tại sao phải tưởng tượng? Tại sao ta lập luận sai? Tại sao không nên vội tin vào một đấng tối cao?... Khi bạn đặt ra những câu hỏi ấy, chính là lúc bạn trả lời, nhưng câu trả lời không phải lúc nào cũng đơn giản và thấu đáo. \\n 39 câu hỏi cho người trẻ của nhà báo Phan Đăng là những gợi mở ban đầu trên con đường tìm kiếm câu trả lời của bạn. Bạn có thể đồng tình hoặc phản đối tác giả, nhưng chắc chắn một điều, cuốn sách sẽ giúp bạn suy tư nhiều hơn, độc lập hơn trong suy nghĩ và hành xử với thế giới, với mọi người xung quanh và với bản thân mình.'),
('https://cdn0.fahasa.com/media/catalog/product/8/9/8935325005381.jpg', 'Con Trai À, Khi Mệt Mỏi Hãy Đọc Những Dòng Này', NULL, 'Tae Jin Yun', 'Hà Hương', '99000', '12', '2022', '16', '20.5 x 14.5 x 0.7', '2', '428', 'Con Trai À, Khi Mệt Mỏi Hãy Đọc Những Dòng Này \\n NHỮNG BÀI HỌC SÂU SẮC ĐƯỢC ĐÚC KẾT TỪ CUỘC ĐỜI CHA \\n GỬI TỚI CON TRAI – NGƯỜI ĐANG TỪNG BƯỚC CHINH PHỤC ĐỈNH NÚI CUỘC ĐỜI MÌNH \\n Trong mắt cha, cuộc sống chính là dãy núi cao sừng sững, là đỉnh núi che khuất trong mây mà con người tuyệt đối không thể nào chạm tới. Xuất phát từ hai bàn tay trắng, cha đã trải qua rất nhiều vũng lầy, vực sâu của cuộc đời mang tên thất bại và tuyệt vọng. Vì vậy, cha muốn gửi đến con những điều quan trọng nhất mà cha đã học được trong suốt cuộc đời mình, mong rằng chúng có thể giúp ích cho con trong cuộc sống, để con leo lên đỉnh núi cuộc đời mình một cách thuận lợi hơn. Con hãy ghi nhớ lời cha dạy, rồi từ đó tạo ra con đường của riêng mình. Và hãy đi xa hơn cha dù chỉ là một chút, con nhé. \\n Con trai à, khi mệt mỏi, kiệt sức trên đường đời, hãy đọc những dòng này. \\n Trích dẫn trong sách: \\n “Đừng đi theo ánh sáng của người khác. \\n Hãy chỉ đi theo ánh sáng của riêng con mà thôi.” \\n “Hãy cố gắng hết sức trong công việc của bản thân và chờ đợi kết quả. Thay vì mong chờ may mắn tìm tới mình, chỉ cần những điều không may bỏ qua con là tốt lắm rồi.”'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29246.jpg', 'Nói Sao Cho Trẻ Nghe Lời', NULL, 'Hoa Dương', 'Thanh Loan', '46900', '5', '2019', '16', '	16 x 23', '2', '268', 'Đối mặt với những thái độ, hành vi tiêu cực của trẻ, có phải, mỗi vị phụ huynh đều cảm thấy dù mình có nói gì, con cái cũng không chịu nghe lời? Thật ra, chỉ cần thay đổi cách nói chuyện, cha mẹ sẽ phát hiện ra rằng: Hóa ra, nói sao cho trẻ nghe lời không hề khó. \\n Nếu cha mẹ hy vọng con cái nên người, giành được thành công thì phương pháp tốt nhất là luôn tán thưởng con cái, bồi dưỡng sự tự tin cho trẻ, tán dương tài năng của con. Nội tâm của trẻ vô cùng yếu đuối, đôi khi, chỉ cần một cú sốc nho nhỏ cũng khiến cho chúng thu mình lại, tự ti vô cùng. Trước những vấn đề con gặp phải, cha mẹ cần cổ vũ và động viên tích cực, để cho con lấy lại sự tự tin. Ngoài ra, nếu cha mẹ muốn con mình tiến bộ thì nên nghĩ cách để con nhìn ra sự tiến bộ của bản thân, giúp trẻ xây dựng cảm giác tự hào và tự tin.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_182756.jpg', '90% Trẻ Thông Minh Nhờ Cách Trò Chuyện Đúng Đắn Của Cha Mẹ (Tái Bản 2019)', NULL, 'Urako Kanamori', 'Phạm Lê Dạ Hương', '39000', '1', '2019', '13', '13 x 19', '2', '157', 'Bạn có bao giờ thốt ra những câu dù biết là không nên nói như  “Còn lề mề đến bao giờ nữa hả?” hay “Chẳng được cái trò trống gì, đưa đây xem nào!”… nhưng vẫn lỡ lời không? \\n Trong quá trình trẻ trưởng thành, những lời lẽ kiểu “Mày chẳng được cái tích sự gì!” trẻ phải nghe ngày ngày sẽ thẩm thấu qua vô thức, rồi sau đó trở thành ý thức coi mình chỉ là loại “vô dụng”. Không biết từ lúc nào, trẻ sẽ bắt đầu thực hiện những hành vi, lối sống không tốt. \\n Trong cuốn sách này, chúng tôi sẽ giới thiệu tới quý vị phụ huynh những câu nói “có phép lạ” khiến các con trở thành những đứa trẻ “tự có ý thức” mà cha mẹ không cần cằn nhằn nhiều. Hơn nữa, đây hoàn toàn là những câu chúng ta có thể áp dụng ngay từ ngày hôm nay như “Mẹ luôn đứng về phía con!”, “Mẹ con mình cùng làm nhé!”… \\n Về bản chất, mỗi đứa trẻ đều mang trong mình một “sức mạnh” tuyệt vời. Nhưng trước hết, chúng ta phải tin tưởng vào sức mạnh ấy đã! Khi được tin cậy, “sức mạnh” bên trong trẻ sẽ được nuôi dưỡng một cách tự nhiên. \\n Cuốn sách này sẽ giới thiệu cách trò chuyện giúp khai phá sức mạnh ấy từ nhiều góc độ. Chắc chắn không chỉ các con mà ngay cả chính các bậc phụ huynh cũng sẽ thay đổi. Cuộc sống sẽ lại một lần nữa trở nên thật tuyệt vời. \\n Cuốn sách này sẽ giúp mở rộng tiềm năng của trẻ tới vô hạn!'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_19074.jpg', 'Nuôi Con Không Phải Là Cuộc Chiến', NULL, 'Bubu Hương, Mẹ Ong Bông, Hachun Lyonnet', NULL, '99000', '13', '2019', '13', '15.5 x 24', '2', '524', 'Bạn đã được làm mẹ, được ôm trên tay sinh linh bé bỏng của mình. Hẳn bạn đang rất băn khoăn và trăn trở với hàng ngàn thắc mắc: làm thế nào để giúp bé làm quen với gia đình, bắt nhịp với cuộc sống mới lạ bên ngoài, làm thế nào để hiểu và đáp ứng đúng những nhu cầu của em bé sơ sinh chỉ mới biết dùng tiếng khóc làm công cụ duy nhất để giao tiếp đây. Những câu hỏi cứ liên tiếp nảy ra, bạn cuống cuồng tìm sự trợ giúp và giải đáp từ nhiều nguồn khác nhau, để rồi dễ dàng rơi vào một vòng xoáy sai lầm và một cuộc chiến mệt mỏi trong sự nghiệp nuôi con nhỏ. \\n Nuôi con không phải là cuộc chiến: Cuốn sách không là cẩm nang để bé ăn nhiều tăng cân nhanh hay dạy bé nghe lời răm rắp, mà giúp bạn hiểu con mình hơn. Giúp bạn hiểu chu kỳ sinh học của con và cách phối kết hợp cuộc sống gia đình với chu kỳ sinh học đó của bé. Hơn thế, cuốn sách còn hướng dẫn bạn cách cho ăn khi con đói, các thông tin kinh nghiệm và các trường hợp thực tế áp dụng thành công của các “bà mẹ tuyệt vọng” khác giúp bạn có thông tin cũng như nghị lực thay đổi cách áp dụng nuôi và dạy con ở gia đình. Suy cho cùng, nuôi không hẳn đã khó, đến đoạn dạy con còn khó hơn nhiều. Cuối cùng đây là kinh nghiệm đặt những khuôn khổ hợp lý cho từng lứa tuổi, là bài học về tôn trọng trẻ thơ trong những khuôn khổ ấy. Nó sẽ làm cho kinh nghiệm làm mẹ của bạn ngọt ngào hơn và tránh cho con một tuổi thơ nước mắt bên bát cơm.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_113885.jpg', 'Học Montessori Để Dạy Trẻ Theo Phương Pháp Montessori - 100 Hoạt Động Montessori: Con Không Cần Ipad Để Lớn Khôn', NULL, 'Ève Herrmann, Trần Thị Huế', NULL, '78000', '5', '2016', '13', '14,5 x 20,5', '2', '362', 'Dạy trẻ theo phương pháp Montessori không chỉ giúp phát huy tất cả năng lực nhận thức và cảm nhận giác quan theo đúng độ tuổi phát triển của trẻ mà còn thỏa mãn lòng ham muốn tìm tòi, khám phá thế giới của trẻ nhỏ. Các cuốn sách trong bộ Học Montessori để dạy trẻ theo phương pháp Montessori, bên cạnh việc giới thiệu những lý thuyết khoa học về dạy trẻ  của Montessori còn đặc biệt chú trọng tới việc đưa ra các hoạt động thú vị và hữu ích cho trẻ. Lời hướng dẫn thực hiện hoạt động rất ngắn gọn, dễ hiểu và kết hợp với các hình ảnh sinh động, trực quan để cha mẹ có thể hướng dẫn trẻ thực hiện tại nhà. \\n Cuốn 100 hoạt động Montessori: Con không cần iPad để lớn khôn gồm các hướng dẫn giúp trẻ làm quen với những hoạt động quen thuộc của cuộc sống thường nhật. Trẻ khoảng một tuổi rưỡi đã có khả năng thực hiện các hoạt động như tự rửa tay, mặc quần áo, dọn bàn ăn,.. nếu cha mẹ hướng dẫn trẻ đúng cách và tin tưởng vào khả năng tự lập của trẻ.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_113883.jpg', 'Học Montessori Để Dạy Trẻ Theo Phương Pháp Montessori - 100 Hoạt Động Montessori: Cha Mẹ Nên Chuẩn Bị Cho Trẻ Tập Đọc Và Viết Như Thế Nào?', NULL, 'Marie Hélène Place', 'Tố Nga', '53040', '5', '2016', '13', '	14,5 x 20,5', '2', '352', 'Học Montessori Để Dạy Trẻ Theo Phương Pháp Montessori - 100 Hoạt Động Montessori: Cha Mẹ Nên Chuẩn Bị Cho Trẻ Tập Đọc Và Viết Như Thế Nào? \\n Dạy trẻ theo phương pháp Montessori không chỉ giúp phát huy tất cả năng lực nhận thức và cảm nhận giác quan theo đúng độ tuổi phát triển của trẻ mà còn thỏa mãn lòng ham muốn tìm tòi, khám phá thế giới của trẻ nhỏ. Các cuốn sách trong bộ Học Montessori để dạy trẻ theo phương pháp Montessori, bên cạnh việc giới thiệu những lý thuyết khoa học về dạy trẻ  của Montessori còn đặc biệt chú trọng tới việc đưa ra các hoạt động thú vị và hữu ích cho trẻ. Lời hướng dẫn thực hiện hoạt động rất ngắn gọn, dễ hiểu và kết hợp với các hình ảnh sinh động, trực quan để cha mẹ có thể hướng dẫn trẻ thực hiện tại nhà. \\n Cuốn 100 hoạt động Montessori: Cha mẹ nên chuẩn bị cho trẻ tập đọc và viết như thế nào? sẽ cung cấp cho cha mẹ phương pháp dạy trẻ đọc và viết một cách tự nhiên nhất. Qua các hoạt động lý thú, trẻ sẽ tự tìm tòi bảng chữ cái và dần hình thành niềm yêu thích đọc sách, viết chữ.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_113884.jpg', 'Học Montessori Để Dạy Trẻ Theo Phương Pháp Montessori - 60 Hoạt Động Montessori Giúp Trẻ Trưởng Thành: Chờ Con Lớn Thì Đã Muộn', NULL, 'Marie Hélène Place, Trần Thị Huế', NULL, '65000', '5', '2016', '13', '14,5 x 20,5', '2', '521', 'Dạy trẻ theo phương pháp Montessori không chỉ giúp phát huy tất cả năng lực nhận thức và cảm nhận giác quan theo đúng độ tuổi phát triển của trẻ mà còn thỏa mãn lòng ham muốn tìm tòi, khám phá thế giới của trẻ nhỏ. Các cuốn sách trong bộ Học Montessori để dạy trẻ theo phương pháp Montessori, bên cạnh việc giới thiệu những lý thuyết khoa học về dạy trẻ  của Montessori còn đặc biệt chú trọng tới việc đưa ra các hoạt động thú vị và hữu ích cho trẻ. Lời hướng dẫn thực hiện hoạt động rất ngắn gọn, dễ hiểu và kết hợp với các hình ảnh sinh động, trực quan để cha mẹ có thể hướng dẫn trẻ thực hiện tại nhà. \\n Cuốn 60 hoạt động Montessori giúp trẻ trưởng thành: Chờ con lớn thì đã muộn đặc biệt quan tâm tới quá trình hoàn thiện các giác quan của trẻ. Cha mẹ có thể tạo các đồ chơi theo hướng dẫn để đánh thức các giác quan nhận biết và phân biệt màu sắc, âm thanh, mùi vị của trẻ nhỏ. Khi trẻ lớn hơn một chút, các hoạt động sẽ hướng dẫn trẻ rèn luyện sự khéo léo của đôi tay và từng bước làm quen với nếp sinh hoạt của gia đình.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_32310.jpg', 'Dạy Con Theo Cá Tính Của Con (Tái Bản 2020)', NULL, 'Aki Wakamatsu', NULL, '72000', '13', '2020', '16', '13 x 19', '2', '282', 'Dạy Con Theo Cá Tính Của Con Là Tái Bản Của Tựa Nuôi Dạy Trẻ - Làm Thế Nào Để Không Phát Điên?  \\n Như mọi người, Wakamatsu Aki cũng là một bà mẹ gặp rất nhiều khó khăn trong quá trình nuôi dạy con. Bà có hai người con. Cô con gái lớn tên Non là đứa trẻ hiền lành, ít nói còn cậu em trai của Non là Dai lại là một đứa trẻ rất tinh nghịch. Mỗi ngày bà đều phải “đau đầu” để suy nghĩ cách nuôi dạy sao cho phù hợp với hai đứa con mình. \\n Cách đây bảy năm, Wakamatsu Aki đã từng làm giáo viên ở một nhà trẻ. Một lần, có một cậu bé đã hỏi bà rất hồn nhiên rằng “Nếu con chỉ ham chơi thì liệu sau này có thể làm việc hay không?”. \\n Sau đó, trường mẫu giáo bị đóng cửa nên bà vừa ở nhà đảm đương công việc nhà, nuôi dạy con, vừa mở lớp “dạy trẻ” tại nhà. Chín năm đã trôi qua, bà đã có khá nhiều cơ hội để tiếp xúc với những đứa trẻ (khoảng trên 500 em). Trong suốt quá trình tiếp xúc với những đứa trẻ ấy, bà luôn “day dứt” với hàng loạt câu hỏi như: “Tại sao cùng một cách nuôi dạy, cư xử mà có trẻ trở nên tốt, ngoan hơn nhưng có trẻ lại không được như vậy?”, “Tại sao khi cùng bị mắng như nhau nhưng có đứa lại phải ứng kiểu nổi loạn, có đứa lại khóc lóc sướt mướt”, “Tại sao khi nói ‘con hãy đi mua một món bánh kẹo con thích đi nhé’ thì cậu con trai là Dai ngay lập tức chạy đi mua sôcôla, còn cô chị là Non thì phải 15 phút sau mới đi...?\" \\n Bà nghĩ câu hỏi quan trọng nhất đó là “Sự khác biệt trong ấy thể hiện điều gì?”. \\n Bạn có từng cảm thấy như vậy không? Mặc dù đứa trẻ nào cũng đều chui ra từ bụng mẹ nhưng mỗi đứa lại có một tính cách khác nhau. Đứa thì ít nói, đứa thì y như trẻ con hay nhõng nhẽo, đứa thì nghiêm trang, chín chắn như người lớn… Đứa thì đi đâu cũng lẽo đẽo theo mình, đứa thì nghịch ngợm, đi đâu cũng tự mình đi… Chắc cũng có lúc bạn cảm thấy khó hiểu và thích ứng với bọn trẻ. Nếu bạn có những vấn đề như  đã đề cập thì đừng lo lắng. Chúng ta có thể giải quyết những điều đó qua những thông tin được chia sẻ trong cuốn sách này. \\n Mỗi đứa trẻ là một bài toán đố mà chúng ta phải đi tìm câu trả lời. Với phương pháp “hiểu cách phân loại trẻ” được trình bày cụ thể trong cuốn sách này,chúng tôi hy vọng rằng các bậc phụ huynh sẽ tìm được phương pháp phù hợp trong quá trình nuôi dạy con cái và hãy áp dụng nó như một “chiến thuật” hợp lí.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_4953.jpg', 'Dạy Con Dùng Tiền (Tái Bản 2019)', NULL, 'Adam Khoo, Keon Chee', 'Minh Tú', '75000', '2', '2019', '16', '14 x 20', '2', '422', 'Adam Khoo và Keon Chee viết ra một quyển sách dựa trên kinh nghiệm của chính họ. Dạy Con Dùng Tiền đưa ra những hướng dẫn thực tế cho tất cả dạng cha mẹ - đã kết hôn, đã ly hôn, giàu, nghèo - về cách nuôi dạy những đứa trẻ có trách nhiệm tài chính trong một thời đại có quá nhiều tiền bạc. \\n TIỀN TIÊU VẶT + THU NHẬP KHÁC = TIẾT KIỆM + TIÊU XÀI + CHIA SẺ \\n Với công thức thuyết phục giúp con bạn trở nên thông minh về mặt tiền bạc, quyển sách này sẽ: \\n -  Chứng minh tầm quan trọng của việc cho con bạn tiền tiêu vặt \\n -  Giúp con bạn lên kế hoạch và làm theo ngân sách của chúng \\n -  Tạo ra khuôn khổ để tiêu dùng và tiết kiệm một cách khôn ngoan \\n -  Nhấn mạnh nhu cầu chia sẻ với người khác \\n -  Giới thiệu những ý tưởng mới để giúp con bạn tạo ra thu nhập riêng \\n -  Giải thích cách tránh hay trừ bỏ các thói quen xấu về tiền bạc \\n -  Dạy bạn cách giúp con mình đương đầu với những điều không mong đợi như mất thu nhập hay ly dị \\n -  Khởi động kế hoạch để lại gia tài của bạn - để giảm nhẹ tai họa từ những cái chết bất ngờ'),
('https://cdn0.fahasa.com/media/catalog/product/h/o/hoc-kieu-my-tai-nha-01.jpg', 'Học Kiểu Mỹ Tại Nhà', NULL, 'Hong Dinh', NULL, '118000', '7', '2019', '16', '14 x 20.5', '2', '143', 'Học Kiểu Mỹ Tại Nhà \\n Tổng quan về trường học và giáo dục tại Mỹ \\n Hướng dẫn lịch học cùng con tại nhà \\n Giới thiệu sâu về các môn Ngữ văn, Toán, Khoa học tự nhiên, Khoa học xã hội và nhân văn, các môn phụ và các kỹ năng ở Mỹ \\n Hướng dẫn cách tương tác phù hợp với con \\n Danh mục hàng trăm cuốn sách hay theo độ tuổi \\n Danh mục hàng trăm website và app học tập miễn phí'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_229090.jpg', 'Ăn Dặm Không Nước Mắt - Ăn Dặm Kiểu Nhật Và Những Món Ngon Lành Cho Bé (Tái Bản 2018)', NULL, 'Nguyễn Thị Ninh', NULL, '105000', '7', '2018', '16', '15.5 x 21', '2', '512', 'Ăn Dặm Không Nước Mắt - Ăn Dặm Kiểu Nhật Và Những Món Ngon Lành Cho Bé (Tái Bản 2018) \\n Thế nào là ăn dặm không nước mắt? Là khi con không khóc vì bị ép ăn và mẹ không khóc vì con bỏ bữa. Là khi con hào hứng trước mỗi bữa ăn và mẹ hạnh phúc thấy con ăn hết phần đồ ăn mẹ làm. \\n Cuốn sách Ăn dặm không nước mắt của mẹ Xoài, một người mẹ Việt nuôi con ở Nhật hẳn sẽ mang đến nhiều gợi ý. \\n Học hỏi các bà mẹ Nhật, mẹ Xoài đã cố gắng tập cho bé Xoài thói quen ăn uống tự giác, tập trung. Mẹ Xoài cũng tôn trọng sở thích, nhu cầu và mong muốn của bé. Còn để khiến bé háu ăn và ăn được nhiều hơn, mẹ Xoài đã chế biến các món ăn thật ngon lành, đa dạng, trang trí vô cùng đẹp mắt để bé chỉ nhìn thôi đã thèm. '),
('https://cdn0.fahasa.com/media/catalog/product/8/9/8935235215948.jpg', 'Hỏi Bác Sĩ Nhi Đồng - Giải Đáp Thắc Mắc Của Cha Mẹ Về Bệnh Con Nít', NULL, 'Trương Hữu Khanh', NULL, '79000', '14', '2018', '16', '14 x 20.5', '2', '157', 'Hỏi Bác Sĩ Nhi Đồng - Giải Đáp Thắc Mắc Của Cha Mẹ Về Bệnh Con Nít \\n Gần một đời nghề làm việc với trẻ em, gần một đời nghề tiếp xúc với bệnh nhi, làm việc tại Khoa Nhiễm - Thần kinh của Bệnh viện Nhi Đồng 1, nơi “đầu sóng ngọn gió” về dịch bệnh, Bác sĩ Trương Hữu Khanh thấu hiểu những khó khăn, lo lắng và nhiều vấn đề cha mẹ các bé quan tâm và hỏi han trong quá trình chăm sóc con cái. Với mong muốn chia sẻ, giải thích những khúc mắc của  cha mẹ các bé, bác sĩ đã mở fanpage Hỏi bác sĩ nhi đồng,giải đáp mọi vấn đề bệnh trẻ em, và trở thành một địa chỉ tin cậy của nhiều bà mẹ bỉm sữa. \\n Từ ý tưởng tập hợp một cách có hệ thống toàn bộ những bài viết có tính hỏi đáp giữa cha mẹ trẻ em và bác sĩ nhi vào trong một cuốn cẩm nang nhỏ, hữu ích, thiết thực, để làm sách gối đầu giường cho các bà mẹ bỉm sữa, cuốn sách Hỏi bác sĩ nhi đồng đã ra đời. Trong đó, bác sĩ Trương Hữu Khanh sẽ giải đáp hầu hết những thắc mắc về bệnh thường gặp ở trẻ em, từ bệnh liên quan đến hô hấp, đường ruột, bệnh ngoài da, bệnh nhiễm, cho đến toàn bộ những kiến thức về tiêm chủng, vắc xin, vấn đề dinh dưỡng, ăn dặm…'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_32590.jpg', 'Sổ Tay Ăn Dặm Của Mẹ (Tái Bản 2020)', NULL, 'BS Lê Thị Hải', NULL, '99000', '7', '2018', '16', '14 x 20.5', '2', '331', '“Trong quá trình khám chữa bệnh, tôi gặp nhiều trường hợp các em bé bị suy dinh dưỡng, còi xương không phải vì gia đình không có điều kiện mà do… quá có điều kiện. Tôi gặp những em bé khá bụ bẫm nhưng bố mẹ vẫn đưa đi khám vì thấy con không tăng cân và cho là con biếng ăn. Trong khi đó cũng có những trường hợp bố mẹ nói rằng con ăn rất được nhưng thực ra khẩu phần dinh dưỡng lại không đủ hoặc không cân đối. Nhưng biếng ăn là câu chuyện tôi gặp nhiều nhất. Chưa bao giờ câu chuyện cho bé ăn gì và ăn như thế nào lại khiến các bố mẹ lo lắng nhiều như vậy. \\n Chính vì thế tôi viết cuốn sách Sổ tay ăn dặm của mẹ này với hi vọng có thể giải đáp được phần lớn thắc mắc của các bà mẹ khi cho con ăn dặm. Sách được trình bày dưới dạng hỏi đáp ngắn gọn, cô đọng để mẹ nắm được những kiến thức cơ bản về dinh dưỡng cho bé trong độ tuổi ăn dặm, giải đáp thắc mắc về thói quen ăn uống và tiêu hóa của bé, hay là cách chăm sóc bữa ăn cho bé khi bé bị bệnh, cách chế biến và bảo quản thực phẩm khoa học.”'),
('https://cdn0.fahasa.com/media/catalog/product/k/o/komi-nu-than-so-giao-tiep---tap-11.jpg', 'Komi - Nữ Thần Sợ Giao Tiếp', '11', 'Tomohito Oda', 'Real', '25000', '1', '2022', '13', '17.6 x 11.3', '2', '351', 'Komi đi du lịch với cả nhà trong Tuần lễ Vàng rồi tình cờ gặp gỡ gia đình Tadano cùng Najimi và có một khoảng thời gian vô cùng vui vẻ với mọi người. Tadano cùng Komi đi dạo dưới bầu trời đầy sao thì đột nhiên một cơn mưa ập đến và phải trú tạm trong căn nhà nhỏ nơi sườn núi. Cả hai cùng chia sẻ một chiếc chăn để không ai bị lạnh. Sự ân cần ngại ngùng và khó nói thành lời dần hình thành một sợi dây gắn kết giữa hai người. \\n Mời các bạn thưởng thức tập 11 của câu chuyện hài hước về người đẹp sợ giao tiếp gửi gắm hơi ấm cùng sự quan tâm tới đối phương!!'),
('https://cdn0.fahasa.com/media/catalog/product/n/x/nxbtre_full_28582022_095801.jpg', 'Văn Phòng Thám Tử Quái Vật', '8', 'Sho Aimoto', 'Tuyết Quỳnh', '30000', '2', '2022', '13', '17.6 x 11.3', '2', '457', 'Ở một vùng quê yên tĩnh nọ bỗng xảy ra sự kiện gia súc chết hàng loạt rất quái lạ. Dân làng thuê vị thám tử tâm linh Inugami từ Tokyo về để điều tra vụ việc. Trong quá trình điều tra, Inugami gặp một cậu bé bị dân làng gọi bằng cái tên “Dorotabo”. Cậu bé giúp Inugami tìm ra sự thật, và để đáp lại, Inugami tiết lộ cho cậu biết cậu không phải con người, mà là một bán yêu. Từ đây, bánh xe vận mệnh của cậu bắt đầu lăn bánh, và những bí ẩn về thân thế của cậu bé dần được hé lộ.'),
('https://cdn0.fahasa.com/media/catalog/product/c/h/chu-thuat-hoi-chien---tap-4---ta-se-diet-tru-nguoi---obi.jpg', 'Chú Thuật Hồi Chiến - Tập 4 - Bản Thường - Tặng Kèm Obi Và Card Nhựa', '4', 'Gege Akutami', NULL, '30000', '1', '2022', '13', '17.6 x 11.3', '2', '583', 'Chú Thuật Hồi Chiến - Tập 4 - Bản Thường - Tặng Kèm Obi Và Card Nhựa \\n Tại hiện trường án mạng do chú linh gây ra, Itadori đã gặp gỡ Junpei, cả hai tâm đầu ý hợp. Nhưng Junpei lại tôn sùng chú linh Mahito, thủ phạm của vụ án. Mahito lợi dụng Junpei, hòng li gián cậu và Itadori. Junpei rơi vào cạm bẫy của hắn và...'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_182813.jpg', 'Mẹ Hỏi Bé Trả Lời 1-2 Tuổi (Tái Bản 2019)', NULL, 'Yosbook, Xiao Li', '	Hoàng Anh', '30000', '1', '2019', '13', '13 x 13', '2', '145', 'Bộ sách nhỏ xinh “Mẹ hỏi bé trả lời” tập hợp những trò chơi phong phú, câu đố thông minh giúp bé và cha mẹ có thể “học mà chơi, chơi mà học” qua các chủ đề: cách ứng xử, câu hỏi về tự nhiên, không gian, phân biệt hình khối, ngôn ngữ, toán học... \\n Sách phân chia theo từng lứa tuổi với nội dung phong phú, những câu hỏi đáp hàm súc trí tuệ, hình ảnh dễ thương cùng nhiều phương pháp rèn luyện, hoàn toàn có thể khơi dậy trí thông minh và khả năng tiềm ẩn của bé.'),
('https://cdn0.fahasa.com/media/catalog/product/d/a/danh-nhan-the-gioi---edison.jpg', 'Danh Nhân Thế Giới - Edison (Tái Bản 2022)', NULL, 'Neung In Publishing Company', 'Nguyễn Thị Thắm', '30000', '1', '2022', '13', '20.5 x 14.5 x 0.8', '2', '624', 'Danh Nhân Thế Giới: Edison (Tái Bản 2022) \\n Thuở nhỏ, nhà phát minh Edison là một cậu bé hay tò mò. Để trứng nở ra gà con, cậu đã ấp trứng như gà mái. Cậu cho bạn uống axít đun sôi với hi vọng bạn bay được lên trời, suýt nữa thì nguy to. Cậu luôn làm khó người lớn bởi những câu hỏi hóc búa. Thói quen của cậu là luôn tìm hiểu nguyên do và quy luật của mọi sự vật, hiện tượng. Mặc dù không thích ứng được với việc học ở trường nhưng bằng sự nhẫn nại, kiên trì Edison vẫn quyết theo đuổi bằng được hoài bão của mình. Cậu đi bán rau quả, bán báo trên tàu để lấy tiền mua sách, dụng cụ thí nghiệm. \\n Để chế tạo bóng đèn điện, Edison hầu như thức trắng đêm thí nghiệm trên tất cả mọi thứ như sợi chỉ, râu, tóc… Còn để chế tạo ra ắc quy kiềm, ông phải tiến hành 50.000 cuộc thí nghiệm trong vòng 10 năm… \\n Edison gặp rất nhiều thất bại nhưng ông không nản chí. Tài năng, lòng say mê, kiên trì, nhẫn nại của ông đã đem lại cho nhân loại hơn 1.300 phát minh. Đó là những thứ vô cùng quý giá mà Edison đã dành tặng cho chúng ta. \\n Thomas Edison (1847 – 1931)'),
('https://cdn0.fahasa.com/media/catalog/product/8/9/8935212351621.jpg', '100 Kỹ Năng Sinh Tồn', NULL, 'Clint Emerson', 'Mai Loan', '99000', '15', '2020', '13', '24 x 16 x 0.5', '2', '722', 'Bạn sẽ làm gì nếu như một ngày bị mắc kẹt giữa vùng lãnh thổ có dịch bệnh hoành hành, lạc ở nơi hoang dã, bị móc túi khi đi du lịch ở đất nước xa lạ, hay phải thoát ngay khỏi một vụ hỏa hoạn ở nhà cao tầng… ? Clint Emerson – một cựu Đặc vụ SEAL, lực lượng tác chiến đặc biệt của Hải quân Hoa Kỳ – muốn bạn có được sự chuẩn bị tốt nhất trong cuốn sách 100 kỹ năng sinh tồn này. \\n Rõ ràng, chi tiết và được trình bày dễ hiểu, cuốn sách này phác thảo chi tiết nhiều chiến lược giúp bảo vệ bạn và những người bạn yêu thương, dạy bạn cách suy nghĩ và hành động như một thành viên của lực lượng quân đội tinh nhuệ Hoa Kỳ. 100 kỹ năng sinh tồn thực sự là cuốn cẩm nang vô giá. Bởi lẽ, khi nguy hiểm xảy ra, bạn chẳng có nhiều thời gian cho những chỉ dẫn phức tạp đâu.'),
('https://cdn0.fahasa.com/media/catalog/product/8/9/8936071672704.jpg', 'Tôi Vẽ - Phương Pháp Tự Học Vẽ Truyện Tranh', NULL, 'Nhiều tác giả', NULL, '100000', '16', '09/2015', '13', '16 x 24', '2', '400', '“Tôi vẽ với 300 trang sách bao gồm những kỹ năng cơ bản cần có của một họa sĩ truyện tranh, từ tạo hình nhân vật, thiết kế bối cảnh, biểu cảm, các kỹ thuật diễn họa cho đến luật phối cảnh. Đây là một cuốn cẩm nang tuyệt vời dành cho các bạn đang bắt đầu học vẽ truyện tranh. Những kiến thức này có thể không giúp các bạn vẽ đẹp ngay lập tức nhưng sẽ là nền tảng vững chắc giúp bạn hình thành các tiêu chuẩn chuyên nghiệp trong nghề và không mất thời gian tự mò mẫm. Phần minh họa cho các bài học cũng rất hấp dẫn và sáng tạo. Các tác giả đã sử dụng chính nhân vật và trang truyện của mình để làm rõ sự liên quan giữa lý thuyết và thực tế, tính ứng dụng rõ ràng của các kỹ thuật và quy trình sáng tác. \\n  Trên thị trường hiện tại không thiếu những quyển sách dạy vẽ truyện tranh được dịch và biên tập lại từ nhiều nguồn nhưng đa số là kiểu sách “cầm tay chỉ việc”, không thật sữ hữu ích với các bạn trẻ Việt Nam – những bạn không theo học chuyên ngành mỹ thuật, thiếu kiến thức nền tảng về hội họa… Ngược lại, trong quyển Tôi vẽ, mọi phần kiến thức từ lớn đến nhỏ đều được lý giải và phân tích khá kỹ kèm ảnh minh họa rõ ràng, giúp người xem hiểu được gốc rễ vấn đề đồng thời áp dụng áp dụng vào nhiều “ngữ cảnh” khác nhau trong lúc sáng tác. Hệ thống kiến thức trong sách cũng được sắp xếp hợp lý từ thấp đến cao, xen kẽ là những trang truyện và hình minh họa vui nhộn làm giảm áp lực cho phần lý thuyết hơi khô cứng như phần phối cảnh và anatony (giải phẫu)”'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_190044.jpg', 'Bé Tập Tô Màu - Động Vật Sống Dưới Nước', NULL, 'Hải Nam', NULL, '10000', '17', '2019', '13', '17 x 24', '2', '268', 'Bộ Sách: Bé Tập Tô Màu ( Túi 8 Cuốn) 2019 \\n Việc giáo dục con cái cần bắt đầu từ sớm. Đa số các bé còn chưa biết cầm bút, các bé thường vẽ linh tinh khắp nơi. Dạy bé tô màu là một cách để giúp bé thể hiện tình cảm và giao lưu với mọi người. Tô màu chính là một hình thức để kích thích trí tưởng tượng, trí tuệ bé, lại có thể giúp các bé biểu hiện tình cảm của mình, điều quan trọng hơn là có thể dạy các bé làm quen với hình dạng và màu sắc, rèn luyện khả năng động não và luyện phối hợp tay của bé. \\n Bộ sách này với nhiều hình vẽ sinh động, màu sắc sặc sỡ, là những đồ vật, đồ chơi, những con vật trong thế giới tự nhiên, phương tiên giao thông, nhân vật, động vật... Căn cứ vào đặc điểm nhận thức của trẻ để từng bước huấn luyện, bộ sách chính là tài liệu hữu ích để khơi gợi tư duy bé. \\n Các tập được bố trí đơn giản, là những nét vẽ cơ bản đến những bước huấn luyện cao hơn về việc phối hợp màu sắc và hình dạng, từ đó giúp các bé cảm nhận được dùng các màu sắc khác nhau để thể hiện được những hiệu quả biểu đạt tình cảm khác nhau. Trong quá trình luyện tô màu, lại có thể giúp các bé nhận biết các đồ vật, con vật và học chữ.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_190042.jpg', 'Bé Tập Tô Màu - Phương Tiện Giao Thông', NULL, 'Hải Nam', NULL, '10000', '17', '2019', '13', '17 x 24', '2', '356', 'Bộ Sách: Bé Tập Tô Màu ( Túi 8 Cuốn) 2019 \\n Việc giáo dục con cái cần bắt đầu từ sớm. Đa số các bé còn chưa biết cầm bút, các bé thường vẽ linh tinh khắp nơi. Dạy bé tô màu là một cách để giúp bé thể hiện tình cảm và giao lưu với mọi người. Tô màu chính là một hình thức để kích thích trí tưởng tượng, trí tuệ bé, lại có thể giúp các bé biểu hiện tình cảm của mình, điều quan trọng hơn là có thể dạy các bé làm quen với hình dạng và màu sắc, rèn luyện khả năng động não và luyện phối hợp tay của bé. \\n Bộ sách này với nhiều hình vẽ sinh động, màu sắc sặc sỡ, là những đồ vật, đồ chơi, những con vật trong thế giới tự nhiên, phương tiên giao thông, nhân vật, động vật... Căn cứ vào đặc điểm nhận thức của trẻ để từng bước huấn luyện, bộ sách chính là tài liệu hữu ích để khơi gợi tư duy bé. \\n Các tập được bố trí đơn giản, là những nét vẽ cơ bản đến những bước huấn luyện cao hơn về việc phối hợp màu sắc và hình dạng, từ đó giúp các bé cảm nhận được dùng các màu sắc khác nhau để thể hiện được những hiệu quả biểu đạt tình cảm khác nhau. Trong quá trình luyện tô màu, lại có thể giúp các bé nhận biết các đồ vật, con vật và học chữ.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_184562.jpg', 'Vòng Quanh Thế Giới: Việt Nam (Tái Bản 2019)', NULL, 'Hạo Nhiên, Nguyên Hào', NULL, '12000', '1', '2019', '13', '18.5 x 18.5', '2', '526', 'Mỗi đất nước trên thế giới đều có rất nhiều điều thú vị để khám phá. Với chuyến du hành Vòng quanh thế giới, bạn sẽ được ghé thăm rất nhiều quốc gia, địa điểm nổi tiếng, biết thêm nhiều truyền thống văn hóa, lễ hội lí thú của con người khắp mọi nơi. Nào, còn chần chừ gì nữa, lên đường thôi! \\n Đất nước hình chữ S với phong cảnh thiên nhiên xinh đẹp, ẩm thực phong phú và là thiên đường của trái cây nhiệt đới. Quả gì được gọi là \"Vua các loại trái cây\"? Biểu tượng Thành phố Hồ Chí Minh là gì? Hang Sơn Đoòng lớn nhất thế giới nằm ở tỉnh nào? Có bao nhiêu dân tộc ở Việt Nam?'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_237443.jpg', 'Mẹ Hỏi Bé Trả Lời - Hỏi Đáp Rèn Trí Thông Minh - 3-4 Tuổi', NULL, 'Thanh Anh', 'Thanh Vân', '36000', '1', '2021', '13', '14 x 12 x 1', '2', '241', 'Mẹ đặt câu hỏi, \\n Bé con trả lời. \\n Người hỏi người đáp, \\n Trí tuệ mở mang. \\n Bộ sách nhỏ xinh Mẹ hỏi bé trả lời - Hỏi đáp rèn trí thông minh gồm năm tập với hàng trăm câu hỏi bổ ích, thú vị, được chia theo từng lứa tuổi, được minh hoạ bằng hình ảnh dễ thương, sinh động sẽ góp phần rèn luyện, khơi gợi trí thông minh và khả năng tiềm ẩn của bé, giúp bé yêu “học mà chơi, chơi mà học”. Một số câu hỏi đi kèm phần đáp án tham khảo, giúp bố mẹ và bé hỏi đáp hiệu quả hơn đấy.'),
('https://cdn0.fahasa.com/media/catalog/product/i/m/image_184558.jpg', 'Vòng Quanh Thế Giới: Hàn Quốc (Tái Bản 2019)', NULL, 'Hoài Nam, Nguyễn Hào', NULL, '12000', '1', '2019', '13', '18.5 x 18.5', '2', '515', 'Mỗi đất nước trên thế giới đều có rất nhiều điều thú vị để khám phá. Với chuyến du hành Vòng quanh thế giới, bạn sẽ được ghé thăm rất nhiều quốc gia, địa điểm nổi tiếng, biết thêm nhiều truyền thống văn hóa, lễ hội lí thú của con người khắp mọi nơi. Nào, còn chần chừ gì nữa, lên đường thôi! \\n Môn võ truyền thống của Hàn Quốc là gì? Hanbok là trang phục gì? Loài cây nào của Hàn Quốc được mệnh danh \"thần dược cho sức khỏe\"? Người Hàn Quốc ăn gì vào ngày sinh nhật? Đất nước được mệnh danh là vương quốc kim chi, có ngành công nghệ và giải trí phát triển bậc nhất châu Á.');

 INSERT INTO `thebooksumbrella`.`bookgenredata` (`productId`, `productGenreId`) VALUES 
('1', '1'),
('2', '1'),
('3', '1'),
('4', '2'),
('5', '2'),
('6', '2'),
('7', '3'),
('8', '3'),
('9', '3'),
('10', '4'),
('11', '4'),
('12', '4'),
('13', '5'),
('14', '5'),
('15', '5'),
('16', '6'),
('17', '6'),
('18', '6'),
('19', '7'),
('20', '7'),
('21', '7'),
('22', '8'),
('23', '8'),
('24', '8'),
('25', '9'),
('26', '9'),
('27', '9'),
('28', '10'),
('29', '10'),
('30', '10'),
('31', '11'),
('32', '11'),
('33', '11'),
('34', '12'),
('35', '12'),
('36', '12'),
('37', '13'),
('38', '13'),
('39', '13'),
('40', '14'),
('41', '14'),
('42', '14'),
('43', '15'),
('44', '15'),
('45', '15'),
('46', '16'),
('47', '16'),
('48', '16'),
('49', '17'),
('50', '17'),
('51', '17'),
('52', '18'),
('53', '18'),
('54', '18'),
('55', '19'),
('56', '19'),
('57', '19'),
('58', '20'),
('59', '20'),
('60', '20')

INSERT INTO `thebooksumbrella`.`cart` (`productId`, `customerId`, `quantity`) VALUES 
('2', '659323834', '3'),
('9', '659323834', '19');

INSERT INTO `thebooksumbrella`.`deliverymethod` (`delivery`) VALUES 
('Giao hàng nhanh'),
('Giao hàng tiết kiệm');

INSERT INTO `thebooksumbrella`.`paymentmethod` (`id`, `payment`) VALUES ('1', 'Thanh toán khi giao hàng (COD)'), ('2', 'Thanh toán qua PayPal');


INSERT INTO `thebooksumbrella`.`discounttype` (`type`) VALUES ('Voucher '), ('Coupon ');

INSERT INTO `thebooksumbrella`.`payorder` (`id`, `pay`) VALUES ('1', 'Chưa thanh toán'), ('2', 'Đã thanh toán');

INSERT INTO `thebooksumbrella`.`orderstatus` (`id`, `status`) VALUES ('1', 'Chờ Xác Nhận'), ('2', 'Đang vận chuyển'), ('3', 'Hoàn thành'), ('4', 'Đã Hủy');

INSERT INTO `thebooksumbrella`.`discountcode` (`id`, `code`, `discountTypeId`, `discountValue`) VALUES (1, 'NONE', 1, 0);

