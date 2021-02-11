import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../Reusable/Button";
import Pill from "../Reusable/Pill";
import { Link, useParams } from "react-router-dom";
import theme from "../Reusable/Colors";
import { LeftIcon, Star, LineCloseIcon, EditIcon } from "../../images/icons";
import ImageTest from "../../images/imageTest.png";
import { useDispatch, useSelector } from "react-redux";
import { clearChoices, setChoices } from "../../redux/actions/ProductPage";
import { setRedirect } from "../../redux/actions/Redirects";
import { addToCart } from "../../redux/actions/Cart";

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
    stock,
    id,
}) => {
    const choices = useSelector(state => state.productChoices);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    let params = useParams();
    useEffect(
        () => {
            dispatch(setRedirect("productForm", ""));
            return () => {
                dispatch(clearChoices());
            };
        },

        [dispatch]
    );
    const showProductTotal = () => {
        return Object.keys(cart[id]).reduce(
            (colourTotal, currColour, cIndex) => {
                colourTotal =
                    colourTotal +
                    Object.keys(cart[id][currColour]).reduce(
                        (sizeTotal, currSize, sIndex) => {
                            sizeTotal += cart[id][currColour][currSize];
                            return sizeTotal;
                        },
                        0
                    );
                return colourTotal;
            },
            0
        );
    };
    return (
        <Container>
            <Link to="/">
                <Button>
                    <LeftIcon stroke={theme.primary} />
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
                                    ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${
                                          images[choices.image].filename
                                      }.jpeg`
                                    : ImageTest
                        }
                        alt={"image"}
                    />
                    <OtherImages>
                        {images &&
                            images.length > 0 &&
                            images.map((image, index) => {
                                return (
                                    <Image
                                        key={index}
                                        src={`https://versabucket.s3.us-east-2.amazonaws.com/images/${
                                            image.filename
                                        }.jpeg`}
                                        alt="image"
                                        onClick={() => {
                                            dispatch(
                                                setChoices("image", index)
                                            );
                                            // setChosenImage(index);
                                        }}
                                    />
                                );
                            })}
                    </OtherImages>
                </ProductImages>

                <ProductDetail>
                    <h1>
                        {title ? title + "  " : "Loading Product  "}
                        <Link to={"/products/edit/" + params.id}>
                            <EditIcon stroke={theme.primary} />
                        </Link>
                    </h1>

                    <Stars>
                        {Array(num_stars)
                            .fill(0)
                            .map((zero, index) => (
                                <Star key={index} width="18" height="18" />
                            ))}
                    </Stars>

                    <h2>${price ? +price + +sizes[choices.size].price : 0}</h2>
                    {colours &&
                        colours.length > 0 && (
                            <Colours>
                                <SelectedColour>
                                    <h3>Colour:</h3>
                                    <h4>
                                        {colours[choices.colour].label === "O"
                                            ? "One Colour"
                                            : colours[choices.colour].label}
                                    </h4>
                                    {stock.map(variation => {
                                        if (
                                            variation.color ===
                                                colours[choices.colour].label &&
                                            variation.size ===
                                                sizes[choices.size].label
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
                                </SelectedColour>
                                <ColourOptions>
                                    {colours.map((colour, index) => {
                                        return (
                                            <ColourPreview
                                                key={index}
                                                colour={colour.value}
                                                chosen={
                                                    choices.colour === index
                                                }
                                                onClick={() => {
                                                    dispatch(
                                                        setChoices(
                                                            "colour",
                                                            index
                                                        )
                                                    );
                                                    // setChosenColor(index);
                                                }}
                                            />
                                        );
                                    })}
                                </ColourOptions>
                            </Colours>
                        )}
                    {sizes &&
                        sizes.length > 0 && (
                            <Sizes>
                                <SelectedSize>
                                    <h3>Size:</h3>
                                    <h4>
                                        {sizes[choices.size].label === "O"
                                            ? "One Size"
                                            : sizes[choices.size].label}
                                    </h4>
                                </SelectedSize>
                                <SizeOptions>
                                    {sizes.map((size, index) => {
                                        return (
                                            size && (
                                                <SizeOption
                                                    key={index}
                                                    chosen={
                                                        choices.size === index
                                                    }
                                                    onClick={() => {
                                                        // setPriceDiff(+size.price);
                                                        dispatch(
                                                            setChoices(
                                                                "size",
                                                                index
                                                            )
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
                    {sizes &&
                        sizes.length > 0 &&
                        colours &&
                        colours.length > 0 && (
                            <ClearSelection
                                onClick={() => {
                                    dispatch(setChoices("size", 0));
                                    dispatch(setChoices("color", 0));
                                    // setChosenColor(0);
                                    // setChosenSize(0);
                                    // setPriceDiff(0);
                                }}>
                                <LineCloseIcon
                                    stroke={theme.primary}
                                    width="26"
                                    height="26"
                                />
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

                    <Button
                        primary
                        onClick={() => {
                            dispatch(
                                addToCart(
                                    id,
                                    colours[choices.colour].label,
                                    sizes[choices.size].label,
                                    1
                                )
                            );
                        }}>
                        Add to Cart
                    </Button>

                    {cart && cart[id] && "In your cart: " + showProductTotal()}
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
        color: ${theme.primary};
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
    border: ${props =>
        props.chosen
            ? `3px solid ${theme.primaryHover}`
            : `3px solid rgba(68, 68, 68, 0.2)`};
    border-radius: 50px;
    background-color: ${props => props.colour};
    cursor: pointer;
    :hover,
    :focus {
        border: 3px solid ${theme.primaryHover};
        outline: none;
        transition: 0.1s ease;
        transform: scale(1.05);
    }
    :active {
        border: 3px solid ${theme.primaryHover};
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
        ${props => (props.chosen ? theme.primaryHover : theme.secondary)};
    background-color: ${theme.tertiary};
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
        border: 3px solid ${theme.primaryHover};
        outline: none;
        transition: 0.1s ease;
        transform: scale(1.05);
    }
    :active {
        border: 3px solid ${theme.primaryHover};
        transition: 0.1s ease;
        transform: scale(1.05);
    }
    p {
        text-transform: uppercase;
        margin: 0px;
        color: ${theme.secondary};
    }
`;

const ClearSelection = styled(Button)`
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
`;
