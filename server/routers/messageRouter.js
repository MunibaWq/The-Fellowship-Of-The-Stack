const router = require("express").Router();
const pool = require("../db");
router.post("/read", async (req, res) => {
    const { topic, to } = req.body;
    pool.query(
        `UPDATE messages SET read=true 
        WHERE topic='${topic}'
        AND ((from_user=${req.user.id} AND to_user=${+to}) 
        OR (to_user=${req.user.id} AND from_user=${+to}))`
    );
    res.status(200).send();
});
router.get("/get", async (req, res) => {
    try {
        const result = await pool.query(` SELECT m.*, ut.username as to_username, uf.username as from_username FROM messages m
            INNER JOIN users ut ON ut.id = m.to_user
            INNER JOIN users uf ON uf.id = m.from_user
            WHERE from_user=${req.user.id} OR to_user=${req.user.id}`);
        const results = result.rows;

        res.json(results);
    } catch (e) {
        console.log(e, "/get");
        res.status(400).send("error");
    }
});

router.post("/send", async (req, res) => {
    const { to, message, type, time, topic } = req.body;
    const from = req.user.id;
    try {
        const sendMessage = await pool.query(
            `
    INSERT INTO messages 
    (to_user, from_user, message, type, time, topic)
    VALUES ($1,$2,$3,$4,$5,$6) returning id`,
            [to, req.user.id, message, type, time, topic]
        );
        res.status(200).send("success");
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

//search messages by keyword found in title or user
router.get("/searchMessages/:searchQuery", async (req, res) => {
    let query = req.params.searchQuery.toUpperCase().split("&");
    let queryString = "";
    query.forEach((term, index) => {
        if (index == 0) {
            queryString = `
            UPPER (m.topic) LIKE '%${term}%' 
            OR UPPER (ut.username) LIKE '%${term}%'
            OR UPPER (uf.username) LIKE '%${term}%')`;
        } else {
            queryString += ` AND UPPER (m.topic) LIKE '%${term}%'
            OR UPPER (ut.username) LIKE '%${term}%')
            OR UPPER (uf.username) LIKE '%${term}%')`;
        }
    });

    const result = await pool.query(
        `SELECT m.*, ut.username, uf.username FROM messages m
        INNER JOIN users ut ON ut.id = m.to
        INNER JOIN users uf ON uf.id = m.from
       
        WHERE ${queryString} AND ut.id = m.to OR uf.id = m.from`
    );
    const messages = result.rows;

    res.json(messages);
});

module.exports = router;
