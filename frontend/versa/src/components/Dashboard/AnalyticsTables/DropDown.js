import React, { useState } from "react";
import styled from "styled-components";
import { updateOrderStatus, updateOrderShipDate } from "../../../axios/puts";
// import theme from "../../Reusable/Colors";
import theme from "../../Redesign/Reusable/Theme";

const Status = styled.select`
    padding: 8px;
    outline: none;
    width: 100%;
    cursor: pointer;
    border: ${(props) =>
        props.border === true
            ? `2px solid #B4FFC6`
            : `2px solid ${theme.lightPurple}`};
    :active,
    :hover,
    :focus {
        border: ${(props) =>
            props.border === true
                ? `2px solid #B4FFC6`
                : `2px solid ${theme.purple}`};
    }
`;

const DropDown = ({ order }) => {
    const statusOptions = [
        {
            value: "Unfulfilled",
            label: "Unfulfilled",
        },
        {
            value: "Processing",
            label: "Processing",
        },
        {
            value: "Picked Up",
            label: "Picked Up",
        },
        {
            value: "Ready for Pickup",
            label: "Ready for Pickup",
        },
        {
            value: "Ready for Delivery",
            label: "Ready for Delivery",
        },
        {
            value: "On Hold",
            label: "On Hold",
        },
        {
            value: "Cancelled",
            label: "Cancelled",
        },
        {
            value: "Refunded",
            label: "Refunded",
        },
    ];
    const [status, setStatus] = useState(order.status);
    const [confirmation, setConfirmation] = useState(false);

    const handleChange = (e) => {
        setStatus(e.target.value);
        setConfirmation(true);
        e.target.value === "Picked Up"
            ? updateOrderShipDate(e.target.value, new Date(), order.id)
            : e.target.value === "Delivered"
            ? updateOrderShipDate(e.target.value, new Date(), order.id)
            : updateOrderStatus(e.target.value, order.id);
    };

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
