const express = require("express");
const router = new express.Router();
const pool = require("../db");
const optionalAuth = require("../middleware/optionalAuth");

router.get("/", optionalAuth, async (req, res) => {
    const userID = req.user.id || req.params.session;
    const cartQuery = await pool.query(
        "SELECT * FROM carts WHERE user_id = " + userID
    );
    const cartID = cartQuery.rows[0].id;
    const itemsQuery = await pool.query(
        `SELECT c.*, p.thumbnail, p.sizes, p.title, p.price FROM cart_items C 
        INNER JOIN products p ON p.id = c.product_id 
        WHERE c.cart_id = ${cartID}`
    );
    const items = itemsQuery.rows;
    res.status(200).json(items);
});

router.get(
    "/:session/item/:cartProduct/:colour/:size",
    optionalAuth,
    async (req, res) => {
        const { session, cartProduct, colour, size } = req.params;
        const userID = req.user.id || session;
        const itemQuery = await pool.query(`SELECT quantity FROM cart_items WHERE
        user_id = ${userID} AND product_id = ${cartProduct} 
        AND colour=${colour} AND size=${size}`);
        const quantity = itemQuery.rows[0].quantity;
        res.status(200).send(quantity);
    }
);
router.post("/add", optionalAuth, async (req, res) => {
    const { cartProduct, colour, size, quantity, session } = req.body;
    const userID = req.user.id || session;
    let checkForCart = await pool.query(`SELECT id from carts WHERE user_id = ${userID}`)
    let cartID
    if (checkForCart.rows.length > 0) {
        cartID = checkForCart.rows[0].id
    } else {

        let cartResponse = await pool.query(`INSERT INTO carts (user_id) values (${userID}) RETURNING id`)
        cartID = cartResponse.rows[0].id
    }
    pool.query(`INSERT INTO cart_items (product_id, colour, size, quantity,cart_id) values (${cartProduct},'${colour}','${size}',${quantity},${cartID}) `)

});

router.put("/edit", optionalAuth, async (req, res) => {
    const { cartProduct, colour, size, quantity, session } = req.body;
    const userID = req.user.id || session;
});

router.delete("/remove", optionalAuth, async (req, res) => {
    const { cartProduct, colour, size, quantity, session } = req.body;
    const userID = req.user.id || session;
});

module.exports = router;
