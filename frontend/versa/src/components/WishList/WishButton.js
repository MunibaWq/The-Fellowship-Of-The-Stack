import React from "react";
import styled from "styled-components";
import { WishListIcon } from "../../images/icons";
import Button from "../Reusable/Button";

const addOrRemoveWish = (productID) => {
    {
        "clicked" ? (
            <WishListIcon value="clicked" style={{ backgroundColor: "blue" }} />
        ) : (
            <WishListIcon
                value="notClicked"
                style={{ backgroundColor: "none" }}
            />
        );
    }
};
const WishButton = ({ productID }) => {
    return (
        <div>
            <HeartButton onClick={(e) => addOrRemoveWish({ productID })}>
                <WishListIcon />
            </HeartButton>
        </div>
    );
};

export default WishButton;

const HeartButton = styled(Button)`
    background: none;
    border: none;
    margin-left: -0.5rem;
`;
