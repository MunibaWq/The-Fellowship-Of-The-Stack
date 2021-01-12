let express = require("express");
let cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
const { table } = require("console");
const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432,
    max: 50,
});

let app = express();
app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));

// pool.connect().then((c) => {
//     client = c;
// });

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

//ROUTES

//Get all products FOR SEARCH

app.get("/search/:searchQuery", async (req, res) => {
    let query = req.params.searchQuery.toUpperCase().split(" ");
    let queryString = "";
    query.forEach((term, index) => {
        if (index == 0) {
            queryString = `(UPPER (title) LIKE '%${term}%' OR UPPER (description) LIKE '%${term}%')`;
        } else {
            queryString += ` AND (UPPER (title) LIKE '%${term}%' OR UPPER (description) LIKE '%${term}%')`;
        }
    });
    const client = await pool.connect();
    const result = await client.query(
        `SELECT * FROM products WHERE ${queryString}`
    );
    client.release(true);
    res.json(result.rows);
});

// Get a product

app.get("/product/:id", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM products WHERE id = ${req.params.id}`
        );
        console.log(result.rows[0]);
        const productInfo = result.rows[0];

        productInfo["colours"] = productInfo["colours"].split(" ");

        productInfo["sizes"] = productInfo["sizes"]
            .split(" ")
            .map((dim) => +dim);
        const artistReq = await client.query(
            "SELECT username FROM artists WHERE id = " +
                productInfo["artist_id"]
        );
        const artist = artistReq.rows[0].username;
        productInfo["artist"] = artist;
        console.log("productInfo", productInfo);
        client.release(true);
        res.json(productInfo);
    } catch (e) {
        console.log("error", e);

        res.send(e);
    }
});

//Get all products

app.get("/allProducts", async (req, res) => {
    try {
        const client = await pool.connect();
        console.log(pool.totalCount);
        const result = await client.query("SELECT * FROM products");
        const results = result.rows;
        const productsToSend = [];
        for (product of results) {
            product["colours"] = product["colours"].split(" ");
            product["sizes"] = product["sizes"].split(" ").map((dim) => +dim);
            const artistReq = await pool.query(
                "SELECT username FROM artists WHERE id = " +
                    product["artist_id"]
            );
            const artist = artistReq.rows[0].username;
            product["artist"] = artist;
            productsToSend.push(product);
        }
        client.release(true);
        res.json(productsToSend);
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});

// Create a product ON FRONT END - NEED TO SEND sizes AS OBJECT-> sizes:PRICE

app.post("/products/create", (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.send({
            message: "Theres nobody!",
        });
    }
    try {
        const {
            title,
            price,
            description,
            colours,
            artist_id,
            sizes,
            size_and_fit,
            materials,
        } = req.body;

        pool.query(
            "INSERT INTO products (title, price, description, colours, artist_id, sizes, size_and_fit, materials) VALUES ($1, $2, $3,$4, $5,$6,$7,$8) RETURNING *",
            [
                title,
                price,
                description,
                colours,
                artist_id,
                JSON.stringify(sizes),
                size_and_fit,
                materials,
            ]
        );
        res.json({ msg: "success" });
    } catch (err) {
        console.error(err.message);
        res.send("error");
    }
});

// Update a product

app.put("/products/edit/:id", (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.send({
            message: "Theres nobody!",
        });
    }
    try {
        const { id } = req.params; // For use in where
        const {
            title,
            price,
            description,
            colours,
            artist_id,
            sizes,
            size_and_fit,
            materials,
        } = req.body; //For use in set

        pool.query(
            "UPDATE products SET title = $1, price = $2, description = $3, colours = $4, artist_id = $5, sizes = $6, size_and_fit = $7, materials = $8 WHERE id = $9",
            [
                title,
                price,
                description,
                colours,
                artist_id,
                sizes,
                size_and_fit,
                materials,
                id,
            ]
        );
        res.json({ msg: "success" });
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

// Delete a product PLEASE ADD AUTH

app.delete("/products/delete/:id", async (req, res) => {
    const id = req.params.id;

    if (Object.keys(req.params).length === 0) {
        console.log("no id");
    }
    try {
        pool.query("DELETE FROM products WHERE id = $1", [id]);
        res.json({ msg: "Product Deleted!" });
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

//Load mulitple filed per image and convert to string
//will need to determine when last string has been recieved to execute
app.post("/images/add", (req, res) => {
    //the body will have a boolean to hold to determine if the last string is coming = lastString
    if (req.body.lastString) {
        //assign query variables
        //not getting image from the body because only part of it is coming in with each request
        let { label, img_size, product_id } = req.body;

        //make a query to insert the image into the db
        pool.query(
            "INSERT INTO images (image, label, img_size, product_id,) VALUES ($1, $2, $3,$4, $5,$6,$7,$8) RETURNING *",
            [image, label, img_size, product_id]
        );
    }
});
