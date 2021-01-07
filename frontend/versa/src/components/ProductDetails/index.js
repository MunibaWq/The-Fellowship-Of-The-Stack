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
                <h6>Size & Fit</h6>
                <p>
                    Description of size and fit or whatever else info they might
                    need.
                </p>
            </SizeFit>
            <Materials>
                <h6>Materials</h6>
                <p>
                    Description of materials or whatever else info they might
                    need.
                </p>
            </Materials>
            <Collection>
                <h6>Collection</h6>
                <p>
                    Description of inspiration behind collection or whatever
                    else info they might need.
                </p>
            </Collection>
        </DetailsContainer>
    );
};

export default ProductDetails;

const DetailsContainer = styled.div``;
const Title = styled.h6``;
const ProductDetailsP = styled.div``;
const SizeFit = styled.div``;
const Materials = styled.div``;
const Collection = styled.div``;
