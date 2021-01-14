import React, { useState } from "react";
import { deleteImage } from "../../../axios/delete";
const ImageDelete = () => {
    const [filename, setFilename] = useState("");
    const [imageID, setImageID] = useState("");

    return (
        <>
            <input
                onChange={(e) => {
                    setFilename(e.target.value);
                }}
            />
            <input
                onChange={(e) => {
                    setImageID(e.target.value);
                }}
            />
            <button
                onClick={async() => {
                    let res = await deleteImage(filename, imageID);
                    if (res) console.log('success') 
                    else console.log('fail')
                }}
            ></button>
        </>
    );
};

export default ImageDelete;
