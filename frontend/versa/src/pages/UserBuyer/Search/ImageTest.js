import React, { useState } from "react";
import { addImage } from "../../../axios/posts";
// import sendImage from "./helper";

const ImageTest = () => {
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([])
    return (
        <>
            <input
                onChange={(e) => {
                    let image = URL.createObjectURL(e.target.files[0])
                    setImages([...images, image]);
                    setImageFiles([...imageFiles,e.target.files[0]])
                    console.log(image)
                }}
                type={"file"}
                accept={"image/png, image/jpeg"}
            ></input>

            {images.map((image,index) => {
                return (
                    <>
                        <img key={index} alt='product' style={{ width: "200px" }} src={image} />
                    </>
                );
            })}
            <button
                onClick={ () => {
                    imageFiles.forEach(async (image) => {
                        let res = await addImage(imageFiles[0], 'britney', 'full', 1)
                        if (res) console.log('success')
                        else console.log('failed')
                    })
                   
                    
                }}
            >
                Send
            </button>
        </>
    );
};

export default ImageTest;
