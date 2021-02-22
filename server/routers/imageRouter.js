const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const pool = require("../db");
const auth = require("../middleware/auth");

require("dotenv").config();

const router = express.Router();
const storage = multer.memoryStorage({
    destination: function (req, files, callback) {
        callback(null, "");
    },
});
var multipleUpload = multer({ storage: storage }).array("file");
const BUCKET_NAME = "versabucket";
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;

const secretKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

router.put("/update", auth, async (req, res) => {
    const { label, imageSize, productID, filename } = req.body;
    if (!req.user.is_artist) {
        res.status(500).send("Not Authorized");
    } else {
        let checkOwner = await pool.query(
            "SELECT artist_id from products WHERE id = " + productID
        );
        if (checkOwner.rows[0].artist_id !== req.user.id) {
            res.status(500).send("Not Authorized");
        }
        try {
            //make a query to insert the image info into the db
            let query = `UPDATE images SET label = '${label}', img_size = '${imageSize}' WHERE product_id = ${productID} AND filename = '${filename}';`;
            pool.query(query);
            if (imageSize === "thumb") {
                const thumbnail = await pool.query(
                    `UPDATE products
                SET thumbnail='${filename}'
                WHERE id = ${productID} RETURNING *;`
                );
            }
            res.sendStatus(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }
});

router.post("/add", multipleUpload, auth, async function (req, res) {
    const filename = uuid();
    const file = req.files;
    const { label, imageSize, productID } = req.body;
    let s3bucket = new AWS.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretKey,
        bucketName: BUCKET_NAME,
        dirName: "images",
    });
    if (!req.user.is_artist) {
        res.status(500).send("Not Authorized");
    } else {
        let checkOwner = await pool.query(
            "SELECT artist_id from products WHERE id = " + productID
        );
        if (checkOwner.rows[0].artist_id !== req.user.id) {
            res.status(500).send("Not Authorized");
        }
        s3bucket.createBucket(function () {
            var ResponseData = [];

            file.map((item) => {
                var params = {
                    Bucket: BUCKET_NAME + "/images",
                    Key: filename + ".jpeg",
                    Body: item.buffer,
                    ACL: "public-read",
                };
                s3bucket.upload(params, function (err, data) {
                    if (err) {
                        res.status(400).json({ error: true, Message: err });
                    } else {
                        ResponseData.push(data);
                        if (ResponseData.length == file.length) {
                            res.status(201).json({
                                error: false,
                                Message: "File Uploaded Successfully",
                                Data: ResponseData,
                            });
                        }
                    }
                });
            });
        });
        try {
            //make a query to insert the image info into the db
            const response = await pool.query(
                "INSERT INTO images (filename, label, img_size, product_id) VALUES ($1, $2, $3,$4) RETURNING *",
                [filename, label, imageSize, productID]
            );
            if (imageSize === "thumb") {
                const thumbResponse = await pool.query(
                    `UPDATE products
                SET thumbnail='${filename}'
                WHERE id = ${productID};`
                );
            }
            //res.sendStatus(201);
        } catch (e) {
            console.log(e);
            //res.sendStatus(400);
        }
    }
});

router.get("/byPID/:id", async (req, res) => {
    try {
        //make a query to insert the image info into the db
        let result = await pool.query(
            "SELECT * from IMAGES WHERE product_id =" + req.params.id
        );
        res.send(result.rows);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

//delete image

router.delete("/delete/:id", auth, async (req, res) => {
    const id = req.params.id;
    if (!req.user.is_artist) {
        res.status(500).send("Not Authorized");
    } else {
        let checkOwner = await pool.query(
            "SELECT p.artist_id from products p INNER JOIN images i ON i.product_id = p.id WHERE i.id = " +
                id
        );
        if (checkOwner.rows[0].artist_id !== req.user.id) {
            res.status(500).send("Not Authorized");
        }
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
    }
});

module.exports = router;
