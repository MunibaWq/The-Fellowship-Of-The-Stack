const express = require('express')
const router = new express.Router()




//Load mulitple filed per image and convert to string
//will need to determine when last string has been recieved to execute

//need to define variable outside of post, b/c it will reset if inside post
let image = "";
router.post("/add", async (req, res) => {
    //2.now we can do the stuff that happens when req.body.lastString is NOT TRUE
    // if not true we will take req.body.part and add it to the image
    //basically building the string until it is complete and lastString is true and then we will add it to the db
    image += req.body.part;

    //1.the body will have a boolean to hold to determine if the last string is coming = lastString
    if (req.body.lastString) {
        //assign query variables
        //not getting image from the body because only part of it is coming in with each request
        let { label, img_size, product_id } = req.body;

        //make a query to insert the image into the db
        pool.query(
            "INSERT INTO images (image, label, img_size, product_id) VALUES ($1, $2, $3,$4) RETURNING *",
            [image, label, img_size, product_id]
        );
        //reset the image to empty string, that resets it so that next time the image comes in it will start off as an empty string again, so it clears the first image sent in from image
        image = "";

        //testing that images are properly being saved and can be retrieved from the database again
        let result = await pool.query("SELECT * FROM images");
        res.json(result.rows);
        //test code:
    } else {
        res.send("testing img to db");
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
