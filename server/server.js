let express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
  })



let app = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/db", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM users");
        const results = result.rows;
        
      
      res.send(results.map(item=>item.name));
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });