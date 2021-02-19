const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");


    router.get("/get", async (req, res) => {
        try {
            const result = await pool.query(` SELECT m.*, ut.username, uf.username FROM messages m
            INNER JOIN users ut ON ut.id = m.to
            INNER JOIN users uf ON uf.id = m.from
            WHERE 'from'=${req.user.id} OR 'to'=${req.user.id}`);
            const results = result.rows;
    
            res.json(results);
        } catch (e) {
            console.log(e, "/get");
            res.send("error");
        }
    });



router.post('/send', auth, (req, res) => {
    const { to, message, type, time, topic } = req.body
    const from = req.user.id
    try {
        const sendMessage = await pool.query(`
    INSERT INTO messages 
    (to, from, message, type, time, topic)
    VALUES ($1,$2,$3,$4,$5,$6) returning id`)
        res.status(200).send('success')
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router;
