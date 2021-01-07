import React from "react";

const RenderSize = ({ size }) => {
    const sizeArrLength = size.length - 1;

    const sizeArr = size.map((sizes, index) => {
        if (sizeArrLength !== index) {
            return sizes + "x";
        } else {
            return sizes;
        }
    });
    return sizeArr;
};

export default RenderSize;
