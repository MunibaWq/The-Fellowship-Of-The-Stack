import React, { useState } from "react";
import styled from "styled-components";
import Icons from "../Reusable/Icons";

const VariationsList = (props, variation, colors, sizes, images) => {
    const [checkDelete, setCheckDelete] = useState(false);

    function deleteItem(index, arr) {
        arr.splice(index, 1);
        localStorage.setItem(`product${arr}`, JSON.stringify(arr));
        setCheckDelete(!checkDelete);
    }

    variation.length > 0 &&
        
    switch (variation) {
        case "colors":

    }
            {colors.length > 0 &&
                colors.map((label, index) => {
                    return (
                        <CurrentColour>
                            <ColourPreview
                                colour={colors.label.value}
                            />
                            <p>{colors.label.label}</p>
                            <div
                                onClick={() =>
                                    deleteItem(index, colors)
                                }
                            >
                                <Icons lineClose />
                            </div>
                        </CurrentColour>
                        );
                })}
            
        }
    }

    

    switch (props.variation) {
        case "colour":
            {
                        

        case "size":
            return (
                <Container>
                    {sizes.length > 0 &&
                        sizes.map((size, index) => {
                            return (
                                <NewSize>
                                    <p>{size.label}</p>

                                    <NewSizePrice>$ {size.price}</NewSizePrice>
                                    <div
                                        onClick={() => deleteItem(index, sizes)}
                                    >
                                        <Icons lineClose />
                                    </div>
                                </NewSize>
                            );
                        })}
                </Container>
            );
        case "images":
            return (
                <Container>
                    {images.map((image, index) => {
                        return (
                            <>
                                <UploadedImage
                                    key={index}
                                    alt="product"
                                    src={image.image}
                                />
                            </>
                        );
                    })}
                </Container>
            );
        default:
            return <></>;
    }
};

export default VariationsList;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0px;
`;

const CurrentColour = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: #c5c3ff;
    margin: 8px;
    p {
        margin-right: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;

const ColourPreview = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.colour};
`;

const NewSize = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: #c5c3ff;
    margin: 8px;

    p {
        margin-right: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;

const NewSizePrice = styled.p`
    margin-right: 10px;
`;

const UploadedImage = styled.img`
    width: 200px;
    height: 200px;
`;
