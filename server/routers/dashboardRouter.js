const express = require("express");
const router = new express.Router();
const pool = require("../db");

router.get("/sales-by-products", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT product_id, quantity, (sale_price*quantity) AS Total, color, SIZE, DATE FROM sales_by_product
            where artist_id=1 ORDER BY Total DESC`
        );
        console.log(result, "fresh");

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
