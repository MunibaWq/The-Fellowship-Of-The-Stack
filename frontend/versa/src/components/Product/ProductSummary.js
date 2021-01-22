import React, { useState } from "react";
import styled from "styled-components";
import { WishListIcon } from "../../images/icons";
import colors from "../Reusable/Colors";
import RenderStars from "./RenderStars";
import Button from "../Reusable/Button";

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
    const [priceDiff, setPriceDiff] = useState(0);
    return (
        <ProductSummaryContainer>
            <NameAddWishContainer>
                <ProductName>{title}</ProductName>
                <WishListIcon />
            </NameAddWishContainer>
            <PriceReviewContainer>
                <PriceSoldContainer>
                    <Price>${price + priceDiff}</Price>
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
                <h6>Sizes</h6>
                {sizes &&
                    sizes.map((size, index) => {
                        return (
                            size && (
                                <SizeOption
                                    onClick={() => {
                                        setPriceDiff(+size.price);
                                    }}
                                >
                                    <p>{size.label}</p>
                                </SizeOption>
                            )
                        );
                    })}
            </SizeOptionsContainer>
            <ColourOptions>
                <h6>Colours</h6>
                {colours &&
                    colours.map((colour, index) => {
                        return (
                            <ColourOption>
                                <ColourPreview colour={colour.value} />
                                <p>{colour.label}</p>
                            </ColourOption>
                        );
                    })}
            </ColourOptions>
            <Container>
                <Button primary>Buy Now</Button>
                <Button primary>Add To Cart</Button>
            </Container>
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
    width: 80px;
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
    h6 {
        padding-right: 20px;
    }
`;
const SizeOption = styled.div`
    border: 2px solid ${colors.primary};

    height: 32px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px 0 0;
    padding: 5px 10px;
    cursor: pointer;
    p {
        text-transform: uppercase;
        margin: 0px;
    }
`;

const ColourOptions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
        text-transform: uppercase;
        margin: 0px;
    }
    h6 {
        padding-right: 20px;
    }
`;

const ColourOption = styled.div`
    border: 2px solid ${colors.primary};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    cursor: pointer;
`;

const ColourPreview = styled.div`
    width: 1em;
    height: 1em;
    margin: 0 10px;
    border-radius: 50px;
    background-color: ${(props) => props.colour};
    margin-bottom: 5px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em;
`;
