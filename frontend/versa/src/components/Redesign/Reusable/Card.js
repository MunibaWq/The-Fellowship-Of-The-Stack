import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { calcTotalStock } from "../../../functions/calcTotalStock";
import OutOfStock from "./OutOfStock";
import { Going, ShoppingCart } from "../../../images/icons";
const bigDetails = { shop: { prefix: "$", detail: "price" }, "event": {detail:""}};
const details = {shop: "artist"}
const Card = ({ type, item, link, awsFolder, action, featured }) => {
    return (
        <Link to={`/${link}/${item.id}`} style={{ position: "relative" }}>
            {type === "shop" && (
                <OutOfStock stock={calcTotalStock(item)}>
                    <p>Out of Stock</p> 🙁
                </OutOfStock>
            )}
            <CardContainer featured={featured}
                stock={type === "shop" ? calcTotalStock(item) : null}>
                <Image
                    src={`https://versabucket.s3.us-east-2.amazonaws.com/${awsFolder}/${item.thumbnail}.jpeg`}
                    alt={item.title}
                />
                <ItemInfo>
                    <Title>{item.title}</Title>
                    <Detail>{item[details[type]]}</Detail>
                    <ImportantDetail>
                        <BigDetail>
                            {bigDetails[type].prefix}
                            {item[bigDetails[type].detail]}
                        </BigDetail>
                        {action && (
                                <Action stock={calcTotalStock(item)}>
                                    {type === "shop" && <ShoppingCart />}
                                    {type === "attend" && (
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

const CardContainer = styled.div`
    border-radius: 16px;
    margin: 16px 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
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
    width: 250px;
    height: 250px;
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
