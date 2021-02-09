const express = require("express");
const router = new express.Router();
const pool = require("../db");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { orderConfirmation } = require("../helperFunctions/sendGridFunctions");
router.post("/stripe/payment", (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "cad",
    };
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});

router.post("/paid", async (req, res) => {
    console.log(new Date().toLocaleString().replace(/\./g, ""));
    const { items, payment } = req.body;
    let orderResponse = await pool.query(
        `INSERT INTO orders
    (date, status, buyer_id, order_total)
    VALUES ($1,$2,$3,$4) returning id`,
        [
            new Date().toLocaleString().replace(/\./g, ""),
            "paid",
            1,
            payment.amount / 100,
        ]
    );

    for (item of items) {
        const orderItems = await pool.query(
            `
        INSERT INTO order_items
        (order_id, product_id, quantity, color, size)
        VALUES ($1,$2,$3,$4,$5)`,
            [
                orderResponse.rows[0].id,
                item.productID,
                item.itemQuantity,
                item.colour,
                item.size,
            ]
        );
        console.log(new Date().toLocaleString().replace(/\./g, ""));
        const salesByProduct = await pool.query(
            `
        INSERT INTO sales_by_product
        (order_id, product_id, quantity, sale_price, artist_id, color, size, date)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [
                orderResponse.rows[0].id,
                item.productID,
                item.itemQuantity,
                item.itemPrice,
                item.artistID,
                item.colour,
                item.size,
                new Date().toLocaleString().replace(/\./g, ""),
            ]
        );

        const reduceStock = await pool.query(
            `
        UPDATE stock set quantity=quantity-$1 where product_id=$2 AND color=$3 AND size=$4`,
            [item.itemQuantity, item.productID, item.colour, item.size]
        );
    }
    const getBuyerName = await pool.query(
        `SELECT username, email FROM users where id=1`
    );
    const user = getBuyerName.rows[0];
    const orderID = orderResponse.rows[0].id;

    const total = payment.amount / 100;

    orderConfirmation(total, user.username, user.email, orderID);
});

router.put("/edit/status/:id", async (req, res) => {
    if (orderStatus.length === 0) {
        res.send({
            message: "You have to give me data to update with!",
        });
    }
    try {
        const { id } = req.params; // For use in where
        let { orderStatus } = req.body.data; //For use in set

        let response = await pool.query(
            "UPDATE orders SET status = $1 WHERE id = $2 RETURNING id",
            [orderStatus, id]
        );
        res.json(response.rows[0].id);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

module.exports = router;
