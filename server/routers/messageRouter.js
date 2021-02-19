
const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

router.get()

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