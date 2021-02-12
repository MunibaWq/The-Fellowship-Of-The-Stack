const express = require("express");
const router = new express.Router();
const pool = require("../db");
const auth = require("../middleware/auth");

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

router.get("/myProducts",auth, async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            "SELECT * FROM products WHERE artist_id=" + req.user.id
        );
        const results = result.rows;
        const productsToSend = [];
        for (product of results) {
            const stockReq = await pool.query(
                "SELECT * FROM stock where product_id = " + product["id"]
            );
            const stock = stockReq.rows;
            const artist = req.user.username
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

router.post("/create", auth, async (req, res) => {
    if (req.user.type !== 1) {
        res.status(500).send('Not Authorized')
    }
    
    try {
        let {
            title,
            price,
            description,
            colours,
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
                +req.user.id,
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

router.put("/edit/:id", auth, async (req, res) => {
    if (req.user.type !== 1) {
        res.status(500).send('Not Authorized')
    }
    const { id } = req.params;
    let checkOwner = await pool.query('SELECT artist_id from products WHERE id = ' + id)
    if (checkOwner.rows[0].artist_id !== req.user.id) {
        res.status(500).send('Not Authorized')
    }
    if (Object.keys(req.body).length === 0) {
        res.send({
            message: "Theres nobody!",
        });
    }
    try {
        
        let {
            title,
            price,
            description,
            colours,
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
            "UPDATE products SET title = $1, price = $2, description = $3, colours = $4, sizes = $5, materials = $6, status=$7 WHERE id = $8 RETURNING id",
            [
                title,
                price,
                description,
                JSON.stringify(colours),
                JSON.stringify(sizes),
                materials,
                status,
                id,
            ]
        );
        if (status === "Backorder" || status === "Discontinue") {
            const changeStockToZero = pool.query(
                "UPDATE stock set quantity = 0 where product_id =" + id
            );
        }
        res.json(response.rows[0].id);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

// Delete a product PLEASE ADD AUTH

router.delete("/delete/:id", auth, async (req, res) => {
    const id = req.params.id;
    if (req.user.type !== 1) {
        res.status(500).send('Not Authorized')
    }
    let checkOwner = await pool.query('SELECT artist_id from products WHERE product_id = ' + id)
    if (checkOwner.rows[0].artist_id !== req.user.id) {
        res.status(500).send('Not Authorized')
    }
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
