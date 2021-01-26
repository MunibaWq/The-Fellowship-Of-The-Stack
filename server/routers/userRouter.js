const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
    generateAuthToken,
    findByCredentials,
} = require("../helperFunctions/index");

router.post("/create", async (req, res, next) => {
    const user = req.body;
    const hashPassword = await bcrypt.hash(user.password, 8);
    const data = await pool.query(
        `INSERT INTO users (username, password, email, address, type) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [user.username, hashPassword, user.email, user.address, user.type]
    );
    const createUser = data.rows[0];
    delete createUser.password;
    res.json(createUser);
});

router.post("/login", async (req, res, next) => {
    try {
        const user = await findByCredentials(
            req.body.username,
            req.body.password
        );
        const token = generateAuthToken(user);
        pool.query(`INSERT INTO tokens (user_id, token) VALUES ($1, $2)`, [
            user.id,
            token,
        ]);
        res.json({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

//server endpoint for updating user

//put the auth middleware which will get the user

router.put("/update", auth, async (req, res, next) => {
    const user = req.user; //this is where the user is, looking at auth.js
    const updatedUser = {}; //this is what we're going to send into the query
    //now we hvae the user obj,
    //do an update query on the db
    //stuff is in req.body wwe want to add those props into the updated
    //but the props that are in the user and not in the updated user we want to add to the updated user
    updatedUser.username = req.body.username || user.username;
    updatedUser.email = req.body.email || user.email;
    updatedUser.address = req.body.address || user.address;

    //now we need to change whats in the updatedUser array, this does the update
    const data = await pool.query(
        `UPDATE users SET username=$1, email=$2, address=$3 WHERE id=$4 RETURNING username  `,
        [updatedUser.username, updatedUser.email, updatedUser.address, user.id]
    );
    res.json(data.rows[0]);
});

module.exports = router;
