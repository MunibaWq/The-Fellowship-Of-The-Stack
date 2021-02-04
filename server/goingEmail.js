require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

let data = {
    personalizations: [
        {
            to: [
                {
                    email: "caseybarker86@gmail.com",
                    name: "Danielle",
                },
            ],
            dynamic_template_data: {
                attendee: "Danielle",
                email: "caseybarker86@gmail.com",
                eventName: "Artist Spotlight: Wonderland",
                eventStartDate: "February 2, 2021",
                eventStartTime: "09:00 AM",
                eventLocation: "zoom.link",
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
