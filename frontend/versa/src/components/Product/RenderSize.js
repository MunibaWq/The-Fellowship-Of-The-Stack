// import React from "react";

const RenderSize = ({ size }) => {
    if (size) {
        const sizeArrLength = size.length - 1;

        const sizeArr = size.map((sizes, index) => {
            if (sizeArrLength !== index) {
                return sizes + "x";
            } else {
                return sizes;
            }
        });
        return sizeArr;
    } else {
        return '0x0x0'
    }
};

export default RenderSize;
