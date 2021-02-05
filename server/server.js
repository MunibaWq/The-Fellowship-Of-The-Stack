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
const { emailsSent, sendReminder } = require("./emailsSent");
const pool = require("./db");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);
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
const sendGrid = (type, email) => {
    console.log(attendee.name, attendee.email, attendee.start_time, attendee.location);
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
        sendReminder();
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
