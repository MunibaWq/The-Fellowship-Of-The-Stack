import React from "react";
import styled from "styled-components";
import { Circle } from "../../images/icons";
import Image from "../../images/imageTest.png";

const ProductPageImage = ({ productDataState }) => {
    console.log(productDataState);
    return (
        <CarouselContainer>
            <ProductImage
                src={"http://localhost:5000/images/" + productDataState.image}
                alt="product"
            />
            <BackToResults>
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

const BackToResults = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border: 3px solid #ff5c00;
    box-sizing: border-box;
    border-radius: 50px;
    margin: 20px 0 0 20px;
    position: absolute;
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
