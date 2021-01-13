const express = require("express");
const router = new express.Router();
const pool = require("../db");

router.post("/add", async (req, res) => {
    //assign query variables
    let { filename, label, imageSize, productID } = req.body;
    try {
        //make a query to insert the image info into the db
        pool.query(
            "INSERT INTO images (filename, label, img_size, product_id) VALUES ($1, $2, $3,$4) RETURNING *",
            [filename, label, imageSize, productID]
        );
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

//delete image

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    if (Object.keys(req.params).length === 0) {
        console.log("no id");
    }
    try {
        pool.query("DELETE FROM images WHERE id = $1", [id]);
        res.json({ msg: "Image Deleted!" });
    } catch (err) {
        console.error(err.message);
        res.send({
            message: "error",
        });
    }
});


module.exports = router