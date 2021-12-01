DROP DATABASE onlineauctionsystem;
CREATE DATABASE onlineauctionsystem;
\c onlineauctionsystem;
CREATE TABLE wallet (
	wallet_id int PRIMARY KEY,
	wallet_amount int
);

CREATE TABLE buyers (
	usermail varchar(40) UNIQUE NOT NULL, 
	userid SERIAL PRIMARY KEY,
	password varchar(40) NOT NULL,
	address varchar(40),
	fullname varchar(40),
	phone varchar(40),
	wallet_id int references wallet(wallet_id) on delete cascade
);

CREATE TABLE sellers (
	usermail varchar(40) UNIQUE NOT NULL, 
	userid SERIAL PRIMARY KEY,
	password varchar(40) NOT NULL,
	address varchar(40),
	fullname varchar(40),
	phone varchar(40),
	wallet_id int references wallet(wallet_id) on delete cascade
);

CREATE TABLE admin (
	usermail varchar(40) UNIQUE NOT NULL, 
	userid SERIAL PRIMARY KEY,
	password varchar(40) NOT NULL,
	address varchar(40),
	fullname varchar(40),
	phone varchar(40)
);

CREATE TABLE category (
	category_id SERIAL PRIMARY KEY,
	category_type varchar(40)
);

CREATE TABLE product (
	pid SERIAL PRIMARY KEY,
	seller_id int references sellers(userid) on delete cascade,
	starting_price int,
	name varchar(40),
	description varchar(100),
	bid_expiry timestamp,
	category_id int references category(category_id) on delete cascade,
	image_name varchar(40)
);

CREATE TABLE soldproduct (
	pid int references product(pid) on delete cascade,
	buyer_id int references buyers(userid) on delete cascade,
	selling_price int,
	purchase_date date,
	CONSTRAINT soldprodPK
		PRIMARY KEY (pid, buyer_id)
);

CREATE TABLE biddingproduct (
	pid int references product(pid) on delete cascade,
	bid_price int,
	buyer_id int references buyers(userid) on delete cascade,
	bidding_date date,
	CONSTRAINT bidprodPK
		PRIMARY KEY (pid, buyer_id)
);

