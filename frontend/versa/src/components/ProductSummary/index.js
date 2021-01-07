import React from "react";
import styled from "styled-components";
import { WishListIcon, Star, Circle } from "../../images/icons";

const ProductSummary = ({
    title,
    price,
    description,
    image,
    num_sales,
    num_stars,
    num_reviews,
    variations,
    artist,
    size,
    materials,
}) => {
    return (
        <ProductSummaryContainer>
            <NameAddWishContainer>
                <ProductName>{title}</ProductName>
                <WishListIcon />
            </NameAddWishContainer>
            <PriceReviewContainer>
                <PriceSoldContainer>
                    <Price>${price}</Price>
                    <ProductSold>{num_sales} sold</ProductSold>
                </PriceSoldContainer>
                <span>|</span>
                <ReviewContainer>
                    <StarsContainer>
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </StarsContainer>
                    <NumReviews>{num_reviews} reviews</NumReviews>
                </ReviewContainer>
            </PriceReviewContainer>
            <VariationsContainer>
                <h5>Variations </h5>
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
                    {size}
                    <p>12</p>
                    <p>x</p>
                    <p>12</p>
                    <p>x</p>
                    <p>12</p>
                </Dimensions>
            </SizeContainer>
            <ShortDescriptionContainer>
                <ShortDescription>{description}</ShortDescription>
            </ShortDescriptionContainer>
            <ButtonContainer>
                <Buy>Buy</Buy>
                <AddToCart>Add To Cart</AddToCart>
            </ButtonContainer>
        </ProductSummaryContainer>
    );
};

export default ProductSummary;

//map: stars, variations and dimensions

const ProductSummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
`;
const NameAddWishContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;
const ProductName = styled.div`
    font-size: 30px;
    padding-right: 20px;
`;
const PriceReviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 10px;

    span {
        margin: 0 20px;
    }
`;
const PriceSoldContainer = styled.div`
    display: flex;
`;
const Price = styled.div`
    padding-right: 20px;
`;
const ProductSold = styled.div``;
const ReviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
`;

const StarsContainer = styled.div``;

const NumReviews = styled.div`
    margin: 0 20px;
`;
const VariationsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 10px;
    h5 {
        padding-right: 20px;
    }
`;
const VariationsOptions = styled.div`
    .circle {
        padding-right: 5px;
    }
`;
const SizeContainer = styled.div`
    display: flex;
    padding: 10px;
    h5 {
        padding-right: 20px;
    }
`;
const Dimensions = styled.div`
    p {
        margin: 0 5px;
    }
    display: flex;
`;
const ShortDescriptionContainer = styled.div`
    padding: 10px;
    p {
    }
`;
const ShortDescription = styled.p``;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;
const Buy = styled.button`
    padding: 10px 20px;
    background: #444444;
    border-radius: 50px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-right: 20px;
`;
const AddToCart = styled.button`
    padding: 10px 20px;
    background: #444444;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
`;
