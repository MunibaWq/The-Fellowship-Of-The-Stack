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

app.use(express.static(path.join(__dirname, "../frontend/versa/build")));
console.log(path.join(__dirname, "../frontend/versa/build"))
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
// if (process.env.NODE_ENV === 'production') {
    console.log('test')
	app.use(express.static('../frontend/versa/build'));
// }

//ROUTES

app.use('/images', imageRouter)
app.use('/products', productRouter)
app.get('*', (req, res) => {
    console.log('* route')
    res.sendFile(path.resolve(__dirname, "../frontend/versa/build","index.html"))
})