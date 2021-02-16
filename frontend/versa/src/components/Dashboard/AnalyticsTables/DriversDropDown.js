import React, { useState } from "react";
import styled from "styled-components";
import {
    updateOrderStatus,
    updateOrderShipDate,
    addToDeliveries,
} from "../../../axios/puts";
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

const DriversDropDown = ({ order }) => {
    const statusOptions = [
        {
            value: "Ready for Delivery",
            label: "Ready for Delivery",
        },
        {
            value: "Add to Deliveries",
            label: "Add to Deliveries",
        },
        {
            value: "Delivery in Progress",
            label: "Delivery in Progress",
        },
        {
            value: "Delivered",
            label: "Delivered",
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
            : e.target.value === "Add to Deliveries"
            ? addToDeliveries(order.id)
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
        </Status>
    );
};

export default DriversDropDown;
