import React from "react";
const { UploadedImage, Radio } = require("../styledComponents");
export let thumbImg = 0;

export function mapImages(images) {
    return images.map((image, index) => {
        return (
            <div>
                <UploadedImage key={index} alt="product" src={image.image} />
                <Radio>
                    <label htmlFor={"thumb" + index}>
                        <input
                            type="radio"
                            id={"thumb" + index}
                            name="chosenOne"
                            onClick={() => {
                                thumbImg = index;
                            }}
                        />
                        Use as thumbnail image
                    </label>
                </Radio>
            </div>
        );
    });
}
