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


router.post();

module.exports = router;
