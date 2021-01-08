let express = require("express");
let cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432,
});

let app = express();
app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/product/:id", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM products WHERE id = ${req.params.id}`
        );
        console.log(result.rows[0]);
        const productInfo = result.rows[0];

        productInfo["variations"] = productInfo["variations"].split(" ");

        productInfo["size"] = productInfo["size"].split(" ").map((dim) => +dim);
        const artistReq = await client.query(
            "SELECT username FROM artists WHERE id = " +
                productInfo["artist_id"]
        );
        const artist = artistReq.rows[0].username;
        productInfo["artist"] = artist;
        console.log("productInfo", productInfo);
        res.json(productInfo);
    } catch (e) {
        console.log("error", e);
        res.send(e);
    }
});
app.get("/allProducts", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM products");
        const results = result.rows;
        const productsToSend = [];
        for (product of results) {
            product["variations"] = product["variations"].split(" ");
            product["size"] = product["size"].split(" ").map((dim) => +dim);
            const artistReq = await client.query(
                "SELECT username FROM artists WHERE id = " +
                    product["artist_id"]
            );
            const artist = artistReq.rows[0].username;
            product["artist"] = artist;
            productsToSend.push(product);
        }
        client.end();
        res.json(productsToSend);
    } catch (e) {
        console.log(e);
        res.send("error");
    }
});
