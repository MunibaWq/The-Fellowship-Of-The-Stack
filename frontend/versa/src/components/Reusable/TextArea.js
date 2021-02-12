import React from "react";

const TextArea = ({ setter, getter }) => {
    return (
        <div>
            <label htmlFor="deliveryTextBox">Additional Order/Delivery Instructions:</label>

            <textarea
                value={getter}
                id="deliveryTextBox"
                name="deliveryInstructions"
                style={{ resize:"none",width:"200px" }}
                
                onChange={(e) => setter(e.target.value)}></textarea>
        </div>
    );
};

export default TextArea;
