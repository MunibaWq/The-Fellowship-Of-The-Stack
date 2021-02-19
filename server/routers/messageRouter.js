const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");


    router.get("/get", async (req, res => {
        try {
            const result = await pool.query(`SELECT 
            INNER JOIN
            messages m
            ON u.id= m.id
          
            INNER JOIN users u
            ON u.id = m.from
            INNER JOIN users u
            ON u.id = m.to
            `);
            const results = result.rows;
    
            res.json(results);
        } catch (e) {
            console.log(e, "/get");
            res.send("error");
        }
    }));



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
