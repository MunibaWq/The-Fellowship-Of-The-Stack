let express = require("express");
let cors = require("cors");
const crypto = require("crypto");
const path = require("path");

const PORT = process.env.PORT || 5000;
const imageRouter = require('./routers/imageRouter')
const productRouter = require('./routers/productRouter')


let app = express();
app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

//ROUTES

// app.use('/images', imageRouter)
app.use('/products', productRouter)
