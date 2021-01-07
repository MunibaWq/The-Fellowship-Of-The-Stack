import React from "react";
import styled from "styled-components";

const ProductDetails = () => {
    return (
        <DetailsContainer>
            <Title>Product Details</Title>
            <ProductDetailsP>
                <p>
                    Longer paragraph describing the product in detail. So many
                    details lots and lots and lots of details. So many details
                    lots and lots and lots of details. So many details lots and
                    lots and lots of details.
                </p>
            </ProductDetailsP>
            <SizeFit>
                <h5>Size & Fit</h5>
                <p>
                    Description of size and fit or whatever else info they might
                    need.
                </p>
            </SizeFit>
            <Materials>
                <h5>Materials</h5>
                <p>
                    Description of materials or whatever else info they might
                    need.
                </p>
            </Materials>
            <Collection>
                <h5>Collection</h5>
                <p>
                    Description of inspiration behind collection or whatever
                    else info they might need.
                </p>
            </Collection>
        </DetailsContainer>
    );
};

export default ProductDetails;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 10px;
    background-color: #c5c3ff;
`;
const Title = styled.h6`
    padding: 10px 20px 0px 20px;
`;
const ProductDetailsP = styled.div`
    padding: 10px 20px;
`;
const SizeFit = styled.div`
    padding: 10px 20px;
    h5 {
        margin-bottom: 10px;
    }
    p {
    }
`;
const Materials = styled.div`
    padding: 10px 20px;
    h5 {
        margin-bottom: 10px;
    }
    p {
    }
`;
const Collection = styled.div`
    padding: 10px 20px;
    h5 {
        margin-bottom: 10px;
    }
    p {
    }
`;
