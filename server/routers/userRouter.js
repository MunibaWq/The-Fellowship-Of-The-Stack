const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
    generateAuthToken,
    findByCredentials,
} = require("../helperFunctions/index");
const { newAccount } = require("../helperFunctions/sendGridFunctions");

router.post("/create", async (req, res, next) => {
    const user = req.body.data;
    const hashPassword = await bcrypt.hash(user.password, 8);
    const data = await pool.query(
        `INSERT INTO users (username, password, email, address, is_artist, is_driver, name) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
        [
            user.username,
            hashPassword,
            user.email,
            user.address,
            user.isArtist,
            user.isDriver,
            user.name,
        ]
    );

    newAccount(user.name, user.email);
    const token = generateAuthToken(data.rows[0]);
    pool.query(`INSERT INTO tokens (user_id, token) VALUES ($1, $2)`, [
        data.rows[0].id,
        token,
    ]);

    const createUser = data.rows[0];
    delete createUser.password;
    res.cookie("token", token).json(createUser);
});
router.post("/logout", auth, async (req, res) => {
    pool.query(`DELETE FROM tokens WHERE token =  '${req.cookies.token}'`);
    res.cookie("token", "", { maxAge: 0 });
    res.cookie("name", "", { maxAge: 0 });
    res.cookie("isArtist", "", { maxAge: 0 });
    res.cookie("isDriver", "", { maxAge: 0 })
        .status(200)
        .json({ message: "Signed out" });
});
router.post("/login", async (req, res, next) => {
    try {
        const user = await findByCredentials(req.body.email, req.body.password);
        const token = generateAuthToken(user);
        pool.query(`INSERT INTO tokens (user_id, token) VALUES ($1, $2)`, [
            user.id,
            token,
        ]);
        // var hour = 3600000
        // req.session.cookie.expires = new Date(Date.now() + hour)
        res.cookie("token", token, { maxAge: Infinity + 1 });
        res.cookie("isArtist", user.is_artist, { maxAge: Infinity + 1 });
        res.cookie("isDriver", user.is_driver, { maxAge: Infinity + 1 });
        res.cookie("name", user.name, { maxAge: Infinity + 1 });
        res.json(user);
    } catch (e) {
        res.status(400).send();
    }
});
router.get("/get", auth, (req, res) => {
    res.send(req.user);
});
//server endpoint for updating user

//put the auth middleware which will get the user

router.put("/update", auth, async (req, res, next) => {
    console.log(req.body);
    const user = req.user; //this is where the user is, looking at auth.js
    const updatedUser = {}; //this is what we're going to send into the query
    //now we have the user obj,
    //do an update query on the db
    //stuff is in req.body wwe want to add those props into the updated
    //but the props that are in the user and not in the updated user we want to add to the updated user
    updatedUser.username = req.body.data.username || user.username;
    updatedUser.name = req.body.data.name || user.name;
    updatedUser.email = req.body.data.email || user.email;
    updatedUser.address = req.body.data.address || user.address;
    updatedUser.storeAddress = req.body.data.storeAddress || user.storeAddress;
    updatedUser.isArtist =
        req.body.data.isArtist === false
            ? false
            : req.body.data.isArtist === true
            ? true
            : user.is_artist;
    updatedUser.isDriver =
        req.body.data.isDriver === false
            ? false
            : req.body.data.isDriver === true
            ? true
            : user.is_driver;
    console.log(updatedUser);
    //now we need to change whats in the updatedUser array, this does the update
    const data = await pool.query(
        `UPDATE users SET username=$1, email=$2, address=$3, store_address=$4, is_artist=$5, is_driver=$6, name=$7 WHERE id=$8 RETURNING username  `,
        [
            updatedUser.username,
            updatedUser.email,
            updatedUser.address,
            updatedUser.storeAddress,
            updatedUser.isArtist,
            updatedUser.isDriver,
            updatedUser.name,
            user.id,
        ]
    );
    res.cookie("isArtist", user.is_artist, { maxAge: Infinity + 1 });
    res.cookie("isDriver", user.is_driver, { maxAge: Infinity + 1 });
    res.cookie("name", user.name, { maxAge: Infinity + 1 });
    res.json(data.rows[0]);
});

module.exports = router;
