import React, { useState } from "react";
import styled from "styled-components";
import { updateOrderStatus, updateOrderShipDate } from "../../../axios/puts";
import theme from "../../Reusable/Colors";

const Status = styled.select`
    padding: 8px;
    outline: none;
    width: 100%;
    cursor: pointer;
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
        console.log(status);
        e.target.value === "Picked Up"
            ? updateOrderShipDate(e.target.value, new Date(), order.id)
            : e.target.value === "Delivered"
            ? updateOrderShipDate(e.target.value, new Date(), order.id)
            : updateOrderStatus(order.status, order.id);
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
            {order.pickup === true ? (
                <option value="Ready For Pick Up">Ready For Pick Up</option>
            ) : (
                <option value="Ready For Delivery">Ready For Delivery</option>
            )}
        </Status>
    );
};

export default DropDown;
