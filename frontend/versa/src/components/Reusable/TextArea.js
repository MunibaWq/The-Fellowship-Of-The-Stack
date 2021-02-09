import React from "react";

const TextArea = () => {
    return (
        <div>
            <label htmlFor="deliveryTextBox">Delivery Instructions:</label>

            <textarea
                id="deliveryTextBox"
                name="deliveryInstructions"
                rows="4"
                cols="50">
                Add delivery instructions or special directions when delivering
                this item.
            </textarea>
        </div>
    );
};

export default TextArea;
