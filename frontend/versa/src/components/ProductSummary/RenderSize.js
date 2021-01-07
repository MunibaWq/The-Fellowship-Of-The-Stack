import React from "react";

const RenderSize = ({ size }) => {
    const sizeArrLength = size.length;
    const sizeArr = size.map((sizes, index) => {
        return <h1> this is sizeArr map </h1>;
    });
    return sizeArr;
};

// const RenderSize = ({ size }) => {
//     console.log({ size });
//     if (size.length !== 0) {
//         const Size = size.map((size, index) => {
//             return `${size} x`;
//         });
//         size.length--;
//     } else if (size.length === 0) {
//         return { size };
//     }

// const renderSize = (( size , index) => {
//     const sizeArrLength = size.length;
//     console.log(sizeArrLength);
//     if (size.length >> 0) {
//         size.length--;
//         index--;
//         return `${size[index]} x`;
//     } else if (size.length === 0) {
//         return size[index];
//     }
// };
// return <div>this is {size}</div>;
// };

export default RenderSize;
