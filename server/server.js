let express = require("express");
let cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const userRouter = require("./routers/userRouter");
const PORT = process.env.PORT || 5000;
const imageRouter = require("./routers/imageRouter");
const productRouter = require("./routers/productRouter");
var cookieParser = require('cookie-parser');
let app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:'http://localhost:3001',credentials: true }));

app.use(express.static(path.join(__dirname, "../frontend/versa/build")));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.use(express.static("../frontend/versa/build"));

//ROUTES

app.use("/images", imageRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "../frontend/versa/build", "index.html")
    );
});
