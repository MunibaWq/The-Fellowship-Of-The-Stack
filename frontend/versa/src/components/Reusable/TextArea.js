import React from "react";
import styled from "styled-components";

const TextArea = ({ setter, getter }) => {
    return (
        <div style={{display:"flex", flexDirection:"column", marginTop:"20px"}}>
            <label htmlFor="deliveryTextBox">Additional Order/Delivery Instructions:</label>
            <TextAreaUnit
                value={getter}
                id="deliveryTextBox"
                name="deliveryInstructions"
                
                onChange={(e) => setter(e.target.value)}></TextAreaUnit>
        </div>
    );
};

export default TextArea;
const TextAreaUnit = styled.div`
    padding: 8px;
    outline: none;
    width: 100%;
    resize: none;
    height: 100px;
    margin-bottom: 1em;
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.black};
    :active,
    :hover,
    :focus {
        border: 2px solid ${(props) => props.theme.purple};
    }
`