import React from "react";
import styled from "styled-components";
import { WishListIcon } from "../../images/icons";
import colors from "../Reusable/Colors";
import RenderStars from "./RenderStars";

const ProductSummary = ({
    title,
    price,
    description,
    num_stars,
    num_reviews,
    sizes,
    colours,
}) => {
    // let renderVariations;
    // if (variations) {
    //     renderVariations = variations.map((variation, index) => {
    //         return <Circle variation={variation} key={`${title}-${index}`} />;
    //     });
    // }

    return (
        <ProductSummaryContainer>
            <NameAddWishContainer>
                <ProductName>{title}</ProductName>
                <WishListIcon />
            </NameAddWishContainer>
            <PriceReviewContainer>
                <PriceSoldContainer>
                    <Price>${price}</Price>
                </PriceSoldContainer>
                <span>|</span>
                <ReviewContainer>
                    <StarsContainer>
                        <RenderStars num_stars={num_stars} />
                    </StarsContainer>
                    <NumReviews>{num_reviews} reviews</NumReviews>
                </ReviewContainer>
            </PriceReviewContainer>

            <SizeOptionsContainer>
                <h5>Sizes</h5>
                {sizes.length > 0 &&
                    sizes.map((size, index) => {
                        return (
                            <SizeOption>
                                <p>{size.label}</p>

                                {size.price}
                            </SizeOption>
                        );
                    })}
            </SizeOptionsContainer>
            <ColourOptions>
                <h5>Colours</h5>
                {colours.length > 0 &&
                    colours.map((colour, index) => {
                        return (
                            <ColourOption>
                                <p>{colour.label}</p>
                                <ColourPreview colour={colour.value} />
                            </ColourOption>
                        );
                    })}
            </ColourOptions>
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

const ProductSummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    max-width: 425px;
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
const SizeOptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    h5 {
        padding-right: 20px;
    }
`;
const SizeOption = styled.div`
    background-color: ${colors.primary};
    width: 32px;
    height: 32px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px 0 0;

    p {
        text-transform: uppercase;
    }
`;

const ColourOptions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ColourOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ColourPreview = styled.div`
    width: 1em;
    height: 1em;
    margin: 0 10px;
    border-radius: 50px;
    background-color: ${(props) => props.colour};
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
