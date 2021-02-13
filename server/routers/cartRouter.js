const express = require("express");
const router = new express.Router();
const pool = require("../db");
const optionalAuth = require("../middleware/optionalAuth");

router.get("/:session", optionalAuth, async (req, res) => {
    const userID = req.user.id || req.params.session;
    const cartQuery = await pool.query(
        "SELECT * FROM carts WHERE user_id = " + userID
    );
    const cartID = cartQuery.rows[0].id
    const itemsQuery = await pool.query(`SELECT * FROM cart_items WHERE cart_id = ${cartID}`)
    const items = itemsQuery.rows
    res.status(200).json(items)
});

router.get(
    "/:session/item/:cartProduct/:colour/:size",
    optionalAuth,
    async (req, res) => {
        const { session, cartProduct, colour, size } = req.params;
        const userID = req.user.id || session;
        const itemQuery = await pool.query(`SELECT quantity FROM cart_items WHERE
        user_id = ${userID} AND product_id = ${cartProduct} 
        AND colour=${colour} AND size=${size}`)
        const quantity = itemQuery.rows[0].quantity
        res.status(200).send(quantityfdsv                                           m)
    }
);
router.post("/add", optionalAuth, async (req, res) => {
    const { cartProduct, colour, size, quantity, session } = req.body;
    const userID = req.user.id || session;
});

router.put("/edit", optionalAuth, async (req, res) => {
    const { cartProduct, colour, size, quantity, session } = req.body;
    const userID = req.user.id || session;
});

router.delete("/remove", optionalAuth, async (req, res) => {
    const { cartProduct, colour, size, quantity, session } = req.body;
    const userID = req.user.id || session;
});
