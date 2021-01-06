import React from "react";
import styled from "styled-components";
import { WishListIcon } from "../../images/icons";

const productImage = styled.div``;
const productInfo = styled.div``;
const NameAddWishContainer = styled.div``;

const ProductItem = () => {
  return (
    <div>
      <productImage />
      <productInfo>
        <NameAddWishContainer>
          <h3> Product Name</h3>
          <WishListIcon />
        </NameAddWishContainer>
        <PriceReviewContainer>
          <PriceSoldContainer>
            <Price>$99.99</Price>
            <ProductSold>123 sold</ProductSold>
          </PriceSoldContainer>
          <ReviewContainer></ReviewContainer>
        </PriceReviewContainer>
      </productInfo>
    </div>
  );
};

export default ProductItem;

ProductInfo.js maps through json and ProductInfoRender.js created