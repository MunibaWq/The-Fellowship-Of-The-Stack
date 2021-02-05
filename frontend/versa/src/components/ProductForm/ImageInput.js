import React from "react";
import { crop } from "../../imageUtils";
import { setImages } from "../../redux/actions/Images";

export function ImageInput(dispatch, images, form) {
    return (<input
        style={{ width: "115px" }}
        onChange={(e) => {
            if (e.target.files.length > 0) {
                let image = URL.createObjectURL(
                    e.target.files[0]
                );

                crop(image, 1).then((img) => {
                    // add that image to the images to be sent to AWS
                    dispatch(
                        setImages(form, [
                            ...images,
                            {
                                image: image,
                                label: "test",
                                imageFile: img,
                                size: "full",
                            },
                        ])
                    );
                });
            }
        }}
        type={"file"}
        accept={"image/jpeg"}
    ></input>);
}
