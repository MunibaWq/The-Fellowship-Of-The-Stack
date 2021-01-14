import React, { useState } from "react";
import { deleteImage } from "../../../axios/delete";
import removeImage from "./deletehelper";

const ImageDelete = () => {
    const [images, setImages] = useState([]);

    return (
        <>
            <input
                onChange={(e) => {
                    deleteImage(e.target.files[0], "test", "full", 1);
                }}
                type={"file"}
                accept={"image/png, image/jpeg"}
            ></input>

            <button
                onClick={async () => {
                    let res = await removeImage(
                        "http://localhost:5000/images/delete/:id",
                        images[0]
                    );
                    console.log(res);
                    let imageArray = [];
                    for (let i of res.data) {
                        imageArray.pop(i.image);
                    }
                    setImages([...images, ...imageArray]);
                }}
            >
                Send
            </button>
        </>
    );
};

export default ImageDelete;
