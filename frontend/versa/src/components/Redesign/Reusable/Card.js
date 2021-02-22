import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { calcTotalStock } from "../../../functions/calcTotalStock";
import OutOfStock from "./OutOfStock";
import { Going, ShoppingCart } from "../../../images/icons";
const bigDetails = {
    shop: { first: "$", second: "price" },
    event: { second: "num_attending", third: " attending" },
};
const details = { shop: "artist", event: "location" };
const barDetailsL = { event: "startDate" };
const barDetailsR = { event: "startTime" };
const Card = ({ type, item, link, awsFolder, action, featured }) => {
    return (
        <Link to={`/${link}/${item.id}`} style={{ position: "relative" }}>
            {type === "shop" && (
                <OutOfStock stock={calcTotalStock(item)}>
                    <p>Out of Stock</p> 🙁
                </OutOfStock>
            )}

            <CardContainer
                featured={featured}
                stock={type === "shop" ? calcTotalStock(item) : null}>
                {type === "event" && (
                    <Bar>
                        <p>{item[barDetailsL[type]]}</p>
                        <p>{item[barDetailsR[type]]}</p>
                    </Bar>
                )}
                <Image
                    src={`https://versabucket.s3.us-east-2.amazonaws.com/${awsFolder}/${item.thumbnail}.jpeg`}
                    alt={item.title}
                />
                <ItemInfo>
                    <Title>{item.title}</Title>
                    <Detail>{item[details[type]]}</Detail>
                    <ImportantDetail>
                        <BigDetail>
                            {bigDetails[type].first}
                            {item[bigDetails[type].second]}
                            {bigDetails[type].third}
                        </BigDetail>
                        {action && (
                            <Action
                                stock={
                                    type === "shop"
                                        ? calcTotalStock(item)
                                        : null
                                }>
                                {type === "shop" && <ShoppingCart />}
                                {type === "event" && (
                                    <Going width="18" height="18" />
                                )}
                            </Action>
                        )}
                    </ImportantDetail>
                </ItemInfo>
            </CardContainer>
        </Link>
    );
};

export default Card;
const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* height: 39px; */
    background-color: ${(props) => props.theme.black};
    width: calc(100% + 50px);
    margin: -25px -25px 25px -25px;
    padding: 10px 20px;
    border-radius: 16px 16px 0 0;
    p {
        color: white;
        font-size: 14px;
    }
`;
const CardContainer = styled.div`
    border-radius: 16px;
    margin: 16px 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 350px;
    padding: 25px;
    filter: ${(props) => (props.stock === 0 ? "grayscale(1)" : "grayscale(0)")};
    cursor: pointer;
    background: ${(props) =>
        props.featured ? props.theme.blue : props.theme.lightBlue};
    :hover {
        background: ${(props) =>
            props.stock === 0 ? props.theme.blue : props.theme.orange};
    }
`;

const Image = styled.img`
    width: 300px;
    height: 300px;
    margin-top: 8px;
    filter: ${(props) =>
        props.stock === 0 ? "grayscale(100%)" : "grayscale(0%)"};
`;

const ItemInfo = styled.div`
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    padding: 8px;
    width: 100%;
`;

const Title = styled.h3`
    font-size: 1em;
    font-weight: 700;
    text-transform: capitalize;
`;

const Detail = styled.p`
    font-size: 0.9em;
    text-transform: capitalize;
`;

const ImportantDetail = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const BigDetail = styled.p`
    font-size: 1.1em;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: capitalize;
`;
const Action = styled.button.attrs((props) => ({
    type: props.type || "button",
}))`
    outline: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: ${(props) =>
        props.stock === 0 ? props.theme.blue : props.theme.purple};
    cursor: ${(props) => (props.stock === 0 ? "default" : "pointer")};
    border-radius: 8px;
    border: none;
    transition: background 0.3s ease;
    :hover {
        background: ${(props) =>
            props.stock === 0 ? props.theme.blue : props.theme.holo};
        svg {
            path {
                stroke: ${(props) =>
                    props.stock === 0 ? props.theme.blue : props.theme.black};
            }
        }
    }
    svg {
        path {
            stroke: ${(props) => props.theme.blue};
        }
    }
`;
