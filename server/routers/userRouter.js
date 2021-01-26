const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = new express.Router();
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
    const user = await findByCredentials(req.body.username, req.body.password);
    const token = generateAuthToken(user);
    pool.query(`INSERT INTO tokens (user_id, token) VALUES ($1, $2)`, [
        user.id,
        token,
    ]);
    res.json({ user, token });
});

module.exports = router;
