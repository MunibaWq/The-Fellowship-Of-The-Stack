let express = require("express");
let cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const userRouter = require("./routers/userRouter");
const PORT = process.env.PORT || 5000;
const stockRouter = require("./routers/stockRouter");
const imageRouter = require("./routers/imageRouter");
const productRouter = require("./routers/productRouter");
const eventRouter = require("./routers/eventRouter");
var cookieParser = require("cookie-parser");
const pool = require("./db");
let app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true }));

app.use(express.static(path.join(__dirname, "../frontend/versa/build")));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.use(express.static("../frontend/versa/build"));

//ROUTES

const emailsSent = async (day) => {
    const response = await pool.query(
        "SELECT sent FROM sendgrid where day = $1",
        [day]
    );
    return response.rows[0];
};
const sendEmails = async () => {
    const events = await pool.query("SELECT * from events");
    for (event of events.rows) {
        console.log(event);
        if (
            new Date(event.start_time).getTime() - new Date().getTime() <
            86400000
        ) {
            console.log("here");
            attendees = await pool.query(
                "SELECT u.email from events_attendees a INNER JOIN users u ON a.attendee = u.id WHERE a.event_id = " +
                    event.id
            );
            for (attendee of attendees.rows) {
                console.log(attendee);
                sendGrid("reminder", attendee.email);
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

app.use("*", (req, res, next) => {
    if (
        !emailsSent(
            new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            })
        )
    ) {
        sendEmails();
    }
    next();
});
app.use("/stock", stockRouter);
app.use("/images", imageRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/events", eventRouter);
app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "../frontend/versa/build", "index.html")
    );
});
