require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, from, eventID, text) => {};

require("dotenv").config();
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const options = {
    method: "POST",
    hostname: "api.sendgrid.com",
    port: null,
    path: "/v3/mail/send",
    headers: {
        "authorization": "Bearer <<YOUR_API_KEY_HERE>>",
        "content-type": "application/json",
    },
};

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
            `
            INSERT INTO events(
                name, host, description, status, capacity, 
                startTime, endTime, location, type
                ) 
            VALUES 
                ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            `,
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
