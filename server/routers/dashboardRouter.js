const express = require("express");
const router = new express.Router();
const pool = require("../db");

router.get("/sales-by-products/:id", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT p.title, s.sale_price, s.quantity, SUM(s.sale_price * s.quantity) 
            FROM sales_by_product s
            INNER JOIN products p
            ON p.id=s.product_id
            GROUP BY product_id, title, s.sale_price, s.quantity
            ORDER BY SUM desc;
            `
        );

        const productSalesInfo = result.rows;

        res.json(productSalesInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});
router.get("/total-orders/:id", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT sum(order_total), EXTRACT(day FROM DATE) AS DAY, EXTRACT(month FROM DATE) AS month, EXTRACT(year FROM DATE) AS YEAR
            FROM orders
            GROUP BY EXTRACT(day FROM DATE), EXTRACT(month FROM DATE), EXTRACT(year FROM DATE)
            ORDER BY DAY desc;
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
            `SELECT sum(sale_price), EXTRACT(day FROM DATE) AS DAY, EXTRACT(month FROM DATE) AS month, EXTRACT(year FROM DATE) AS YEAR
            FROM sales_by_product
            GROUP BY EXTRACT(day FROM DATE), EXTRACT(month FROM DATE), EXTRACT(year FROM DATE)
            ORDER BY DAY desc
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

router.get("/average-order-value/:id", async (req, res) => {
    console.log(req.params, "fresh");
    try {
        const result = await pool.query(
            `SELECT (sum(order_total) / (COUNT(*) * 1)) AS Average, EXTRACT(day FROM DATE) AS DAY, EXTRACT(month FROM DATE) AS month, EXTRACT(year FROM DATE) AS YEAR
            FROM orders
            GROUP BY EXTRACT(day FROM DATE), EXTRACT(month FROM DATE), EXTRACT(year FROM DATE)
            ORDER BY DAY desc;
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
router.get("/recent-orders/:id", async (req, res) => {
    console.log(req.params, "fresh");
    try {
        const result = await pool.query(
            `SELECT o.*, u.name FROM orders o left JOIN users u on o.buyer_id=u.id ORDER BY Date desc;
            `
        );

        const orderInfo = result.rows;
        for (order of orderInfo) {
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            let ordersDate = new Date(order.date);

            let orderDate = ordersDate.toLocaleDateString("en-US", options);

            let orderTime = ordersDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            order.orderTime = orderTime;
            order.orderDate = orderDate;
        }
        console.log(orderInfo, "baked");

        console.log(orderInfo, "donuts");

        res.json(orderInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});

module.exports = router;
