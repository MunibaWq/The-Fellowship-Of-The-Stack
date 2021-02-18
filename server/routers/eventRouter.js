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
        console.log(e, "/artistsEvents/:id");
        res.send("error");
    }
});

router.get("/myArtistsEvents/", auth, async (req, res) => {
    try {
        const eventresult = await pool.query(
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
            WHERE e.host= ${req.user.id}
            `
        );
        let results = eventresult.rows;
        for (result of results) {
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            let resultsStartDate = new Date(result.start_time);

            let startDate = resultsStartDate.toLocaleDateString(
                "en-US",
                options
            );

            let resultsEndDate = new Date(result.end_time);
            let endDate = resultsEndDate.toLocaleDateString("en-US", options);
            result.start_time = startDate;
            result.end_time = endDate;
        }
        res.json(results);
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});
router.get("/attending/", auth, async (req, res) => {
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
            INNER JOIN (SELECT event_id, attendee FROM events_attendees WHERE attendee = ${req.user.id}) a
            ON a.event_id = e.id`
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
        console.log(e, "/allEvents");
        res.send("error");
    }
});

//create event

router.post("/create", auth, async (req, res) => {
    console.log(req.user.is_artist);
    if (!req.user.is_artist) {
        res.status(501).send("Not Authorized");
    } else {
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
            pool.query(
                `INSERT INTO events_attendees(attendee, event_id, status, reminder )
        VALUES ($1, $2, $3, $4 )`,
                [req.user.id, eventInfo.rows[0].id, "attending", true]
            );
            res.json(eventInfo.rows[0].id);
        } catch (err) {
            res.send(err);
        }
    }
});

// Update an event

router.put("/edit/:eventId", auth, async (req, res) => {
    const { eventId } = req.params;
    console.log(eventId);
    if (!req.user.is_artist) {
        res.status(500).send("Not Authorized");
    } else {
        let checkOwner = await pool.query(
            "SELECT host from events WHERE id = " + eventId
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
                type,
                eventId
            );
            console.log(eventId);

            let current = await pool.query(
                `SELECT * FROM events WHERE id = $1 `,
                [eventId]
            );
            const currentEvent = current.rows[0];

            name = name || currentEvent.name;
            // host = host || currentEvent.host;
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
                    eventId,
                ]
            );

            res.json(response.rows[0].id);
        } catch (err) {
            console.error(err.message, "/edit/:id");
            res.send({
                message: "error",
            });
        }
    }
});

// Delete an event PLEASE ADD AUTH

router.delete("/delete/:id", auth, async (req, res) => {
    const id = req.params.id;
    if (!req.user.is_artist) {
        res.status(500).send("Not Authorized");
    } else {
        let checkOwner = await pool.query(
            "SELECT host from events WHERE id = " + id
        );
        if (checkOwner.rows[0].host !== req.user.id) {
            res.status(500).send("Not Authorized");
        }
        if (Object.keys(req.params).length === 0) {
            console.log("no id");
        }
        try {
            await pool.query("DELETE FROM event_images WHERE event_id = $1", [
                id,
            ]);
            await pool.query(
                "DELETE FROM events_attendees WHERE event_id = $1",
                [id]
            );
            await pool.query("DELETE FROM events WHERE id = $1", [id]);
            res.json({ msg: "Event Deleted!" });
        } catch (err) {
            console.error(err.message, "/delete/:id");
            res.send({
                message: "error",
            });
        }
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
        console.log('this is what Im looking for',attendee, collabs.rows)
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
        // attendees = await pool.query(
        //     `SELECT h.username as host_name, e.name as event_name, e.description, e.start_time, e.end_time, e.location, a.event_id, u.email, u.name from events_attendees a INNER JOIN users u ON a.attendee = u.id INNER JOIN events e ON e.id=a.event_id INNER JOIN users h ON h.id=e.host WHERE a.event_id = ${+req
        //         .params.event} AND u.id = ${req.user.id}`
        // );
        res.json({ msg: "User Deleted from event!" });
    } catch (err) {
        console.error(err.message, "/not-attending/:event");
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
        console.log(e, "/not-attending/email/:eventid/:id");
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
        console.log("this is going " + going);
        res.send(going);
    } catch (e) {
        console.log(e, "/amIGoing/:eventid");
        res.send("error");
    }
});

router.get("/collabs/:eventid", async (req, res) => {
    try {
        const collabs = await pool.query(
            `SELECT u.username FROM users u INNER JOIN events_attendees a ON u.id = a.attendee WHERE a.type = 'collab' AND a.event_id = ${req.params.eventid}`
        );
        // const collaborators = [];
        // collabs.rows.map((collab) => collaborators.push(collab.username));

        res.json(collabs.rows);
        console.log(collabs.rows);
    } catch (e) {
        console.log(e, "collabs");
        res.send("error");
    }
});

module.exports = router;
