const express = require("express");
const router = new express.Router();
const pool = require("../db");
//search products by keyword found in title and description
router.get("/search/:searchQuery", async (req, res) => {
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
router.get("/get/:id", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM products WHERE id = ${req.params.id}`
        );

        const productInfo = result.rows[0];

        productInfo["colours"] = JSON.parse(productInfo["colours"]);
        productInfo["sizes"] = JSON.parse(productInfo["sizes"]);
        const artistReq = await client.query(
            "SELECT username FROM artists WHERE id = " +
                productInfo["artist_id"]
        );
        const artist = artistReq.rows[0].username;
        productInfo["artist"] = artist;
        client.release(true);
        res.json(productInfo);
    } catch (e) {
        console.log("error", e);

        res.send(e);
    }
});

//Get all products

router.get("/allProducts", async (req, res) => {
    try {
        const client = await pool.connect();
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

router.post("/create", async (req, res) => {
    // if (Object.keys(req.body.data).length === 0) {
    //     res.send({
    //         message: "Theres nobody!"
    //     })
    // }
    try {
        const {
            title,
            price,
            description,
            colours,
            artist_id,
            sizes,
            materials,
        } = req.body.data;
        console.log(typeof req.body.data);
        let productInfo = await pool.query(
            "INSERT INTO products (title, price, description, colours, artist_id, sizes, materials) VALUES ($1, $2, $3,$4, $5,$6,$7) RETURNING id",
            [
                title,
                +price,
                description,
                JSON.stringify(colours),
                +artist_id,
                JSON.stringify(sizes),
                materials,
            ]
        );

        res.json(productInfo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.send("error");
    }
});

// Update a product

router.put("/edit/:id", async (req, res) => {
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
            materials,
        } = req.body.data; //For use in set
        let response = await pool.query(
            "UPDATE products SET title = $1, price = $2, description = $3, colours = $4, artist_id = $5, sizes = $6, materials = $7 WHERE id = $8 RETURNING id",
            [
                title,
                price,
                description,
                JSON.stringify(colours),
                artist_id,
                JSON.stringify(sizes),
                materials,
                id,
            ]
        );
        res.json(response.rows[0].id);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

// Delete a product PLEASE ADD AUTH

router.delete("/delete/:id", async (req, res) => {
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
module.exports = router;
