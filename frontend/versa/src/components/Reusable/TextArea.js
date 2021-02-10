import React from "react";

const TextArea = ({ setter, getter }) => {
    return (
        <div>
            <label htmlFor="deliveryTextBox">Delivery Instructions:</label>

            <textarea
                value={getter}
                id="deliveryTextBox"
                name="deliveryInstructions"
                rows="4"
                cols="50"
                onChange={(e) => setter(e.target.value)}></textarea>
        </div>
    );
};

export default TextArea;
