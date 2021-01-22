import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../Reusable/Colors";
import Icon from "../Reusable/Icons";
import Button from "../Reusable/Button";
import { LeftIcon } from "../../images/icons";

let host = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
const ProductPageImage = ({ images, productDataState }) => {
    return (
        <CarouselContainer>
            <ProductImage
                src={
                    productDataState.image
                        ? host + "/images/" + productDataState.image
                        : images.length > 0
                        ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${images[0].filename}.jpeg`
                        : ""
                }
                alt={""}
            />
            <BackToSearch to="/">
                <LeftIcon stroke={colors.primary} />
                Back to results
            </BackToSearch>

            <Badge>New</Badge>
        </CarouselContainer>
    );
};

export default ProductPageImage;

const BackToSearch = styled(Link)`
    color: ${colors.primary};
    position: absolute;
    margin: 20px 0 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${colors.primary};
    border: none;
    background-color: ${colors.secondary};
    border-bottom: 3px solid ${colors.secondary};
    padding: 5px 10px;
    font-weight: 700;
    letter-spacing: 5%;
    margin: 5px;
    transition: 0.3s ease;
    min-width: fit-content;
    cursor: pointer;
    max-width: fit-content;

    svg {
        width: 28px;
        height: 28px;
        margin-left: 16px;

        path {
            transition: 0.3s ease;
            fill: ${colors.primary};
        }
    }

    &:hover {
        color: ${colors.primaryHover};
        svg {
            path {
                fill: ${colors.primaryHover};
            }
        }
    }

    &:focus {
        outline: none;
        color: ${colors.primaryHover};
        svg {
            path {
                fill: ${colors.primaryHover};
            }
        }
    }
`;

const CarouselContainer = styled.section`
    grid-column: 1 / 2;
    display: grid;
    height: calc(100vw + 50px);
    overflow: hidden;
    border-radius: 50px;
    position: relative;
    justify-content: center;
`;

const ProductImage = styled.img`
    z-index: -1;
    height: 100vw;
    margin-top: 50px;
    width: 100vw;
    object-fit: cover;
`;

const Badge = styled.p`
    padding: 5px 10px;
    margin: 0 0 20px 20px;
    background: ${colors.primary};
    border: 2px solid ${colors.primary};
    border-radius: 50px;
    align-self: end;
    width: 60px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: absolute;
    color: white;
`;
