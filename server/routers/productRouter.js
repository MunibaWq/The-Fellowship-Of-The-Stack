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
    const products = result.rows;
    for (product of products) {
        const stockReq = await pool.query(
            "SELECT * FROM stock where product_id = " + product["id"]
        );
        const stock = stockReq.rows;
        product["stock"] = stock;
    }
    client.release(true);
    res.json(result.rows);
});
// Get a product
router.get("/get/:id", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await pool.query(
            `SELECT * FROM products WHERE id = ${req.params.id}`
        );

        const productInfo = result.rows[0];

        const artistReq = await client.query(
            "SELECT username FROM users WHERE id = " + productInfo["artist_id"]
        );
        const artist = artistReq.rows[0].username;
        productInfo["artist"] = artist;
        const stockReq = await pool.query(
            "SELECT * FROM stock where product_id = " + productInfo["id"]
        );
        const stock = stockReq.rows;
        productInfo["stock"] = stock;
        client.release(true);
        res.json(productInfo);
    } catch (e) {
        console.log("error", e);

        res.send(e);
    }
});

//Get all products
router.get("/test", async (req, res, next) => {
    const client = await pool.connect();
    const result = await pool.query(
        "SELECT * FROM stock WHERE product_id = 22"
    );
    client.release(true);
    res.json(result.rows);
});
//create 'create' route for stocktable
//create delete route for stocktable
//create get route for stock table
//create edit route for stock table
router.put("/put", async (req, res, next) => {
    try {
        const client = await pool.connect();
        const result = await pool.query(
            `
    UPDATE stock SET 
    quantity = $1 WHERE id = $2`,
            [quantity, id]
        );
    } catch (error) {
        console.log(error);
        res.json("request failed!");
    }
});

router.get("/artistsProducts/:id", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            "SELECT * FROM products WHERE artist_id=" + req.params.id
        );
        const results = result.rows;
        const productsToSend = [];
        for (product of results) {
            const artistReq = await pool.query(
                "SELECT username FROM users WHERE id = " + product["artist_id"]
            );
            const stockReq = await pool.query(
                "SELECT * FROM stock where product_id = " + product["id"]
            );
            const stock = stockReq.rows;
            const artist = artistReq.rows[0].username;
            product["stock"] = stock;
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

router.get("/allProducts", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM products");
        const results = result.rows;
        const productsToSend = [];
        for (product of results) {
            const artistReq = await pool.query(
                "SELECT username FROM users WHERE id = " + product["artist_id"]
            );
            const stockReq = await pool.query(
                "SELECT * FROM stock where product_id = " + product["id"]
            );
            const stock = stockReq.rows;
            const artist = artistReq.rows[0].username;
            product["stock"] = stock;
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
        let {
            title,
            price,
            description,
            colours,
            artist_id,
            sizes,
            materials,
        } = req.body.data;
        if (!colours || colours.length === 0) {
            colours = [{ label: "O", value: "#444" }];
        }
        if (!sizes || sizes.length === 0) {
            sizes = [{ label: "O", price: "0" }];
        }
        // To sort the sizes entered in the correct order
        // Will sort numerical sizes numerically
        let sizesOrder = ["XS", "S", "M", "L", "XL", "XXL"];
        sizes.sort((a, b) => {
            return (
                sizesOrder.indexOf(a.label) - sizesOrder.indexOf(b.label) ||
                +a.label - +b.label
            );
        });
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
        let productID = productInfo.rows[0].id;
        let query = [];
        for (colour of colours) {
            for (size of sizes) {
                query.push(
                    `INSERT INTO "stock" ("product_id", "color", "size") VALUES ('${productID}', '${colour.label}', '${size.label}');`
                );
            }
        }
        pool.query(query.join(" "));
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
        let {
            title,
            price,
            description,
            colours,
            artist_id,
            sizes,
            materials,
            status,
        } = req.body.data; //For use in set
        if (colours.length === 0) {
            colours = [{ label: "O", value: "#444" }];
        }
        if (sizes.length === 0) {
            sizes = [{ label: "O", price: "0" }];
        }
        let sizesOrder = ["XS", "S", "M", "L", "XL", "XXL"];
        sizes.sort((a, b) => {
            return (
                sizesOrder.indexOf(a.label) - sizesOrder.indexOf(b.label) ||
                +a.label - +b.label
            );
        });
        let response = await pool.query(
            "UPDATE products SET title = $1, price = $2, description = $3, colours = $4, artist_id = $5, sizes = $6, materials = $7, status=$8 WHERE id = $9 RETURNING id",
            [
                title,
                price,
                description,
                JSON.stringify(colours),
                artist_id,
                JSON.stringify(sizes),
                materials,
                status,
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
        await pool.query("DELETE FROM images WHERE product_id = $1", [id]);
        await pool.query("DELETE FROM stock WHERE product_id = $1", [id]);
        await pool.query("DELETE FROM products WHERE id = $1", [id]);
        res.json({ msg: "Product Deleted!" });
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});
module.exports = router;
