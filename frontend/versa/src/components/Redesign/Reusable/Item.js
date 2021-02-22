import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "./Button";
import ImageTest from "../../../images/imageTest.png";
import { setChoices } from "../../../redux/actions/ProductPage";
import { AddIcon, CheckMarkIcon, LineCloseIcon } from "../../../images/icons";
import { addToCart } from "../../../axios/posts";
import Pill from "../../Reusable/Pill";
import Box from "./Box";
import TopBar from "./TopBar";
const Item = ({ product, images }) => {
    const choices = useSelector((state) => state.productChoices);
    const [chosen, setChosen] = useState();
    let dispatch = useDispatch();
    const [clicked, setClicked] = useState();
    console.log(images);
    return (
        <Container>
            <Column>
                <MainImage
                    src={
                        product?.image
                            ? "/images/" + product?.image + ".jpeg"
                            : images && images.length > 0
                            ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${
                                  images[choices.image].filename
                              }.jpeg`
                            : ImageTest
                    }
                    alt={product?.title}
                />
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
                                        dispatch(setChoices("image", index));
                                    }}
                                />
                            );
                        })}
                </OtherImages>
            </Column>
            <Column>
                <h2>{product?.title || "Loading product..."}</h2>
                <h3>
                    ${" "}
                    {product?.price
                        ? +product?.price + +product?.sizes[choices.size].price
                        : 0}
                </h3>
                <p>{product?.description}</p>
                <Row>
                    <h3>Materials:</h3>
                    <p>
                        {product?.materials
                            ? product?.materials
                            : "Loading materials..."}
                    </p>
                </Row>
                {product?.colours && product?.colours.length > 0 && (
                    <Colours>
                        <Row>
                            <h3>Colour:</h3>
                            <p>
                                {product?.colours[choices.colour].label === "O"
                                    ? "One Colour"
                                    : product?.colours[choices.colour].label}
                            </p>
                        </Row>
                        {product?.stock.map((variation) => {
                            if (
                                variation.color ===
                                    product?.colours[choices.colour].label &&
                                variation.size ===
                                    product?.sizes[choices.size].label
                            ) {
                                if (variation.quantity < 3) {
                                    return (
                                        <Pill>
                                            <p>
                                                {variation.quantity + " left"}
                                            </p>
                                        </Pill>
                                    );
                                }
                            }
                            return "";
                        })}

                        <ColourOptions>
                            {product?.colours.map((colour, index) => {
                                return (
                                    <ColourPreview
                                        key={index}
                                        colour={colour.value}
                                        chosen={choices.colour === index}
                                        onClick={() => {
                                            dispatch(
                                                setChoices("colour", index)
                                            );
                                            // setChosenColor(index);
                                        }}
                                    />
                                );
                            })}
                        </ColourOptions>
                    </Colours>
                )}
                {product?.sizes && product?.sizes.length > 0 && (
                    <Sizes>
                        <Row>
                            <h3>Size:</h3>
                            <p>
                                {product?.sizes[choices.size].label === "O"
                                    ? "One Size"
                                    : product?.sizes[choices.size].label}
                            </p>
                        </Row>
                        <SizeOptions>
                            {product?.sizes.map((size, index) => {
                                return (
                                    size && (
                                        <SizeOption
                                            key={index}
                                            chosen={choices.size === index}
                                            onClick={() => {
                                                // setPriceDiff(+size.price);
                                                dispatch(
                                                    setChoices("size", index)
                                                );
                                                // setChosenSize(index);
                                            }}>
                                            <p>{size.label}</p>
                                        </SizeOption>
                                    )
                                );
                            })}
                        </SizeOptions>
                    </Sizes>
                )}

                {product?.sizes &&
                    product?.sizes.length > 0 &&
                    product?.colours &&
                    product?.colours.length > 0 && (
                        <ClearSelection
                            tertiary
                            onClick={() => {
                                dispatch(setChoices("size", 0));
                                dispatch(setChoices("color", 0));
                                // setChosenColor(0);
                                // setChosenSize(0);
                                // setPriceDiff(0);
                            }}>
                            <LineCloseIcon width="18" height="18" />
                            Clear Selection
                        </ClearSelection>
                    )}
                <Row>
                    <AddToCart
                        clicked={clicked}
                        onClick={() => {
                            setClicked((curr) => !curr);
                            addToCart(
                                product?.id,
                                product?.colours[choices.colour].label,
                                product?.sizes[choices.size].label,
                                1,
                                window.localStorage.getItem("session")
                            );
                            setTimeout(() => {
                                setClicked((curr) => !curr);
                            }, 1000);
                        }}>
                        {clicked ? (
                            <CheckMarkIcon height="18px" />
                        ) : (
                            <AddIcon height="18px" />
                        )}
                    </AddToCart>
                </Row>
            </Column>
        </Container>
    );
};

export default Item;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    background: ${(props) => props.theme.blue};
    padding: clamp(16px, 40px, 60px);
    border-radius: 15px;
`;
const Column = styled.div`
    :nth-of-type(2) {
        margin-left: 16px;
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h3 {
        color: ${(props) => props.theme.purple};
        margin-bottom: 16px;
    }
    p {
        margin-bottom: 16px;
    }
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: fit-content;
    h3 {
        font-size: 0.9em;
        text-transform: uppercase;
        font-weight: 700;
        color: ${(props) => props.theme.lightBlack};
        margin-right: 8px;
    }
    p {
        padding: 0;
        font-size: 1em;
    }
`;

const OtherImages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const MainImage = styled.img`
    height: clamp(250px, 600px, 800px);
    height: clamp(250px, 600px, 800px);
    padding: 10px;
    background: ${(props) => props.theme.lightBlue};
`;
const Image = styled.img`
    height: clamp(100px, 120px, 200px);
    width: clamp(100px, 120px, 200px);
    padding: 10px;
    cursor: pointer;
    background: ${(props) =>
        props.chosen === true ? props.theme.orange : props.theme.lightBlue};
`;

const ClearSelection = styled(Button)`
    color: ${(props) => props.theme.lightPurple};
    align-items: center;
    margin-bottom: 1em;
    svg {
        path {
            stroke: ${(props) => props.theme.lightPurple};
        }
    }
`;

const Colours = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em 0;
    h3 {
        font-size: 1em;
        text-transform: uppercase;
        font-weight: 700;
        color: ${(props) => props.theme.lightBlack};
    }
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
    border: 3px solid
        ${(props) =>
            props.chosen ? props.theme.purple : props.theme.lightPurple};
    border-radius: 15px;
    background-color: ${(props) => props.colour};
    cursor: pointer;
    :hover,
    :focus,
    :active {
        border: 3px solid ${(props) => props.theme.purple};
        outline: none;
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
        font-size: 1em;
        text-transform: uppercase;
        font-weight: 700;
        color: ${(props) => props.theme.lightBlack};
    }
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
        ${(props) =>
            props.chosen ? props.theme.purple : props.theme.lightPurple};
    background-color: ${(props) => props.theme.lightBlack};
    height: 2em;
    width: 2em;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px 0 0;
    padding: 20px;
    cursor: pointer;
    :hover,
    :focus {
        border: 3px solid ${(props) => props.theme.purple};
        outline: none;
        transition: 0.1s ease;
        transform: scale(1.05);
    }
    :active {
        border: 3px solid ${(props) => props.theme.purple};
        transition: 0.1s ease;
        transform: scale(1.05);
    }
    p {
        text-transform: uppercase;
        margin: 0px;
        color: ${(props) => props.theme.lightBlue};
    }
`;

const Message = styled.textarea`
    resize: none;
    width: 100%;
    height: 100%;
    margin: 5px;
`;
const AddToCart = styled(Button)`
    ::after {
        content: " ${(props) =>
            props.clicked ? "Added Item" : "Add to Cart"}";
    }
`;
const Send = styled.div``;
const Question = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;
