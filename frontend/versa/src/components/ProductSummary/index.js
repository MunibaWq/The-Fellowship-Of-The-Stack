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
    const renderVariations = variations.map((variation) => {
        return <Circle variation={variation} />;
    });

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
                <VariationsOptions>{renderVariations}</VariationsOptions>
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
    padding: 20px;
`;
const NameAddWishContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
`;
const ProductName = styled.div`
    font-size: 36px;
    padding-right: 20px;
`;
const PriceReviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;

    span {
        margin: 0 5px;
    }
`;
const PriceSoldContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const Price = styled.div`
    padding-right: 10px;
    p {
        margin: 0;
        padding: 0;
    }
`;
const ProductSold = styled.div`
    margin: 0;
    p {
        margin: 0;
    }
`;
const ReviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const StarsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-right: 10px;
    svg {
        padding-right: 5px;
    }
`;

const NumReviews = styled.div``;
const VariationsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    h5 {
        padding-right: 20px;
    }
    svg {
        padding-right: 5px;
    }
`;
const VariationsOptions = styled.div`
    .circle {
        padding-right: 5px;
    }
`;
const SizeContainer = styled.div`
    display: flex;
    padding-bottom: 20px;
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
    padding-bottom: 20px;
    p {
    }
`;
const ShortDescription = styled.p``;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
`;
const Buy = styled.button`
    padding: 10px 20px;
    background: #444444;
    border-radius: 50px;
    border: none;
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
    border: none;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
`;
