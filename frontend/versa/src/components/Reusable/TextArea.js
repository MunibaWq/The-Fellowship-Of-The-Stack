import React from "react";

const TextArea = ({ setter, getter }) => {
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <label htmlFor="deliveryTextBox">Additional Order/Delivery Instructions:</label>
            <textarea
                value={getter}
                id="deliveryTextBox"
                name="deliveryInstructions"
                style={{ resize:"none", width:"100%", height:"64px"}}
                
                onChange={(e) => setter(e.target.value)}></textarea>
        </div>
    );
};

export default TextArea;
