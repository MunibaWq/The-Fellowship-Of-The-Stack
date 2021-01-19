import React from "react";
import styled from "styled-components";
import { Circle } from "../../images/icons";
import { Link } from "react-router-dom";
let host = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
const ProductPageImage = ({ images, productDataState }) => {
    return (
        <CarouselContainer>
            <ProductImage
                src={
                    productDataState.image
                        ? host + "/images/" + productDataState.image
                        : images
                            ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${images[0].filename}`
                            : ""
                }
                alt={""}
            />
            <BackToResults to="/">
                <h6>Back to results</h6>
            </BackToResults>
            <Badge>New</Badge>
            <ImagePagination>
                <Circle />
                <Circle />
                <Circle />
            </ImagePagination>
        </CarouselContainer>
    );
};

export default ProductPageImage;

const CarouselContainer = styled.section`
    display: grid;
    grid-template-rows: 1fr 1fr;
    max-width: 425px;
    height: 550px;
    overflow: hidden;
    border-radius: 50px;
    position: relative;
`;

const ProductImage = styled.img`
    max-width: 425px;
    position: absolute;
    z-index: -1;
    height: 110%;
`;

const BackToResults = styled(Link)`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border: 3px solid #ff5c00;
    box-sizing: border-box;
    border-radius: 50px;
    margin: 20px 0 0 20px;
    position: absolute;
    text-decoration: none;
    h6 {
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 16px;
    }
`;
const Badge = styled.p`
    padding: 5px 10px;
    margin: 0 0 20px 20px;
    background: #ffb649;
    border-radius: 50px;
    align-self: end;
    width: 60px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: absolute;
`;
const ImagePagination = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: absolute;
    left: 320px;
    top: 510px;

    svg {
        padding-right: 5px;
    }
`;
