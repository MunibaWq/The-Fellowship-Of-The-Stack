import React, { useState } from "react";
import styled from "styled-components";
import { updateInventoryStatus } from "../../../axios/puts";
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

const InventoryDropDown = ({ result }) => {
    const statusOptions = [
        {
            value: "Active",
            label: "Active",
        },
        {
            value: "Backorder",
            label: "Backorder",
        },
        {
            value: "Discontinue",
            label: "Discontinue",
        },
    ];
    const [status, setStatus] = useState(result.status);
    const [confirmation, setConfirmation] = useState(false);

    console.log(status);
    const handleChange = (e) => {
        setStatus(e.target.value);
        setConfirmation(true);
        e.target.value === "Active"
            ? updateInventoryStatus(result, e.target.value)
            : e.target.value === "Backorder"
            ? updateInventoryStatus(result, e.target.value)
            : updateInventoryStatus(result, e.target.value);
    };
    console.log(status);

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

export default InventoryDropDown;
