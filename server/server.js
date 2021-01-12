let express = require("express");
let cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
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

        productInfo["variations"] = productInfo["variations"].split(" ");

        productInfo["size"] = productInfo["size"].split(" ").map((dim) => +dim);
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
            product["variations"] = product["variations"].split(" ");
            product["size"] = product["size"].split(" ").map((dim) => +dim);
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

// Create a product

app.post("/products/create", async (req, res) => {
    // if (!req.body) {
    //     res.status(400).send({
    //         message: "Fields can not be empty!",
    //     });
    //     return;
    // }
    try {
        const {
            title,
            price,
            description,
            variations,
            artist_id,
            size,
            size_and_fit,
            materials,
        } = req.body;
        const newProduct = await pool.query(
            "INSERT INTO products (title, price, description, variations, artist_id, size, size_and_fit, materials) VALUES ($1, $2, $3,$4, $5,$6,$7,$8) RETURNING *",
            [
                title,
                price,
                description,
                variations,
                artist_id,
                size,
                size_and_fit,
                materials,
            ]
        );
    } catch (err) {
        console.error(err.message);
    }
});

// Update a product

app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params; // For use in where
        const { product } = req.body; //For use in set

        const updateProduct = await pool.query(
            "UPDATE todo SET product = $1 WHERE product_id = $2",
            []
        );
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a product
