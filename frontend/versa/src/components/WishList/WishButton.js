import React, { useState } from "react";
import styled from "styled-components";
import { FilledHeartIcon, HeartIcon, WishListIcon } from "../../images/icons";
import Button from "../Reusable/Button";
import theme from "../Reusable/Colors";

const WishButton = ({ productID }) => {
    const [clicked, setClicked] = useState(false);
    console.log({ clicked });

    const addToWishList = (productID) => {
        //need to add product to wishlist in db
    };

    const deleteFromWishList = (productID) => {
        //need to remove product from wishlist in db
    };
    console.log(productID);
    return (
        <ActionButton
            onClick={() => {
                if (clicked) {
                    addToWishList(productID);
                } else {
                    deleteFromWishList(productID);
                }
                setClicked((curr) => !curr);
            }}>
            {/* onClick=
            {() => {
                setClicked((curr) => !curr);
            }} 
            >*/}
            {clicked && (
                <div>
                    <WishListIcon
                        onClick={() => setClicked(false)}
                        fill="#FF0000"
                        stroke="#FF0000"
                        width="33"
                        height="33"
                    />
                </div>
            )}
            {!clicked && (
                <div>
                    <WishListIcon stroke={theme.primary} />
                </div>
            )}
        </ActionButton>
    );
};

export default WishButton;

const ActionButton = styled(Button)`
    flex-direction: column;
    margin: 0;
    padding: 0;
    :hover,
    :focus,
    :active {
        transform: scale(1.05);
    }
    p {
        font-size: 0.5em;
    }
    div {
        svg {
            path {
                fill: ${(props) => props.fill};
            }
        }
    }
`;
