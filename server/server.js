let express = require("express");
let cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const userRouter = require("./routers/userRouter");
const PORT = process.env.PORT || 5000;
const stockRouter = require("./routers/stockRouter");
const imageRouter = require("./routers/imageRouter");
const productRouter = require("./routers/productRouter");
const dashboardRouter = require("./routers/dashboardRouter");
const eventRouter = require("./routers/eventRouter");
const orderRouter = require("./routers/orderRouter");
var cookieParser = require("cookie-parser");
const {
    emailsSent,
    sendReminder,
} = require("./helperFunctions/sendGridFunctions");
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

app.use("*", async (req, res, next) => {
    console.log("Checked events for emails to be sent.");
    let sent = await emailsSent(
        new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        })
    );

    if (!sent) {
        console.log("No Emails sent.");
        sendReminder();
    }
    next();
});

app.use("/stock", stockRouter);
app.use("/images", imageRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/dashboard", dashboardRouter);
app.use("/orders", orderRouter);
app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "../frontend/versa/build", "index.html")
    );
});
