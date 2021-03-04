let express = require("express");
let cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const PORT = process.env.PORT || 5000;
const apiRouter = require('./routers/apiRouter')
var cookieParser = require("cookie-parser");
const {
    emailsSent,
    sendReminder,
} = require("./helperFunctions/sendGridFunctions");
const pool = require("./db");
let app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(cors({ credentials: true }));
app.use(cors())
app.use(express.static(path.join(__dirname, "../frontend/versa/build")));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.use(express.static("../frontend/versa/build"));

//ROUTES

app.use("*", async (req, res, next) => {
    try {
        let sent = await emailsSent(
            new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            })
        );

        if (!sent) {
            sendReminder();
        }
    } catch (e) {
        console.log(e)
    }
    next();
});

app.use('/api', apiRouter)

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "../frontend/versa/build", "index.html")
    );
});
