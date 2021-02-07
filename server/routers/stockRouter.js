const express = require("express");
const router = new express.Router();
const pool = require("../db");

//get all variations of specific product in stock db
router.get('/getByVariation/:id/:colour/:size', async (req, res) => {
    const { id, colour, size } = req.params
    const result = await pool.query(`SELECT * FROM stock 
    WHERE product_id = $1 AND color=$2 AND size=$3`,
        [id, colour, size])
    res.send(result.rows)
})
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

router.put("/put", async (req, res, next) => {
    try {
        const client = await pool.connect();
        for (const obj of req.body.stock) {
            const { id, quantity } = obj;
            await client.query(`UPDATE stock SET quantity = $1 WHERE id = $2`, [
                quantity,
                id,
            ]);
        }
        client.release(true);
        res.json({ msg: "all good" });
    } catch (error) {
        console.log(error);
        res.send("error request failed");
    }
});

router.post("/post", async (req, res, next) => {});

module.exports = router;
