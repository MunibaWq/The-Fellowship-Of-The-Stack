import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Star } from "../../../images/icons";
import ImageTest from "../../../images/imageTest.png";
import { setChoices } from "../../../redux/actions/ProductPage";
const Item = ({
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
    artist_id,
}) => {
    const choices = useSelector((state) => state.productChoices);
    const [chosen, setChosen] = useState();
    let dispatch = useDispatch();
    return (
        <Container>
            <Column>
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
                    alt={title}
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
                <Row>
                    {Array(num_stars)
                        .fill(0)
                        .map((zero, index) => (
                            <Star key={index} width="18" height="18" />
                        ))}
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
    background: ${(props) => props.theme.blue};
    padding: clamp(16px, 40px, 60px);
    border-radius: 15px;
`;
const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const OtherImages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const MainImage = styled.img`
    height: 600px;
    width: 600px;
    padding: 10px;
    background: ${(props) => props.theme.lightBlue};
`;
const Image = styled.img`
    height: 150px;
    width: 150px;
    padding: 10px;
    cursor: pointer;
    background: ${(props) =>
        props.chosen === true ? props.theme.orange : props.theme.lightBlue};
`;
