const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/auth");

router.get("/current-order", auth, async (req, res, next) => {
    try {
        const id = req.user.id;
        const order_id = await pool.query(
            `
        SELECT id FROM orders WHERE deliverer_id = $1 AND status = 'Delivering'
        `,
            [id]
        );
        const result = await pool.query(
            `SELECT o.id, o.shipping_address, a.store_address, a.username, o.name, o.delivery_notes, o.phone, s.artist_id, s.product_id, s.quantity, s.color, s.size, p.title
            FROM orders o
            INNER JOIN sales_by_product s
            ON o.id = s.order_id
            INNER JOIN products p
            ON s.product_id = p.id
            INNER JOIN users a
            ON a.id = p.artist_id
            WHERE o.id = ${order_id.rows[0].id}`
        );
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json("an error has occurred");
    }
});

router.patch("/update-status", auth, async (req, res, next) => {
    try {
        const { status, order_id } = req.body;
        pool.query(
            `
        UPDATE orders SET deliverer_id = $1, status = $2 WHERE id = $3 
        `,
            [req.user.id, status, order_id]
        );
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(401).json("an error has occured");
    }
});

module.exports = router;
