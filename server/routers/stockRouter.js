const express = require("express");
const router = new express.Router();
const pool = require("../db");
const auth = require("../middleware/auth");
//get all variations of specific product in stock db
router.get("/getByVariation/:id/:colour/:size", async (req, res) => {
 
    const { id, colour, size } = req.params;
    const result = await pool.query(
        `SELECT * FROM stock 
    WHERE product_id = $1 AND color=$2 AND size=$3`,
        [id, colour, size]
    );
    res.send(result.rows);
});
router.get("/get/:id", async (req, res, next) => {
    const { id } = req.params;
    const client = await pool.connect();
    const result = await pool.query(
        "SELECT * FROM stock WHERE product_id = $1",
        [id]
    );
    client.release(true);
    res.json(result.rows);
});

//Get all variations from all products in stock db
router.get("/getAll", async (req, res, next) => {
    const client = await pool.connect();
    const result = await pool.query("SELECT * FROM stock");
    client.release(true);
    res.json(result.rows);
});

//edit stock

router.put("/update", auth, async (req, res, next) => {
    if (req.user.type !== 1) {
        res.status(500).send('Not Authorized')
    }
    const { id } = req.body;
    let checkOwner = await pool.query('SELECT artist_id from products WHERE id = ' + id)
    if (checkOwner.rows[0].artist_id !== req.user.id) {
        res.status(500).send('Not Authorized')
    }
    try {
        
        const client = await pool.connect();
        
        await client.query(
            `
        DELETE FROM stock WHERE product_id = $1`,
            [id]
        );
        for (const obj of req.body.quant) {
            const { color, size, quantity } = obj;
            await client.query(
                `INSERT INTO stock (product_id, color, size, quantity) VALUES ($1, $2, $3, $4)`,
                [id, color, size, quantity]
            );
        }
        client.release(true);
        res.json({ msg: "all good" });
    } catch (error) {
        console.log(error);
        res.send("error request failed");
    }
});

router.post("/post", auth, async (req, res, next) => {
    if (req.user.type !== 1) {
        res.status(500).send('Not Authorized')
    }
    const { id } = req.body;
    let checkOwner = await pool.query('SELECT artist_id from products WHERE id = ' + id)
    if (checkOwner.rows[0].artist_id !== req.user.id) {
        res.status(500).send('Not Authorized')
    }
    try {
        const client = await pool.connect();
  
        for (const obj of req.body.quant) {
            const { color, size, quantity } = obj;
            await client.query(
                `INSERT INTO stock (product_id, color, size, quantity) VALUES ($1, $2, $3, $4)`,
                [id, color, size, quantity]
            );
        }
        client.release(true);
        res.json({ msg: "all good" });
    } catch (error) {
        console.log(error);
        res.send("error request failed");
    }
});

module.exports = router;
