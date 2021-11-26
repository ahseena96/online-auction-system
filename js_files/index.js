const express = require("express");
const app = express();
var path = require('path');

const pool = require("./db");
// ajax calls are in ./public/main.js

app.use(express.json());  // req.body object

app.use(express.static(path.join(__dirname, 'public')));

// Routes

// get all products from product table
app.get("/products", async (req, res) => {
    const allproducts = await pool.query("select product_name, description, image_name, bid_expiry from products");
    res.json(allproducts.rows);
    // console.log(req.body);
});

app.get("/products/:cid", async (req, res) => {
    const allproducts = await pool.query("select product_name, description, image_name, bid_expiry from products where category_id = " + req.body.cid + ";");
    res.json(allproducts.rows);
    // console.log(req.body);
});

// show bid prods of a user - active (home) page of buyer user

app.get("/:uid", async (req, res) => {
    const allproducts = await pool.query("select p.name, p.description, p.bid_expiry, p.image_name, bp.bid_price from biddingproduct as bp inner join product as p where bp.buyer_id = " + req.params.uid + " and bid_expiry <= CURRENT_TIME;");
    res.json(allproducts.rows);
    // console.log(req.body);
});

// add prod to bid under that uid
// app.post

// show sold prods for seller (given id)

// insert into table
// this will correspond to a login form
// buyer sign-up
app.post("/buyer", async (req, res) => {

    // console.log(req.body);
    // const {username} = req.body.uname;
    // const {password} = req.body.pwd;
    // const {email} = req.body.email;
    // const {fname} = req.body.fname;
    // const {lname} = req.body.lname;
    // const {address} = req.body.address;
    // const {phone} = req.body.phone;
    console.log(req.body);
    const loginUser= await pool.query("insert into buyers (usermail, userid, password, address, fullname, phone) values ('"+ req.body.usermail + "', " + req.body.userid + ", '" + req.body.password + "', '" + req.body.address + "', '" + req.body.fname + "', " + req.body.phone + ") returning *");
    res.json(loginUser.rows);
    // add amount and add to wallet.. (users enter the id themselves)
});


// insert into table
// this will correspond to a login form
// seller sign-up
app.post("/seller", async (req, res) => {

    const loginUser= await pool.query("insert into seller (usermail, userid, password, address, fullname, phone, wallet_id) values ('"+ req.body.usermail + "', '" + req.body.userid + "', '" + req.body.password + "', '" + req.body.address + "', '" + req.body.fname + "', " + req.body.phone + ") returning *");
    res.json(loginUser.rows);
});

// insert a new product
app.post("/:sellerid", async (req, res) => {
    // we'll assume category id is also entered (admin knows the category ids)
    const newProd = await pool.query("insert into product (seller_id, starting_price, name, description, bid_expiry, category_id) values ('"+ req.params.sellerid + "', '" + req.body.starting_price + "', '" + req.body.name + "', '" + req.body.description + "', '" + req.body.bid_expiry + "', '" + req.body.category_id + ") returning *");
    res.json(newProd.rows);
});

// update a table (update a record in a table?)

// delete a product

app.delete("/:pid", async (req, res) => {
    // we'll assume category id is also entered (admin knows the category ids)
    const delProd = await pool.query("delete from productt into product where pid = '"+ req.params.pid + "'");
    res.json(delProd.rows);
    // console.log(req.body);
});



app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
