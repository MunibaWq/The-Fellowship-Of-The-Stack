const express = require("express");
const router = new express.Router();
const pool = require("../db");

router.get("/sales-by-products/:id", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT p.title, s.sale_price, SUM(s.sale_price * s.quantity) 
            FROM sales_by_product s
            INNER JOIN products p
            ON p.id=s.product_id
            GROUP BY product_id, title, s.sale_price
            `
        );

        const productSalesInfo = result.rows;

        res.json(productSalesInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});

router.get("/total-sales/:id", async (req, res) => {
    console.log(req.params, "fresh");
    try {
        const result = await pool.query(
            `SELECT SUM(sale_price * quantity) 
            FROM sales_by_product 
            WHERE artist_id = ${req.params.id}
            `
        );

        const productSalesInfo = result.rows;
        console.log(result.rows, "baked");
        console.log(productSalesInfo, "donuts");

        res.json(productSalesInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});

module.exports = router;
