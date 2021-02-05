const express = require("express");
const router = new express.Router();
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const userGoingToEvent = require("../email/userGoingToEvent");

router.post("/send/attend", async (req, res) => {
    try {
        const {
            attendeeEmail,
            hostName,
            attendee,
            eventName,
            eventStartDate,
            eventStartTime,
            eventLocation,
        } = req.body;

        // const fromEmail = "versayyc@gmail.com";
        // const fromName = "Versa";
        // const template_id = "d-e14d0f41a6b6417aa8204a24e0d38cb0";

        userGoingToEvent(
            attendeeEmail,
            hostName,
            attendee,
            eventName,
            eventStartDate,
            eventStartTime,
            eventLocation
            // fromEmail,
            // fromName,
            // template_id
        );
        res.json({});
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
