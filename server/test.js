require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);
let data = {
    attendeeEmail: "saunic8@gmail.com",
    hostName: "Stark Industries",
    attendee: "Nic",
    eventName: "Meet the Artist: Wonderland",
    eventStartDate: "February 14, 2021",
    eventStartTime: "06:00 PM",
    eventLocation: "zoom.link",
};

const reminderForEvent = (attendee, collabs) => {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let eventDate = new Date(attendee.start_time);
    let startDate = eventDate.toLocaleDateString("en-US", options);
    let startTime = eventDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    let eventEndDate = new Date(attendee.end_time);
    let endDate = eventEndDate.toLocaleDateString("en-US", options);
    let endTime = eventEndDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    let data = {
        personalizations: [
            {
                to: [
                    {
                        email: 'caseybarker86@gmail.com',
                        name:'Danielle',
                    },
                ],
                dynamic_template_data: {
                    attendee: 'danielle',
                    email: 'caseybarker86@gmail.com',
                    eventName: 'event',
                    hostName: 'host',
                    collabs: `collabs.rows
                        .map((collab) => collab.username)
                        .join(", ")`,
                    startDate: 'startDate',
                    startTime: 'startTime',
                    endDate: 'endDate',
                    endTime: 'endTime',
                    eventLocation: 'attendee.location',
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
        template_id: "d-dcd597a74dda4a7eab4f413da4974931",
    };
    sgMail
        .send(data)
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.error(error);
        });
};
reminderForEvent('whocares','notme')