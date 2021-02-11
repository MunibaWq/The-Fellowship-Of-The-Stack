const express = require("express");
const router = new express.Router();
const pool = require("../db");
const {
    goingToEvent,
    notGoingToEvent,
} = require("../helperFunctions/sendGridFunctions");
const auth = require("../middleware/auth");

//search events by keyword found in title and description or artist name
router.get("/search/:searchQuery", async (req, res) => {
    let query = req.params.searchQuery.toUpperCase().split(" ");
    let queryString = "";
    query.forEach((term, index) => {
        if (index == 0) {
            queryString = `(UPPER (e.name) LIKE '%${term}%' 
            OR UPPER (e.description) LIKE '%${term}%' 
            OR UPPER (u.username) LIKE '%${term}%')`;
        } else {
            queryString += ` AND (UPPER (e.name) LIKE '%${term}%' 
            OR UPPER (e.description) LIKE '%${term}%'
            OR UPPER (u.username) LIKE '%${term}%')`;
        }
    });

    const result = await pool.query(
        `SELECT e.*, u.username FROM events e 
        INNER JOIN users u ON e.host = u.id
        WHERE ${queryString} AND e.host = u.id`
    );
    const events = result.rows;

    res.json(events);
});

router.get("/get/:id", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await pool.query(
            `SELECT u.username, i.sum AS num_interested, a.sum AS num_attending, e.* from (SELECT event_id, SUM ( CASE WHEN status = 'interested'
            THEN 1 ELSE 0 end) FROM events_attendees
            GROUP BY event_id) i
            INNER JOIN
            events e
            ON i.event_id = e.id
            INNER JOIN
            (SELECT event_id, SUM ( CASE WHEN status = 'attending'
            THEN 1 ELSE 0 end) FROM events_attendees
            GROUP BY event_id) a
            ON a.event_id = e.id
            INNER JOIN 
            users u
            ON u.id=e.host
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
            CAST(c.count AS INT) AS num_attendees,
            u.username AS host_name,
            e.*  
            FROM 
            events e 
            INNER JOIN 
                (SELECT a.event_id,COUNT(*) 
                FROM events_attendees a 
                INNER JOIN events e 
                ON a.event_id = e.id 
                GROUP BY a.event_id) c
            ON e.id = c.event_id
            INNER JOIN
            users u
            ON u.id = e.host
            WHERE e.host= ${req.params.id}
            `
        );
        const results = result.rows;

        res.json(results);
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});

