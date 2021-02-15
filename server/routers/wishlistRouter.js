const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    if (!req.user.is_artist || !req.user.is_buyer) {
        res.status(500).send("Not Authorized");
    } else {
        const userID = req.user.id;
        const wishlistQuery = await pool.query(
            "SELECT * FROM wishlist WHERE user_id = " + userID
        );
        const wishlistID = wishlistQuery.rows[0].id;
        const itemsQuery = await pool.query(
            `SELECT w.*, p.thumbnail, p.sizes, p.title, p.price FROM wishlist_items W 
        INNER JOIN products p ON p.id = w.product_id 
        WHERE w.wishlist_id = ${wishlistID}`
        );
        const items = itemsQuery.rows;
        res.status(200).json(items);
    }
});

router.put("/add", auth, async (req, res) => {
    if (!req.user.is_artist || !req.user.is_buyer) {
        res.status(500).send("Not Authorized");
    } else {
        try {
            let { id, productID, wishlistID } = req.body.data;

            let wishlistInfo = await pool.query(
                `INSERT INTO wishlist_items (product_id,wishlist_id)
                VALUES ($1,$2) RETURNING id `,
                [productID, wishlistID]
            );
            res.json(wishlistInfo.rows[0].id);
        } catch (err) {
            console.error(err.message);
            res.send({
                message: "error",
            });
        }
    }
});
