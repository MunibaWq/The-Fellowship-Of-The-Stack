const { Pool } = require("pg");
const products = require("./products");
const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432,
});
const loadTables = async () => {
    const client = await pool.connect();
    let result = await client.query(`CREATE TABLE "products" (
      "id" SERIAL PRIMARY KEY,
      "title" varchar,
      "artist_id" int,
      "price" real,
      "description" varchar,
      "image" varchar,
      "num_sales" int,
      "num_stars" real,
      "num_reviews" int,
      "variations" varchar,
      "size" varchar,
      "materials" varchar
    )`);
    result = await client.query(
        'CREATE TABLE "artists" ( "id" SERIAL PRIMARY KEY, "username" varchar)'
    );
    client.query(
        'ALTER TABLE "products" ADD FOREIGN KEY ("artist_id") REFERENCES "artists" ("id")'
    );

    client.query("INSERT INTO artists (username) VALUES ('someone')");
};
const loadSampleData = async (product) => {
    let columns = `'${product.title}', ${product.price}, '${product.description}', '${product.image}',${product.num_sales}, ${product.num_stars}, ${product.num_reviews}, '${product.variations}', ${product.artist_id}, '${product.size}', '${product.materials}'`;
    const client = await pool.connect();

    const result = await client.query(
        "INSERT INTO products (title,price,description,image,num_sales,num_stars,num_reviews, variations, artist_id, size, materials) VALUES (" +
            columns +
            ")"
    );
    const client = await pool.connect();
    const result = await client.query("SELECT title FROM products");
    console.log(result.rows, result.rows.length);
};

// products.forEach((product) => {
//     loadSampleData(product);
// });
// loadDB();
