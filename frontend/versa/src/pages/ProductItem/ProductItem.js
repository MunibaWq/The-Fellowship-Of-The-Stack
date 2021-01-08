import React from "react";
import styled from "styled-components";
import ArtistDetails from "../../components/Product/ArtistDetails";
import CustomerReviews from "../../components/Product/CustomerReviewsSection";
import ProductPageImage from "../../components/Product/ProductPageImage";

import ProductData from "../../components/Product/ProductData";

const ProductItem = ({ currentProduct }) => {
    console.log('productItem.js', currentProduct)
    return (
        <ProductItemContainer>
            <ProductPageImage />
            <ProductData currentProduct={currentProduct}/>
            <ArtistDetails />
            <CustomerReviews />
        </ProductItemContainer>
    );
};

export default ProductItem;

const ProductItemContainer = styled.div``;
