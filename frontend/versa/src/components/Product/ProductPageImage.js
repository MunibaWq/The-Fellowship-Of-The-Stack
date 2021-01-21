import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../Reusable/Colors";
import Icon from "../Reusable/Icons";
import Button from "../Reusable/Button";

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
            <BackToSearch as="Link" to="/">
                <Icon type="left" />
                Back to results
            </BackToSearch>

            <Badge>New</Badge>
        </CarouselContainer>
    );
};

export default ProductPageImage;

const BackToSearch = styled(Button)`
    color: ${colors.primary};
    position: absolute;
    margin: 20px 0 0 20px;
`;

const CarouselContainer = styled.section`
    grid-column: 1 / 2;
    display: grid;
    height: 550px;
    overflow: hidden;
    border-radius: 50px;
    position: relative;
    justify-content: center;
`;

const ProductImage = styled.img`
    z-index: -1;

    height: inherit;
    padding-top: 50px;
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
