import React, { useState } from "react";
import styled from "styled-components";
import { EditIcon, WishListIcon } from "../../images/icons";
import colors from "../Reusable/Colors";
import RenderStars from "./RenderStars";
import Button from "../Reusable/Button";
import { Link, useParams } from "react-router-dom";

const ProductSummary = ({
    title,
    price,
    num_stars,
    num_reviews,
    sizes,
    colours,
}) => {
    const [priceDiff, setPriceDiff] = useState(0);
    const [chosenColor, setChosenColor] = useState(0);
    const [chosenSize, setChosenSize] = useState(0);
    let params = useParams();
    return (
        <ProductSummaryContainer>
            <NameAddWishContainer>
                <ProductName>
                    {title + " "}
                    <Link to={"/products/edit/" + params.id}>
                        <EditIcon stroke={"red"} />
                    </Link>
                </ProductName>

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

            {sizes && sizes.length > 0 && (
                <SizeOptionsContainer>
                    <h6>Sizes</h6>

                    {sizes.map((size, index) => {
                        return (
                            size && (
                                <SizeOption
                                    chosen={
                                        chosenSize === index 
                                    }
                                    onClick={() => {
                                        setPriceDiff(+size.price);
                                        setChosenSize(index);
                                    }}
                                >
                                    <p>{size.label}</p>
                                </SizeOption>
                            )
                        );
                    })}
                </SizeOptionsContainer>
            )}
            {colours && colours.length > 0 && (
                <ColourOptions>
                    <h6>Colours</h6>
                    {colours.map((colour, index) => {
                        return (
                            <ColourOption
                                chosen={chosenColor === index}
                                onClick={() => {
                                    setChosenColor(index);
                                }}
                            >
                                <ColourPreview colour={colour.value} />
                                <p>{colour.label}</p>
                            </ColourOption>
                        );
                    })}
                </ColourOptions>
            )}
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
    width: 100vw;
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
    border: 2px solid ${(props) => (props.chosen ? colors.primaryHover : colors.primary)};
    background-color: ${(props) =>
        props.chosen ? colors.primary : colors.secondary};
    
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
        color: ${props=>props.chosen ? colors.secondary: colors.tertiary};
    }
    /* &:active {
        background-color: ${colors.primaryHover};
        border: 2px solid ${colors.primaryHover};
        color: ${colors.secondary};
    } */
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
    border: 2px solid ${(props) => (props.chosen ? colors.primaryHover : colors.primary)};
    background-color: ${(props) =>
        props.chosen ? colors.primary : colors.secondary};
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    /* &:active {
        background-color: ${colors.primaryHover};
        border: 2px solid ${colors.primaryHover};
        color: ${colors.secondary};
    } */
    p {
        color: ${props=>props.chosen ? colors.secondary: colors.tertiary};
    }
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
