const express = require("express");
const router = new express.Router();
const pool = require("../db");
const auth = require("../middleware/auth");

router.get("/sales-by-products", auth, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT s.color, s.size, s.sale_price, p.title, SUM(s.sale_price * s.quantity), SUM(s.quantity) AS quantity
            FROM sales_by_product s
            INNER JOIN products p
            ON p.id=s.product_id
            WHERE p.artist_id = ${req.user.id}
            GROUP BY title, s.sale_price, s.size, s.color
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

        res.json(orderInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});
router.get("/order/:orderid", auth, async (req, res) => {
    try {
        // const orderResult = await pool.query(`SELECT order_total, id, shipping_address, name, date, phone, pickup, delivery_notes
        // FROM orders
        // WHERE  id = ${req.params.orderid} `);
        // const result = await pool.query(
        //     `SELECT s.artist_id, s.product_id, s.quantity, s.color, s.size, p.title
        //     FROM sales_by_product s
        //     INNER JOIN products p
        //     ON s.product_id = p.id
        //     WHERE s.artist_id = ${req.user.id}`
        // );
        // const orderInfo = orderResult.rows;
        const result = await pool.query(
            `SELECT o.order_total, o.id, o.shipping_address, o.billing_address, o.name, o.date, o.ship_date, o.delivery_notes, o.phone, o.pickup, s.artist_id, s.product_id, s.quantity, s.color, s.size, p.title
            FROM orders o
            INNER JOIN sales_by_product s
            ON o.id = s.order_id
            INNER JOIN products p
            ON s.product_id = p.id
            WHERE s.artist_id = ${req.user.id} and o.id = ${req.params.orderid}`
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

            let orderShipDate = new Date(order.ship_date);

            let shipDate = orderShipDate.toLocaleDateString("en-US", options);
            order.orderShipDate = order.ship_date === null ? null : shipDate;
        }

        // const orderItems = result.rows;
        // console.log({ order: orderInfo, items: orderItems });
        res.json(orderInfo);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

// router.get("/ready-for-delivery", auth, async (req, res) => {
//     try {
//         const result = await pool.query(
//             `SELECT o.order_total, o.id, o.shipping_address, o.status, o.name, o.date, o.ship_date, u.address, u.username, o.delivery_notes, o.phone, o.pickup, s.artist_id, s.product_id, s.quantity, s.color, s.size, p.title
//             FROM orders o
//             INNER JOIN sales_by_product s
//             ON o.id = s.order_id
//             INNER JOIN products p
//             ON s.product_id = p.id
//             INNER JOIN users u
//             ON u.id = s.artist_id
//             WHERE o.status = 'Ready for Delivery'`
//         );
//         const orderInfo = result.rows;
//         for (order of orderInfo) {
//             let options = {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//             };

//             let ordersDate = new Date(order.date);

//             let orderDate = ordersDate.toLocaleDateString("en-US", options);

//             let orderTime = ordersDate.toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//             });
//             order.orderTime = orderTime;
//             order.orderDate = orderDate;

//             let orderShipDate = new Date(order.ship_date);

//             let shipDate = orderShipDate.toLocaleDateString("en-US", options);
//             order.orderShipDate = order.ship_date === null ? null : shipDate;
//         }
//         console.log("orders ready to deliver", orderInfo);
//         res.json(orderInfo);
//     } catch (err) {
//         console.error(err.message);
//         res.send({
//             message: "error",
//         });
//     }
// });

router.get("/driver/ready-for-delivery", auth, async (req, res) => {
    try {
        let deliveries = await pool.query(
            `SELECT o.id, o.name, o.shipping_address, o.deliverer_id, o. status FROM orders o INNER JOIN order_items i ON i.order_id = o.id WHERE o.status = 'Ready for Delivery' OR (o.status = 'Driver Assigned' AND o.deliverer_id = ${req.user.id}) GROUP BY i.order_id, o.id`
        );

        res.json(deliveries.rows);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

router.get("/driver/past-deliveries", auth, async (req, res) => {
    try {
        let deliveries = await pool.query(
            `SELECT * FROM orders WHERE status = 'Delivered' AND deliverer_id = ${req.user.id} GROUP BY id`
        );
        let pastDeliveries = deliveries.rows;

        for (order of pastDeliveries) {
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            let orderShipDate = new Date(order.ship_date);

            let shipDate = orderShipDate.toLocaleDateString("en-US", options);
            order.orderShipDate = order.ship_date === null ? null : shipDate;
        }

        res.json(pastDeliveries);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

router.put("/driver/ready-for-delivery/add/:orderid", auth, (req, res) => {
    try {
        pool.query(
            `UPDATE orders SET deliverer_id = ${req.user.id}, status = 'Driver Assigned' WHERE id = ${req.params.orderid}`
        );

        res.send("Updated");
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});
router.put("/driver/ready-for-delivery/remove/:orderid", auth, (req, res) => {
    try {
        pool.query(
            `UPDATE orders SET deliverer_id = null, status = 'Ready for Delivery' WHERE id = ${req.params.orderid}`
        );

        res.send("Updated");
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

router.get("/driver/ready-for-delivery/:orderid", async (req, res) => {
    console.log(req.params.orderid);
    try {
        const singleDelivery = await pool.query(`
        SELECT o.id, o.name, o.phone, o.email, o.delivery_notes, o.shipping_address, i.order_id, i.quantity, i.color, i.size, i.driver_status, u.username, u.address, p.title
        FROM orders o 
        INNER JOIN order_items i ON o.id = i.order_id 
        INNER JOIN products p ON p.id = i.product_id 
        inner join users u ON p.artist_id = u.id 
        WHERE o.id = ${req.params.orderid}
        `);
        res.json(singleDelivery.rows);
        console.log(singleDelivery.rows);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

router.get("/driver/past/:orderid", auth, async (req, res) => {
    try {
        const pastDeliveryItems = await pool.query(
            `
            SELECT o.id, o.name, o.phone, o.email, o.delivery_notes, o.shipping_address, i.order_id, i.quantity, i.color,
            i.size, p.title, i.driver_status, u.username, u.address 
            FROM orders o 
            INNER JOIN order_items i ON o.id = i.order_id 
            INNER JOIN products p ON p.id = i.product_id 
            inner join users u ON p.artist_id = u.id
            WHERE o.status = 'Delivered' AND o.deliverer_id = ${req.user.id} AND o.id = ${req.params.orderid}
            `
        );
        res.json(pastDeliveryItems.rows);
        console.log(pastDeliveryItems);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

router.get("/driver/assigned-deliveries", auth, async (req, res) => {
    try {
        const assignedDeliveries = await pool.query(
            `
            SELECT o.id, o.name, o.phone, o.email, o.delivery_notes, o.shipping_address, i.order_id, i.quantity, i.color, p.artist_id,
            i.size, p.title, i.driver_status, u.username, u.address 
            FROM orders o 
            INNER JOIN order_items i ON o.id = i.order_id 
            INNER JOIN products p ON p.id = i.product_id 
            inner join users u ON p.artist_id = u.id
            WHERE o.status = 'Driver Assigned' AND o.deliverer_id = ${req.user.id}
            `
        );
        res.json(assignedDeliveries.rows);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

router.get("/driver/assigned-deliveries/:artistid", auth, async (req, res) => {
    try {
        const assignedDeliveries = await pool.query(
            `
            SELECT o.id, o.name, o.phone, o.email, o.delivery_notes, o.shipping_address, i.order_id, i.quantity, i.color,
            i.size, p.title, i.driver_status, u.username, u.address 
            FROM orders o 
            INNER JOIN order_items i ON o.id = i.order_id 
            INNER JOIN products p ON p.id = i.product_id 
            inner join users u ON p.artist_id = u.id
            WHERE o.status = 'Driver Assigned' AND o.deliverer_id = ${req.user.id} and p.artist_id = ${req.params.artistid}
            `
        );
        res.json(assignedDeliveries.rows);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

module.exports = router;
