const express = require("express");
const router = new express.Router();
const pool = require("../db");
const auth = require("../middleware/auth");

router.get("/sales-by-products", auth, async (req, res) => {
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
router.get("/total-orders", auth, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT sum(sale_price), EXTRACT(day FROM DATE) AS DAY, 
            EXTRACT(month FROM DATE) AS MONTH, 
            EXTRACT(year FROM DATE) AS YEAR FROM sales_by_product 
            WHERE artist_id = ${req.user.id}
            GROUP BY EXTRACT(day FROM DATE), 
            EXTRACT(month FROM DATE), 
            EXTRACT(year FROM DATE)
            ORDER BY DAY desc
            `
        );
        const productSalesInfo = result.rows;

        res.json(productSalesInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});

router.get("/total-sales/", auth, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT sum(sale_price), EXTRACT(day FROM DATE) AS DAY, EXTRACT(month FROM DATE) AS month, EXTRACT(year FROM DATE) AS YEAR
            FROM sales_by_product
            WHERE artist_id = ${req.user.id}
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

router.get("/average-order-value", auth, async (req, res) => {
    console.log(req.params, "fresh");
    try {
        const result = await pool.query(
            `SELECT AVG(SUM) as average, day, MONTH, YEAR FROM 
            (SELECT SUM(sale_price), extract(day from DATE) AS DAY, 
            EXTRACT(month FROM DATE) AS month, EXTRACT(year FROM DATE) AS YEAR 
            FROM sales_by_product where artist_id = ${req.user.id} GROUP BY order_id, 
            EXTRACT(DAY FROM DATE), EXTRACT(month FROM DATE), 
            EXTRACT(year FROM DATE)) s 
            GROUP BY s.day, s.month,s.year ORDER BY s.DAY desc
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
router.get("/recent-orders", auth, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM orders o INNER JOIN
            (SELECT order_id FROM sales_by_product
                WHERE artist_id = ${req.user.id}
                GROUP BY order_id) x ON x.order_id = o.id`
            // `SELECT o.order_total, o.id, o.shipping_address, o.name, o.date, o.ship_date, o.delivery_notes, o.phone, o.pickup, o.status, s.artist_id, s.product_id, s.quantity, s.color, s.size, p.title
            // FROM orders o
            // INNER JOIN sales_by_product s
            // ON o.id = s.order_id
            // INNER JOIN products p
            // ON s.product_id = p.id
            // WHERE s.artist_id = ${req.user.id}`
        );
        // const orderResult = await pool.query(`SELECT order_total, id, shipping_address, name, date, phone, pickup, delivery_notes
        // FROM orders
        // WHERE  artist_id = ${req.user.id}`);

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

            let orderShipDate = new Date(order.ship_date);

            let shipDate = orderShipDate.toLocaleDateString("en-US", options);
            order.orderShipDate = order.ship_date === null ? null : shipDate;
        }

        console.log(orderInfo);
        res.json(orderInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});
router.get("/single/:orderid", auth, async (req, res) => {
    try {
        const orderResult = await pool.query(`SELECT order_total, o.id, o.shipping_address, o.name, o.date, o.phone, o.pickup
        FROM orders o
 
        WHERE  o.id = ${req.params.orderid} `);
        const result = await pool.query(
            `SELECT s.artist_id, s.product_id, s.quantity, s.color, s.size, p.title
            FROM sales_by_product s
            INNER JOIN products p
            ON s.product_id = p.id
            WHERE s.artist_id = ${req.user.id}`
        );

        const orderInfo = { order: orderResult.rows, orderItems: result.rows };
        res.json(orderInfo);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

module.exports = router;
