import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FilledHeartIcon, HeartIcon, WishListIcon } from "../../images/icons";
import Button from "../Reusable/Button";
import theme from "../Reusable/Colors";

const WishButton = ({ productID }) => {
    const [clicked, setClicked] = useState(false);
    console.log({ clicked });

    useEffect(() => {
        const addToWish = async () => {
            const resp = await addToWishList(productID);
            if (resp) {
                setClicked(true);
            } else {
                setClicked(false);
            }
        };
    }, [clicked]);

    useEffect(() => {
        const deleteFromWish = async () => {
            const resp = await removeFromWishList(productID);
            if (resp) {
                setClicked(false);
            } else {
                setClicked(true);
            }
        };
    }, [clicked]);

    console.log(productID);
    return (
        <ActionButton
            onClick={() => {
                if (clicked) {
                    addToWish();
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
