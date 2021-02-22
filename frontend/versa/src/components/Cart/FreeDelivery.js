import React from "react";

const FreeDelivery = ({ total }) => {
    function checkTotal() {
        const isNumber = isNaN(total);
        if (isNumber) {
            return;
        }
        if (total >= 100) {
            return "You qualify for Free Delivery";
        } else {
            return `You are only $${(100 - total).toFixed(2)} from free delivery`;
        }
    }
    return <div>{checkTotal()}</div>;
};

export default FreeDelivery;
