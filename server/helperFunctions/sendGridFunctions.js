require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const pool = require("../db");

const emailsSent = async (day) => {
    const response = await pool.query(
        "SELECT sent FROM sendgrid where day = $1",
        [day]
    );
    if (response.rows[0]) {
        return response.rows[0].sent
    } else {
        pool.query('INSERT INTO sendgrid (day, sent) VALUES ($1,$2)', [day, true]).then(() => {
            return false
        })
    }
};
const sendReminder = async () => {
    const events = await pool.query("SELECT * from events");
    for (event of events.rows) {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (new Date(event.start_time).getDate() === tomorrow.getDate()) {
            attendees = await pool.query(
                "SELECT h.username as host_name, e.title as event_name, e.description, e.start_time, e.end_time, e.location, a.event_id, u.email, u.name from events_attendees a INNER JOIN users u ON a.attendee = u.id INNER JOIN events e ON e.id=a.event_id INNER JOIN users h ON h.id=e.host WHERE a.event_id = " +
                    event.id
            );
            collabs = await pool.query(
                `SELECT u.username FROM users u INNER JOIN events_attendees a ON u.id = a.attendee WHERE a.type = 'collab' AND a.event_id =` +
                    event.id
            );
            for (attendee of attendees.rows) {
                reminderForEvent(
                    attendee,
                    collabs.rows.map((collab) => collab.username)
                );
            }
        }
    }
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    pool.query("UPDATE sendgrid SET sent = true;");
    const response = await pool.query(
        "INSERT INTO sendgrid(sent, day) VALUES($1, $2)",
        [
            false,
            tomorrow.toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            }),
        ]
    );
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

const goingToEvent = (attendee, collabs) => {
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
                    collabs: collabs
                        .map((username) => {
                            username.username;
                        })
                        .join(", "),
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
        template_id: "d-558c253136564e32a35bd912020b9d06",
    };
    sgMail
        .send(data)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error.response.body.errors);
        });
};

const changesToEvent = (attendee, collabs) => {
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
                    collabs: collabs.rows
                        .map((collab) => collab.username)
                        .join(", "),
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
        template_id: "d-effdb7a062c742fdbf72d483e9f66566",
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

const notGoingToEvent = (attendee) => {
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
        template_id: "d-4929f8aae5af4fcea9de20101f88e675",
    };
    sgMail
        .send(data)
        .then((res) => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
};

const orderConfirmation = (items, name, email, orderID, deliveryType) => {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let orderDate = new Date();
    let startDate = orderDate.toLocaleDateString("en-US", options);
    let startTime = orderDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    let subtotal = items.reduce((total, curr) => {
        total += curr.itemQuantity * curr.itemPrice;
        return total;
    }, 0);
    let delivery;
    if (subtotal < 100 && deliveryType === "delivery") {
        delivery = 10;
    } else {
        delivery = 0;
    }

    let data = {
        personalizations: [
            {
                to: [
                    {
                        email: email,
                        name: name,
                    },
                ],
                dynamic_template_data: {
                    username: name,
                    email,
                    orderDate: startDate,
                    orderTime: startTime,
                    items,
                    total: ((subtotal + (delivery ? 10 : 0)) * 1.05).toFixed(2),
                    subtotal: subtotal.toFixed(2),
                    gst: ((subtotal + (delivery ? 10 : 0)) * 0.05).toFixed(2),
                    delivery: delivery.toFixed(2),
                    orderID,
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
        template_id: "d-7b8a8574a7404463a504220823241d0d",
    };
    sgMail
        .send(data)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error.response.body.errors);
        });
};

const orderReadyForPickup = (buyer) => {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let orderDate = new Date(buyer.date);
    let orderPlacedDate = orderDate.toLocaleDateString("en-US", options);

    let data = {
        personalizations: [
            {
                to: [
                    {
                        email: buyer.email,
                        name: buyer.name,
                    },
                ],
                dynamic_template_data: {
                    username: buyer.name,
                    email: buyer.email,
                    artistName: buyer.username,
                    orderID: buyer.id,
                    orderDate: orderPlacedDate,
                    artistAddress: buyer.address,
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
        template_id: "d-f19e16700d444a6b95466023328aef26",
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
const newAccount = (name, email) => {
    let data = {
        personalizations: [
            {
                to: [
                    {
                        email: email,
                        name: name,
                    },
                ],
                dynamic_template_data: {
                    name: name,
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
        template_id: "d-c29c378b4bba461e8c72171335fae7a8",
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

const addToNewsletter = (email) => {
    let data = {
        personalizations: [
            {
                to: [
                    {
                        email: email,
                    },
                ],
                dynamic_template_data: {
                    email: email,
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
        template_id: "d-8b31cb31447b4294a2139bd787f15a2c",
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
    sendReminder,
    emailsSent,
    goingToEvent,
    notGoingToEvent,
    changesToEvent,
    orderConfirmation,
    orderReadyForPickup,
    newAccount,
    addToNewsletter,
};
