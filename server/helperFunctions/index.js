const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const generateAuthToken = (user) => {
    const token = jwt.sign({ id: user.id.toString() }, process.env.JWT);
    return token;
};

const findByCredentials = async (email, password) => {
    const user = await pool.query(`SELECT * FROM users WHERE email = ($1)`, [
        email,
    ]);
    if (user.rows.length === 0) {
        throw new Error("No account with this email");
    }
    const result = await bcrypt.compare(password, user.rows[0].password);
    if (!result) {
        throw new Error("Incorrect password.");
    }
    delete user.rows[0].password;
    return user.rows[0];
};

module.exports = {
    generateAuthToken,
    findByCredentials,
};
