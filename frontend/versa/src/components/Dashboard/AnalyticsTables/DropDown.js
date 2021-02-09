import React, { useState } from "react";
import styled from "styled-components";
import { updateOrderStatus, updateOrderShipDate } from "../../../axios/puts";
import theme from "../../Reusable/Colors";

const Status = styled.select`
    padding: 8px;
    outline: none;
    border: ${(props) =>
        props.border === true
            ? `2px solid #77dd77`
            : `2px solid ${theme.primary}`};
    :active,
    :hover,
    :focus {
        border: ${(props) =>
            props.border === true
                ? `2px solid #77dd77`
                : `2px solid ${theme.primaryHover}`};
    }
`;

const DropDown = ({ statusOptions, order }) => {
    const [status, setStatus] = useState(order.status);
    const [confirmation, setConfirmation] = useState(false);


    
    const handleChange = (e) => {
        setStatus(e.target.value);
        setConfirmation(true);
        console.log(status)
        e.target.value === "Shipped" ? updateOrderShipDate(e.target.value,new Date(), order.id) :
        updateOrderStatus(order.status, order.id);
    };
    console.log("s", status);
    console.log("c", confirmation);
    return (
        <Status
            name="status"
            id="status"
            value={status}
            onChange={handleChange}
            border={confirmation}>
            {statusOptions.map((option) => (
                <>
                    <option value={option.value}>{option.label}</option>
                </>
            ))}
        </Status>
    );
};

export default DropDown;
