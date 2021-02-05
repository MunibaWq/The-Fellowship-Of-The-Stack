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
const reminder3DaysBeforeEvent = (
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
        template_id: "d-dcd597a74dda4a7eab4f413da4974931",
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
                        email: attendee.email,
                        name: attendee.name,
                    },
                ],
                dynamic_template_data: {
                    attendee: attendee.name,
                    email: attendee.email,
                    eventName: attendee.event_name,
                    hostName: attendee.host_name,
                    collabs: collabs.join(", "),
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime,
                    eventLocation: attendee.location,
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

module.exports = {
    userGoingToEvent,
    reminderForEvent,
    reminderDayOfEvent,
};
