import React, { useState } from "react";
import TextArea from "./TextArea";

const RadioButton = ({ preference, setPreference }) => {
    function selectActive() {
        if (preference === "pickup") {
            return (
                <h3>
                    Your order will be processed by the artist once it has been
                    completed you will be notified by email.
                </h3>
            );
        } else if (preference === "delivery") {
            return <TextArea />;
        }
    }
    return (
        <div>
            <label htmlFor="pickup">Pickup:</label>
            <input
                id="pickup"
                name="orderPref"
                type="radio"
                value="pickup"
                onChange={(e) => setPreference(e.target.value)}
            />
            {selectActive()}
            <label htmlFor="delivery">Delivery:</label>
            <input
                id="delivery"
                name="orderPref"
                type="radio"
                value="delivery"
                onChange={(e) => setPreference(e.target.value)}
            />
        </div>
    );
};

export default RadioButton;
