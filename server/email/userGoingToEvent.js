require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const userGoingToEvent = (
    attendeeEmail,
    hostName,
    attendee,
    eventName,
    eventStartDate,
    eventStartTime,
    eventLocation
) => {
    let data = {
        personalizations: [
            {
                to: [
                    {
                        email: { email },
                        name: { attendee },
                    },
                ],
                dynamic_template_data: {
                    attendee: { attendee },
                    email: { attendeeEmail },
                    eventName: { eventName },
                    hostName: { hostName },
                    eventStartDate: { eventStartDate },
                    eventStartTime: { eventStartTime },
                    eventLocation: { eventLocation },
                },
            },
        ],
        from: {
            email: "versayyc@gmail.com",
            name: "Versa",
        },
        reply_to: {
            email: "versayyc@gmail.com",
            name: "Versa",
        },
        template_id: "d-e14d0f41a6b6417aa8204a24e0d38cb0",
    };
    sgMail
        .send(data)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports = userGoingToEvent;
