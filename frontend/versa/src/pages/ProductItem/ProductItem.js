import React from "react";
import styled from "styled-components";
import ArtistDetails from "../../components/ArtistDetails/ArtistDetails";
import CustomerReviews from "../../components/CustomerReviewsSection/CustomerReviewsSection";
import ProductPageImage from "../../components/ProductPageImage/ProductPageImage";

import ProductData from "../../components/ProductInfo/ProductData";

const ProductItem = () => {
    return (
        <ProductItemContainer>
            <ProductPageImage />
            <ProductData />
            <ArtistDetails />
            <CustomerReviews />
        </ProductItemContainer>
    );
};

export default ProductItem;

const ProductItemContainer = styled.div``;
