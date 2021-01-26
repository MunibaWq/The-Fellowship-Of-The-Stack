import React from "react";
import styled from "styled-components";
import colors from "../Reusable/Colors";

const ProductDetails = ({ description, size, materials }) => {
    return (
        <DetailsContainer>
            <h6>Product Details</h6>
            <ProductDetailsP>
                <h3>Description</h3>
                <p>{description}</p>
            </ProductDetailsP>
            <Materials>
                <h3>Materials</h3>
                <p>{materials}</p>
            </Materials>
        </DetailsContainer>
    );
};

export default ProductDetails;

const DetailsContainer = styled.div`
    background-color: ${colors.primary};
    * {
        color: ${colors.secondary};
    }
    @media (max-width: 414px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px 10px;
    }
    h3 {
        margin-bottom: 10px;
    }
    h6 {
        padding: 20px;
    }
`;

const ProductDetailsP = styled.div`
    padding: 10px 20px;
`;

const Materials = styled.div`
    padding: 10px 20px;
`;
