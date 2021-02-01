import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../Reusable/Colors";
import { LeftIcon } from "../../images/icons";

let host = process.env.NODE_ENV === "production" ? "" : "";
const ProductPageImage = ({ images, productDataState }) => {
    return (
        <CarouselContainer>
            <ProductImage
                src={
                    productDataState.image
                        ? host + "/images/" + productDataState.image + ".jpeg"
                        : images.length > 0
                        ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${images[0].filename}.jpeg`
                        : ""
                }
                alt={""}
            />
            <BackToSearch to="/">
                <LeftIcon stroke={theme.primary} />
                Back to results
            </BackToSearch>

            <Badge>New</Badge>
        </CarouselContainer>
    );
};

export default ProductPageImage;

const BackToSearch = styled(Link)`
    color: ${theme.primary};
    position: absolute;
    margin: 20px 0 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${theme.primary};
    border: none;
    background-color: ${theme.secondary};
    border-bottom: 3px solid ${theme.secondary};
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
            fill: ${theme.primary};
        }
    }

    &:hover {
        color: ${theme.primaryHover};
        svg {
            path {
                fill: ${theme.primaryHover};
            }
        }
    }

    &:focus {
        outline: none;
        color: ${theme.primaryHover};
        svg {
            path {
                fill: ${theme.primaryHover};
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
    background: ${theme.primary};
    border: 2px solid ${theme.primary};
    border-radius: 50px;
    align-self: end;
    width: 60px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: absolute;
    color: white;
`;
