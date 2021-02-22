import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "./Button";
import ImageTest from "../../../images/imageTest.png";
import { setChoices } from "../../../redux/actions/ProductPage";
import { AddIcon, CheckMarkIcon, LineCloseIcon } from "../../../images/icons";
import { addToCart } from "../../../axios/posts";
import Pill from "../../Reusable/Pill";
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
                <h1>{product?.title || "Loading product..."}</h1>
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
                            {product?.stock.map((variation) => {
                                if (
                                    variation.color ===
                                        product?.colours[choices.colour]
                                            .label &&
                                    variation.size ===
                                        product?.sizes[choices.size].label
                                ) {
                                    if (variation.quantity < 3) {
                                        return (
                                            <Pill>
                                                <p>
                                                    {variation.quantity +
                                                        " left"}
                                                </p>
                                            </Pill>
                                        );
                                    }
                                }
                                return "";
                            })}
                        </Row>
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
                        <SelectedSize>
                            <h3>Size:</h3>
                            <p>
                                {product?.sizes[choices.size].label === "O"
                                    ? "One Size"
                                    : product?.sizes[choices.size].label}
                            </p>
                        </SelectedSize>
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
                <Row>
                    <span>
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
                    </span>
                    <span>
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
                    </span>
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
        margin-left: 30px;
    }

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    h1 {
        margin-bottom: 16px;
        padding: 0;
    }
    h3 {
        color: ${(props) => props.theme.purple};
        margin-bottom: 16px;

        ::after {
            content: " ";
        }
    }
    p {
        margin-bottom: 16px;
    }
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    height: fit-content;
    h3 {
        font-size: 1em;
        text-transform: uppercase;
        font-weight: 700;
        color: ${(props) => props.theme.lightBlack};
    }
    p {
        padding: 0;
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

const WishButton = styled.div`
    flex-direction: column;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    :hover,
    :focus,
    :active {
        transform: scale(1.05);
        outline: none;
    }
    p {
        font-size: 0.5em;
    }

    svg {
        path {
            fill: ${(props) =>
                props.clicked ? props.theme.lightPurple : "transparent"};
            stroke: ${(props) =>
                props.clicked
                    ? props.theme.lightPurple
                    : props.theme.lightBlack};
        }
    }
`;

const ClearSelection = styled(Button)`
    color: ${(props) => props.theme.lightPurple};
    align-items: center;
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

const SelectedColour = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    h4 {
        margin-right: 8px;
    }
    align-items: flex-start;
    div {
        background-color: red;
        margin-top: -3px;
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
    border: ${(props) =>
        props.chosen
            ? `3px solid ${(props) => props.theme.holo}`
            : `3px solid rgba(68, 68, 68, 0.2)`};
    border-radius: 50px;
    background-color: ${(props) => props.colour};
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
`;

const Materials = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em 0;
    h3 {
        margin-bottom: 0.8em;
        font-size: 1em;
        text-transform: uppercase;
        font-weight: 700;
        color: ${(props) => props.theme.lightBlack};
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
        ${(props) =>
            props.chosen ? props.theme.lightPurple : props.theme.purple};
    background-color: ${(props) => props.theme.lightBlack};
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
