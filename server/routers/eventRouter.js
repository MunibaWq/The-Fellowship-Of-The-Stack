const express = require("express");
const router = new express.Router();
const pool = require("../db");
//search events by keyword found in title and description or artist name
router.get("/search/:searchQuery", async (req, res) => {
    let query = req.params.searchQuery.toUpperCase().split(" ");
    let queryString = "";
    query.forEach((term, index) => {
        if (index == 0) {
            queryString = `(UPPER (e.name) LIKE '%${term}%' OR UPPER (e.description) LIKE '%${term}%' OR UPPER (a.username) LIKE '%${term}%')`;
        } else {
            queryString += ` AND (UPPER (e.name) LIKE '%${term}%' OR UPPER (e.description) LIKE '%${term}%'OR UPPER (a.username) LIKE '%${term}%')`;
        }
    });

    const result = await pool.query(
        `SELECT e.*, u.username FROM events e INNER JOIN users u ON e.host = u.id WHERE ${queryString} AND e.host = a.id`
    );
    const events = result.rows;

    res.json(events);
});

router.get("/get/:id", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await pool.query(
            `SELECT 
            c.count AS num_attendees,
            u.username AS host_name,
            e.*  
            FROM 
            events e 
            INNER JOIN 
                (SELECT a.event,COUNT(*) 
                FROM events_attendees a 
                INNER JOIN events e 
                ON a.event = e.id 
                GROUP BY a.event) c
            ON e.id = c.event
            INNER JOIN
            users u
            ON u.id = e.host
            WHERE e.id = ${req.params.id}`
        );

        const eventInfo = result.rows[0];

        client.release(true);
        res.json(eventInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});

//Get all products
//change this to use auth instead of req.params
router.get("/artistsEvents/:id", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
            c.count AS num_attendees,
            u.username AS host_name,
            e.*  
            FROM 
            events e 
            INNER JOIN 
                (SELECT a.event,COUNT(*) 
                FROM events_attendees a 
                INNER JOIN events e 
                ON a.event = e.id 
                GROUP BY a.event) c
            ON e.id = c.event
            INNER JOIN
            users u
            ON u.id = e.host
            WHERE e.host= ${req.params.id}`
        );
        const results = result.rows;

        res.json(results);
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});

router.get("/allEvents", async (_req, res) => {
    try {
        const result = await pool.query(`SELECT 
        c.count AS num_attendees,
        u.username AS host_name,
        e.*  
        FROM 
        events e 
        INNER JOIN 
            (SELECT a.event,COUNT(*) 
            FROM events_attendees a 
            INNER JOIN events e 
            ON a.event = e.id 
            GROUP BY a.event) c
        ON e.id = c.event
        INNER JOIN
        users u
        ON u.id = e.host`);
        const results = result.rows;

        res.json(productsToSend);
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});

// Create a product ON FRONT END - NEED TO SEND sizes AS OBJECT-> sizes:PRICE

router.post("/create", async (req, res) => {
    try {
        let {
            name,
            host,
            description,
            status,
            capacity,
            startTime,
            endTime,
            location,
            type,
        } = req.body.data;

        let eventInfo = await pool.query(
            `INSERT INTO events 
            (name, host, description, status, capacity, startTime, endTime, location, type) 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            [
                name,
                host,
                description,
                status,
                capacity,
                startTime,
                endTime,
                location,
                type,
            ]
        );

        res.json(eventInfo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.send("error");
    }
});

// Update a product

router.put("/edit/:id", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.send({
            message: "Theres nobody!",
        });
    }
    try {
        const { id } = req.params; // For use in where
        const {
            name,
            host,
            description,
            status,
            capacity,
            startTime,
            endTime,
            location,
            type,
        } = req.body.data;

        let response = await pool.query(
            "UPDATE events SET name=$1, host=$2, description=$3, status=$4, capacity=$5, startTime=$5, endTime=$7, location=$8, type=$9 WHERE id = $10",
            [
                name,
                host,
                description,
                status,
                capacity,
                startTime,
                endTime,
                location,
                type,
                id
            ]
        );
        res.json(response.rows[0].id);
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

// Delete a product PLEASE ADD AUTH

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    if (Object.keys(req.params).length === 0) {
        console.log("no id");
    }
    try {
        await pool.query("DELETE FROM event_images WHERE event_id = $1", [id]);
        await pool.query("DELETE FROM events_attendees WHERE event_id = $1", [id]);
        await pool.query("DELETE FROM events WHERE id = $1", [id]);
        res.json({ msg: "Event Deleted!" });
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});
//change to auth and use auth for id instead of req.params
router.post('/attend/:event/:id', (req, res) => {
    const { event, id } = req.params
    const { status, reminder } = req.body
    const queryPart = []
    if (status) queryPart.push(`SET status = ${status}`)
    if (reminder) queryPart.push(`SET reminder = ${reminder}`)
    const query = queryPart.join(', ')
    pool.query(`UPDATE events_attendees ${query} WHERE attendee = ${id} AND event = ${event}`)
    res.send('updated')
})
module.exports = router;
