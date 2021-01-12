const { Pool } = require("pg");
const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432,
    max: 50,
});
module.exports = pool