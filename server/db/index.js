require("dotenv").config();

const pg = require("pg");
pg.defaults.ssl = true;
connectionString = `postgres://bzwlnqvswwqfqg:${process.env.DB_PASSWORD}@ec2-34-192-72-159.compute-1.amazonaws.com:5432/d40vu6ijteqrv2`;
console.log(connectionString);
console.log(process.env.BD_PASSWORD);
const pool = new pg.Pool({
    max: 50,
    ssl: { rejectUnauthorized: false },
    connectionString: connectionString,
});
module.exports = pool;
