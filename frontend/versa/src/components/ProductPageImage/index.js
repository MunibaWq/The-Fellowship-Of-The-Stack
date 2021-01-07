import React from "react";
import styled from "styled-components";
import { Circle } from "../../images/icons";
import Image from "../../images/imageTest.png";

const index = () => {
    return (
        <ImageButtonContainer>
            <img src={Image} alt="pruduct-image" />
            <BackToResults>
                <h6>Back to results</h6>
            </BackToResults>
            <Badge>New</Badge>
            <ImagePagination>
                <Circle />
                <Circle />
                <Circle />
            </ImagePagination>
        </ImageButtonContainer>
    );
};

export default index;

const ImageButtonContainer = styled.div`
    @media (max-width: 414px) {
        position: relative;
        width: 414px;
        height: 550px;
        img {
            height: 560px;
            width: 100%;
        }
    }
`;
const BackToResults = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: 20px;
    top: 20px;
    h6 {
        border-bottom: 3px solid #444444;
    }
`;
const Badge = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: calc (100% - 20px);
    bottom: 20px;
    background: #ffffff;
    border-radius: 50px;
`;
const ImagePagination = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: absolute;
    right: 20px;
    bottom: 20px;

    svg {
        padding-right: 5px;
    }
`;