router.get("/allEvents", async (req, res) => {
    try {
        const result = await pool.query(`SELECT u.username as host_name, i.sum AS num_interested, a.sum AS num_attending, e.* from (SELECT event_id, SUM ( CASE WHEN status = 'interested'
        THEN 1 ELSE 0 end) FROM events_attendees
        GROUP BY event_id) i
        INNER JOIN
        events e
        ON i.event_id = e.id
        INNER JOIN
        (SELECT event_id, SUM ( CASE WHEN status = 'attending'
        THEN 1 ELSE 0 end) FROM events_attendees
        GROUP BY event_id) a
        ON a.event_id = e.id
        INNER JOIN users u
        ON u.id = e.host
        `);
        const results = result.rows;

        res.json(results);
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});

//create event

router.post("/create", auth, async (req, res) => {
    if (req.user.type !== 1) {
        res.status(500).send("Not Authorized");
    }
    console.log(req.user);
    try {
        let {
            name,
            description,
            status,
            capacity,
            startTime,
            endTime,
            location,
            type,
        } = req.body.data;
        console.log(
            name,
            req.user.id,
            description,
            status,
            capacity,
            startTime,
            endTime,
            location,
            type
        );
        let eventInfo = await pool.query(
            `
            INSERT INTO events(
                name, host, description, status, capacity, 
                start_time, end_time, location, type
                ) 
            VALUES 
                ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING ID
            `,
            [
                name,
                req.user.id,
                description,
                status,
                capacity,
                startTime,
                endTime,
                location,
                type,
            ]
        );

        res.json(eventInfo.rows[0].id);
    } catch (err) {
        res.send(err);
    }
});

// Update an event

router.put("/edit/:id", auth, async (req, res) => {
    const { id } = req.params;
    if (req.user.type !== 1) {
        res.status(500).send("Not Authorized");
    }
    let checkOwner = await pool.query(
        "SELECT e.host from events WHERE id = " + id
    );
    if (checkOwner.rows[0].host !== req.user.id) {
        res.status(500).send("Not Authorized");
    }
    if (Object.keys(req.body).length === 0) {
        res.send({
            message: "Theres nobody!",
        });
    }
    try {
        const { id } = req.params; // For use in where
        let {
            name,
            description,
            status,
            capacity,
            startTime,
            endTime,
            location,
            type,
        } = req.body.data;

        let current = await pool.query(`SELECT * FROM events WHERE id = $1 `, [
            id,
        ]);
        const currentEvent = current.rows[0];

        name = name || currentEvent.name;
        host = host || currentEvent.host;
        description = description || currentEvent.description;
        status = status || currentEvent.status;
        capacity = capacity || currentEvent.capacity;
        startTime = startTime || currentEvent.start_time;
        endTime = endTime || currentEvent.end_time;
        location = location || currentEvent.location;
        type = type || currentEvent.type;

        let response = await pool.query(
            `UPDATE events SET 
            name = $1, host = $2, description = $3, 
            status = $4, capacity = $5, start_time = $6, 
            end_time = $7, location = $8, type = $9 
            WHERE id = $10 RETURNING id`,
            [
                name,
                req.user.id,
                description,
                status,
                capacity,
                startTime,
                endTime,
                location,
                type,
                id,
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

// Delete an event PLEASE ADD AUTH

router.delete("/delete/:id", auth, async (req, res) => {
    const id = req.params.id;
    if (req.user.type !== 1) {
        res.status(500).send("Not Authorized");
    }
    let checkOwner = await pool.query(
        "SELECT e.host from events WHERE id = " + id
    );
    if (checkOwner.rows[0].host !== req.user.id) {
        res.status(500).send("Not Authorized");
    }
    if (Object.keys(req.params).length === 0) {
        console.log("no id");
    }
    try {
        await pool.query("DELETE FROM event_images WHERE event_id = $1", [id]);
        await pool.query("DELETE FROM events_attendees WHERE event_id = $1", [
            id,
        ]);
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
router.post("/attend/:event", auth, (req, res) => {
    const { event } = req.params;
    const { status, reminder } = req.body;
    const queryPart = [];
    if (status) queryPart.push(`SET status = ${status}`);
    if (reminder) queryPart.push(`SET reminder = ${reminder}`);
    const query = queryPart.join(", ");
    pool.query(
        `UPDATE events_attendees ${query} 
        WHERE attendee = ${req.user.id} AND event_id = ${event}`
    );
    res.send("updated");
});

router.post("/join", auth, async (req, res) => {
    const { status, reminder, eventID } = req.body;
    const response = await pool.query(
        `INSERT INTO events_attendees (event_id, attendee, status, reminder) 
        VALUES ($1,$2,$3,$4)`,
        [eventID, req.user.id, status, reminder]
    );

    collabs = await pool.query(
        `SELECT u.username FROM users u INNER JOIN events_attendees a ON u.id = a.attendee WHERE a.type = 'collab' AND a.event_id = ${eventID}`
    );
    const attResponse = await pool.query(
        `SELECT h.username as host_name, e.name as event_name, e.description, e.start_time, e.end_time, e.location, a.event_id, u.email, u.name from events_attendees a INNER JOIN users u ON a.attendee = u.id INNER JOIN events e ON e.id=a.event_id INNER JOIN users h ON h.id=e.host WHERE a.event_id = ${eventID} and u.id = ` +
            req.user.id
    );
    attendee = attResponse.rows[0];

    goingToEvent(attendee, collabs.rows);

    res.send("joined");
});

//user not going

router.delete("/not-attending/:event", auth, async (req, res) => {
    const event_id = req.params.event;

    if (Object.keys(req.params).length === 0) {
        console.log("no id");
    }
    try {
        await pool.query(
            "DELETE FROM events_attendees WHERE event_id = $1 AND attendee =$2",
            [event_id, req.user.id]
        );
        attendees = await pool.query(
            `SELECT h.username as host_name, e.name as event_name, e.description, e.start_time, e.end_time, e.location, a.event_id, u.email, u.name from events_attendees a INNER JOIN users u ON a.attendee = u.id INNER JOIN events e ON e.id=a.event_id INNER JOIN users h ON h.id=e.host WHERE a.event_id = ${req.params.eventid} AND u.id = ${req.user.id}`
        );
        res.json({ msg: "User Deleted from event!" });
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});

// router.get("/attend/email/:eventid/:id", async (req, res) => {
//     try {
//         attendees = await pool.query(
//             `SELECT h.username as host_name, e.name as event_name, e.description, e.start_time, e.end_time, e.location, a.event_id, u.email, u.name from events_attendees a INNER JOIN users u ON a.attendee = u.id INNER JOIN events e ON e.id=a.event_id INNER JOIN users h ON h.id=e.host WHERE a.event_id = ${req.params.eventid}`
//         );
//         collabs = await pool.query(
//             `SELECT u.username FROM users u INNER JOIN events_attendees a ON u.id = a.attendee WHERE a.type = 'collab' AND a.event_id = ${req.params.eventid}`
//         );
//         for (attendee of attendees.rows) {
//             console.log(attendee);
//             goingToEvent(attendee, collabs.rows);
//         }

//         res.status(200).send("Successssssssssss");
//     } catch (e) {
//         console.log(e);
//         res.send("error");
//     }
// });

router.get("/not-attending/email/:eventid/:id", async (req, res) => {
    try {
        attendees = await pool.query(
            `SELECT h.username as host_name, e.name as event_name, e.description, e.start_time, e.end_time, e.location, a.event_id, u.email, u.name from events_attendees a INNER JOIN users u ON a.attendee = u.id INNER JOIN events e ON e.id=a.event_id INNER JOIN users h ON h.id=e.host WHERE a.event_id = ${req.params.eventid}`
        );

        for (attendee of attendees.rows) {
            console.log(attendee);
            notGoingToEvent(attendee);
        }

        res.status(200).send("Successssssssssss");
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});

router.get("/amIGoing/:eventid", auth, async (req, res) => {
    try {
        const response = await pool.query(
            `SELECT * FROM events_attendees WHERE event_id = $1 AND attendee=$2`,
            [req.params.eventid, req.user.id]
        );
        const going = response.rows.length === 1;
        res.send(going);
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});

module.exports = router;
