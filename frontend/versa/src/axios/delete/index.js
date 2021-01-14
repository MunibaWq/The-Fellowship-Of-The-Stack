import Axios from "axios";
import { v4 as uuid } from "uuid";
import S3 from "react-aws-s3";
import { accessKeyId, secretKey } from "../posts/secret";

console.log(accessKeyId, secretKey);
export const deleteImage = async (filename, id) => {
    const config = {
        bucketName: "versabucket",
        dirName: "images",
        region: "us-east-2",
        accessKeyId: accessKeyId,
        secretAccessKey: secretKey,
    };

    const ReactS3Client = new S3(config);

    ReactS3Client.deleteFile(filename)
        .then((data) => {
            console.log(data);
            Axios.delete("http://localhost:5000/images/delete/:id").then(
                (response) => {
                    console.log(response);
                    if (response.status === 201) {
                        return true;
                    }
                    return false;
                }
            );
        })
        .catch((err) => {
            console.error(err);
            return false;
        });

    /**
     * {
     *   Response: {
     *     bucket: "myBucket",
     *     key: "image/test-image.jpg",
     *     location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
     *   }
     * }
     */

    // var s3 = new AWS.S3({
    //     aws_access_key_id: accessKeyId,
    //     aws_secret_access_key: secretKey,
    // });

    // // configuring parameters
    // var params = {
    //     Bucket: BUCKET_NAME,
    //     Body: image,
    //     Key: "images/" + filename,
    // };

    // s3.upload(params, async function (err, data) {
    //     //handle error
    //     if (err) {
    //         console.log("Error", err);
    //         return false;
    //     }

    //     //success
    //     if (data) {
    //         console.log("Uploaded in:", data.Location);
    //         let response = await Axios.post("/images/add", {
    //             filename: filename,
    //             label: label,
    //             image_size: imageSize,
    //             productID: productID,
    //         });
    //         if (response.status(201)) {
    //             return true;
    //         }
    //         return false;
    //     }
    // });

    // var params = {
    //     Key: "folder/1610482949524_sample.txt",
    //     Bucket: BUCKET_NAME,
    // };
    // s3.getObject(params, function (err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     fs.writeFileSync("./sample1.txt", data.Body);
    //     console.log("file downloaded successfully");
    // });
};
