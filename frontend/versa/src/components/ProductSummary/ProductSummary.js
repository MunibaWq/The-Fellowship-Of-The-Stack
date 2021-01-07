import React from "react";
import styled from "styled-components";
import { WishListIcon, Star, Circle } from "../../images/icons";

const ProductSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameAddWishContainer = styled.div`
  display: flex;
`;
const ProductName = styled.div``;
const PriceReviewContainer = styled.div`
  display: flex;
`;
const PriceSoldContainer = styled.div`
  display: flex;
`;
const Price = styled.div``;
const ProductSold = styled.div``;
const ReviewContainer = styled.div`
  display: flex;
`;
const NumReviews = styled.div``;
const VariationsContainer = styled.div`
  display: flex;
`;
const VariationsOptions = styled.div``;
const SizeContainer = styled.div`
  display: flex;
`;
const Dimensions = styled.div`
  display: flex;
`;
const ShortDescriptionContainer = styled.div``;
const ShortDescription = styled.p``;
const ButtonContainer = styled.div`
  display: flex;
`;
const Buy = styled.button``;
const AddToCart = styled.button``;

const ProductSummary = () => {
  return (
    <ProductSummaryContainer>
      <NameAddWishContainer>
        <ProductName>Fake Name</ProductName>
        <WishListIcon />
      </NameAddWishContainer>
      <PriceReviewContainer>
        <PriceSoldContainer>
          <Price>$</Price>
          <ProductSold>123 sold</ProductSold>
        </PriceSoldContainer>
        <span>|</span>
        <ReviewContainer>
          <Star />
          <Star />
          <Star />
          <Star />
          <NumReviews>123 reviews</NumReviews>
        </ReviewContainer>
      </PriceReviewContainer>
      <VariationsContainer>
        <h5>Variations</h5>
        <VariationsOptions>
          <Circle />
          <Circle />
          <Circle />
          <Circle />
        </VariationsOptions>
      </VariationsContainer>
      <SizeContainer>
        <h5>Size</h5>
        <Dimensions>
          <p>12</p>
          <p>x</p>
          <p>12</p>
          <p>x</p>
          <p>12</p>
        </Dimensions>
      </SizeContainer>
      <ShortDescriptionContainer>
        <ShortDescription>
          Short description that summarizes the extended details that can be
          seen below
        </ShortDescription>
      </ShortDescriptionContainer>
      <ButtonContainer>
        <Buy>Buy</Buy>
        <AddToCart>Add To Cart</AddToCart>
      </ButtonContainer>
    </ProductSummaryContainer>
  );
};

export default ProductSummary;
