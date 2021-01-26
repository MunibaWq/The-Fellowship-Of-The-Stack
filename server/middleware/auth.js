const jwt = require("jsonwebtoken");
const pool = require("../db");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT);
        const user = pool.query(`SELECT * FROM users WHERE id = ($1)`, [
            decoded.id,
        ]);
        //const user = await User.findOne({ _id: decoded._id });
        if (!user.rows) {
            throw new Error("no user");
        }
        req.user = user.rows[0];
        delete req.user.password;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).send({ error: "Please authenticate" });
    }
};

module.exports = auth;
