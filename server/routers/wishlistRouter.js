const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    try {
        const userID = req.user.id;
        const wishlistQuery = await pool.query(
            "SELECT * FROM wishlists WHERE user_id = " + userID
        );
        const wishlistID = wishlistQuery.rows[0].id;
        const itemsQuery = await pool.query(
            `SELECT w.*, p.thumbnail, p.sizes, p.title, p.price FROM wishlist_items W 
        INNER JOIN products p ON p.id = w.product_id 
        WHERE w.wishlist_id = ${wishlistID}`
        );
        const items = itemsQuery.rows;
        res.status(200).json(items);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

router.put("/add", auth, async (req, res) => {
    try {
        let { productID } = req.body.data;
        let userWishlist = await pool.query(`
    SELECT id FROM wishlists WHERE user.id = ${req.user.id}`);
        let wishlistInfo = await pool.query(
            `INSERT INTO wishlist_items (product_id, wishlist_id)
                VALUES ($1, $2) RETURNING id `,
            [productID, userWishlist.rows[0].id]
        );
        res.json(wishlistInfo.rows[0].id);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

router.delete("/delete", auth, async (req, res) => {
    let { productID } = req.body.data;
    let userWishlist = await pool.query(`
SELECT id FROM wishlists WHERE user.id = ${req.user.id}`);
    try {
        await pool.query(
            "DELETE FROM wishlist_items WHERE product_id = $1 AND wishlist_id = $2",
            [productID, userWishlist.rows[0].id]
        );

        res.json({ msg: "Wishlist Item Deleted!" });
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

module.exports = router;
