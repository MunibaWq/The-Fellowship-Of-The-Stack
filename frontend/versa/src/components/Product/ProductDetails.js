import React from "react";
import styled from "styled-components";
import colors from "../Reusable/Colors";

const ProductDetails = ({ description, size, materials }) => {
    return (
        <DetailsContainer>
            <Title>Product Details</Title>
            <ProductDetailsP>
                <p>{description}</p>
            </ProductDetailsP>
            <Materials>
                <h5>Materials</h5>
                <p>{materials}</p>
            </Materials>
        </DetailsContainer>
    );
};

export default ProductDetails;

const DetailsContainer = styled.div`
    background-color: ${colors.primary};
    * {color: ${colors.secondary};}
    @media (max-width: 414px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px 10px;
    }
`;
const Title = styled.h6`
    padding: 10px 20px 0px 20px;
`;
const ProductDetailsP = styled.div`
    padding: 10px 20px;
`;

const Materials = styled.div`
    padding: 10px 20px;
    h5 {
        margin-bottom: 10px;
    }
    p {
    }
`;
