const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    const userID = req.user.id || req.params.session;
    const wishlistQuery = await pool.query(
        "SELECT * FROM wishlist WHERE user_id = " + userID
    );
    const wishlistID = wishlistQuery.rows[0].id;
    const itemsQuery = await pool.query(
        `SELECT w.*, p.thumbnail, p.sizes, p.title, p.price FROM wishlist_items W 
        INNER JOIN products p ON p.id = c.product_id 
        WHERE w.wishlist_id = ${wishlistID}`
    );
    const items = itemsQuery.rows;
    res.status(200).json(items);
});
