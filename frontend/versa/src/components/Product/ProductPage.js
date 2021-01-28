import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Reusable/Button";
import { Link, useParams } from "react-router-dom";
import colors from "../Reusable/Colors";
import { LeftIcon, Star, DeleteIcon, EditIcon } from "../../images/icons";
import ImageTest from "../../images/imageTest.png";

const ProductPage = ({
    images,
    title,
    price,
    materials,
    colours,
    sizes,
    description,
    num_stars,
    image,
}) => {
    const [priceDiff, setPriceDiff] = useState(0);
    const [chosenColor, setChosenColor] = useState(0);
    const [chosenSize, setChosenSize] = useState(0);
    const [chosenImage, setChosenImage] = useState(0);
    let params = useParams();
    return (
        <Container>
            <Link to="/">
                <Button>
                    <LeftIcon stroke={colors.primary} />
                    Back to Search
                </Button>
            </Link>
            <MainInfo>
                <ProductImages>
                    <MainImage
                        src={
                            image
                                ? "/images/" + image + ".jpeg"
                                : images && images.length > 0
                                ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${images[chosenImage].filename}.jpeg`
                                : ImageTest
                        }
                        alt={"image"}
                    ></MainImage>
                    <OtherImages>
                        {images &&
                            images.length > 0 &&
                            images.map((image, index) => {
                                return (
                                    <Image
                                        key={index}
                                        src={`https://versabucket.s3.us-east-2.amazonaws.com/images/${image.filename}.jpeg`}
                                        alt="image"
                                        onClick={() => {
                                            setChosenImage(index);
                                        }}
                                    ></Image>
                                );
                            })}
                    </OtherImages>
                </ProductImages>

                <ProductDetail>
                   
                    <h1>{title ? (title + "  ") : "Loading Product  "}<Link to={"/products/edit/" + params.id}>
                    <EditIcon stroke={colors.primary} />
                </Link></h1>
                    
                    <Stars>
                    {Array(num_stars)
                        .fill(0)
                        .map((zero, index) => (
                            <Star key={index} width="18" height="18"/>
                        ))}

                    
                </Stars>

                    <h2>${price ? price + priceDiff : 0}</h2>
                    {colours && colours.length > 0 && (
                        <Colours>
                            <SelectedColour>
                                <h3>Colour:</h3>
                                <h4>{colours.label === "O" ? "One Colour" : colours[chosenColor].label}</h4>
                            </SelectedColour>
                            <ColourOptions>
                                {colours.map((colour, index) => {
                                    return (
                                        <ColourPreview
                                            key={index}
                                            colour={colour.value}
                                            chosen={chosenColor === index}
                                            onClick={() => {
                                                setChosenColor(index);
                                            }}
                                        />
                                    );
                                })}
                            </ColourOptions>
                        </Colours>
                    )}
                    {sizes && sizes.length > 0 && (
                        <Sizes>
                            <SelectedSize>
                                <h3>Size:</h3>
                                <h4>
                                    {sizes[chosenSize].label === "O"
                                        ? "One Size"
                                        : sizes[chosenSize].label}
                                </h4>
                            </SelectedSize>
                            <SizeOptions>
                                {sizes.map((size, index) => {
                                    return (
                                        size && (
                                            <SizeOption
                                                key={index}
                                                chosen={chosenSize === index}
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
                            </SizeOptions>
                        </Sizes>
                    )}
                    {sizes &&
                        sizes.length > 0 &&
                        colours &&
                        colours.length > 0 && (
                            <ClearSelection
                                onClick={() => {
                                    setChosenColor(0);
                                    setChosenSize(0);
                                    setPriceDiff(0);
                                }}
                            >
                                <DeleteIcon stroke={colors.primary} />
                                Clear Selection
                            </ClearSelection>
                        )}
                    <Description>
                        <h3>Description</h3>
                        <p>
                            {description
                                ? description
                                : "Loading description..."}
                        </p>
                    </Description>
                    <Materials>
                        <h3>Materials</h3>
                        <p>{materials ? materials : "Loading materials..."}</p>
                    </Materials>

                    <Button primary>Add to Cart</Button>
                </ProductDetail>
            </MainInfo>
        </Container>
    );
};

export default ProductPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0;
    h3 {
        font-weight: 700;
    }
`;

const MainInfo = styled.div`
    display: flex;
    margin: 40px;
    flex-direction: row;
    justify-content: flex-start;
    @media (max-width: 1000px) {
        flex-wrap: wrap;
        margin: 20px;
        justify-content: center;
    }
`;

const ProductImages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 20px;
    @media (max-width: 1000px) {
        flex-wrap: wrap;
        flex-direction: column;
        margin: 10px;
    }
`;

const OtherImages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 300px;
    margin: 5px;
    @media (max-width: 1000px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    @media (max-width: 380px) {
        flex-wrap: wrap;
        justify-content: center;

        width: 85vw;
    }
`;

const Image = styled.img`
    width: 65px;
    height: 65px;
    margin: 10px;
    padding: 5px;
    border: 2px solid rgba(68, 68, 68, 0.1);

    cursor: pointer;
    @media (max-width: 1000px) {
        width: 50px;
        height: 50px;
        margin: 5px;
    }
`;

const MainImage = styled.img`
    width: 600px;
    height: 600px;
    margin: 10px;
    border: 2px solid rgba(68, 68, 68, 0.1);
    padding: 1em;

    @media (max-width: 1000px) {
        width: 300px;
        height: 300px;
        margin: 5px;
    }
    @media (max-width: 350px) {
        width: 85vw;
    }
`;

const ProductDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 30px 20px;
    h1 {
        font-size: 2em;
        font-weight: 700;
    }
    h2 {
        font-size: 1.5em;
        font-weight: 700;
        color: ${colors.primary};
    }

    h3 {
        margin: 0 1em 1em 0;
    }
    @media (max-width: 1000px) {
        h1 {
            font-size: 1.5em;
        }
        h2 {
            font-size: 1em;
        }
        h3 {
            margin: 0 0.5em 0.5em 0;
        }
    }
`;

const Stars = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 0 1em 0;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em 0;
    h3 {
        margin-bottom: 0.8em;
    }
`;

const Materials = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em 0;
    h3 {
        margin-bottom: 0.8em;
    }
`;

const Colours = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em 0;
    h3 {
        margin-bottom: 0.8em;
    }
`;

const SelectedColour = styled.div`
    display: flex;
    flex-direction: row;
`;

const ColourOptions = styled.div`
    display: flex;
    flex-direction: row;
`;

const ColourPreview = styled.button.attrs({
    tabindex: "0",
    type: "button",
})`
    width: 2em;
    height: 2em;
    margin: 0 10px 0 0;
    padding: 20px;
    border: ${(props) =>
        props.chosen
            ? `3px solid ${colors.primaryHover}`
            : `3px solid rgba(68, 68, 68, 0.2)`};
    border-radius: 50px;
    background-color: ${(props) => props.colour};
    cursor: pointer;
    :hover,
    :focus {
        border: 3px solid ${colors.primaryHover};
        outline: none;
        transition: 0.1s ease;
        transform: scale(1.05);
    }
    :active {
        border: 3px solid ${colors.primaryHover};
        transition: 0.1s ease;
        transform: scale(1.05);
    }
`;

const Sizes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1.5em 0;
    h3 {
        margin-bottom: 0.8em;
    }
`;

const SelectedSize = styled.div`
    display: flex;
    flex-direction: row;
`;

const SizeOptions = styled.div`
    display: flex;
    flex-direction: row;
`;

const SizeOption = styled.button.attrs({
    tabindex: "0",
    type: "button",
})`
    border: 3px solid
        ${(props) => (props.chosen ? colors.primaryHover : colors.secondary)};
    background-color: ${colors.tertiary};
    height: 2em;
    width: 2em;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px 0 0;
    padding: 20px;
    cursor: pointer;
    :hover,
    :focus {
        border: 3px solid ${colors.primaryHover};
        outline: none;
        transition: 0.1s ease;
        transform: scale(1.05);
    }
    :active {
        border: 3px solid ${colors.primaryHover};
        transition: 0.1s ease;
        transform: scale(1.05);
    }
    p {
        text-transform: uppercase;
        margin: 0px;
        color: ${colors.secondary};
    }
`;

const ClearSelection = styled(Button)`
    padding: 0;
    margin: 0;
`;
