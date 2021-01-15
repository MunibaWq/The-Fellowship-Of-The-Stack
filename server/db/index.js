const { Pool } = require("pg");
const pool = new Pool({
    user: `bzwlnqvswwqfqg`,
    host: `ec2-34-192-72-159.compute-1.amazonaws.com`,
    database: `d40vu6ijteqrv2`,
    password: process.env.DBPASSWORD,
    port: 5432,
    max: 50,
});
module.exports = pool;
