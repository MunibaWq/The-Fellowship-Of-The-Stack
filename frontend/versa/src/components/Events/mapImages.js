import React from "react";
import styled from "styled-components";
import { deleteEventImage } from "../../axios/deletes";
import { LineCloseIcon } from "../../images/icons";
import { setImages } from "../../redux/actions/Images";
import theme from "../Reusable/Colors";
const { UploadedImage, Radio } = require("../ProductForm/styledComponents");
export let thumbImg = 0;

export function mapImages(images, dispatch) {
    return images.map((image, index) => {
        return (
            <div>
                <UploadedImage key={index} alt="" src={image.image} />
                <DeleteImage
                    onClick={() => {
                        console.log("hello");
                        if (image.id) {
                            deleteEventImage(image.id);
                        }
                        let newImages = images.filter((i, ind) => {
                            return ind !== index;
                        });
                        console.log(newImages, images);

                        dispatch(setImages("eventForm", newImages));
                    }}>
                    <LineCloseIcon stroke={theme.primary} />
                </DeleteImage>
                <Radio>
                    <label htmlFor={"thumb" + index}>
                        <input
                            type="radio"
                            id={"thumb" + index}
                            name="chosenOne"
                            onClick={() => {
                                thumbImg = index;
                            }}
                        />
                        Use as thumbnail image
                    </label>
                </Radio>
            </div>
        );
    });
}

const DeleteImage = styled.div``;
