import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Reusable/Button";
import left from "../../images/left.svg";
import { Link } from "react-router-dom";
import colors from "../Reusable/Colors";

let host = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const ProductPage = ({
    images,
    title,
    price,
    materials,
    colours,
    sizes,
    description,
    num_stars,
    productDataState,
}) => {
    const [priceDiff, setPriceDiff] = useState(0);

    return (
        <Container>
            <MainInfo>
                {images && images.length > 0 && (
                    <ProductImages>
                        <OtherImages>
                            <Image></Image>
                        </OtherImages>
                        <MainImage></MainImage>
                    </ProductImages>
                )}
                <ProductDetail>
                    <BackStars>
                        <Link to="/">
                            <Button>
                                <img src={left} alt="back-icon" />
                                Back to Search
                            </Button>
                        </Link>
                        <Stars></Stars>
                    </BackStars>
                    <h1> {title + " "}</h1>
                    <h2>${price + priceDiff}</h2>
                    <Description>
                        <h3>Description</h3>
                        <p>{description}</p>
                    </Description>
                    <Materials>
                        <h3>Materials</h3>
                        <p>{materials}</p>
                    </Materials>
                    {colours && colours.length > 0 && (
                        <Colours>
                            <SelectedColour>
                                <h3>Colour:</h3>
                                <h4>Selected Colour</h4>
                            </SelectedColour>
                            <ColourOptions>
                                {colours.map((colour) => {
                                    return (
                                        <ColourPreview colour={colour.value} />
                                    );
                                })}
                            </ColourOptions>
                        </Colours>
                    )}
                    {sizes && sizes.length > 0 && (
                        <Sizes>
                            <SelectedSize>
                                <h3>Size:</h3>
                                <h4>Selected Size</h4>
                            </SelectedSize>

                            {sizes.map((size) => {
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
                        </Sizes>
                    )}
                </ProductDetail>
            </MainInfo>
            <Button>Clear Selection</Button>
            <Button primary>Add to Cart</Button>
        </Container>
    );
};

export default ProductPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const ProductImages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const OtherImages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Image = styled.img`
    width: 65px;
    height: 65px;
`;

const MainImage = styled.img`
    width: 200px;
    height: 200px;
`;

const ProductDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const BackStars = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Stars = styled.div`
    display: flex;
    flex-direction: row;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
`;

const Materials = styled.div`
    display: flex;
    flex-direction: column;
`;

const Colours = styled.div`
    display: flex;
    flex-direction: column;
`;

const SelectedColour = styled.div`
    display: flex;
    flex-direction: row;
`;

const ColourOptions = styled.div`
    display: flex;
    flex-direction: column;
`;

const ColourPreview = styled.div`
    width: 1em;
    height: 1em;
    margin: 0 10px;
    border-radius: 50px;
    background-color: ${(props) => props.colour};
    margin-bottom: 5px;
`;

const Sizes = styled.div`
    display: flex;
    flex-direction: column;
`;

const SelectedSize = styled.div`
    display: flex;
    flex-direction: row;
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
