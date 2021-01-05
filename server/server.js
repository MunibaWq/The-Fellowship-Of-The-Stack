let express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");

//postgres

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });


let app = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));