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
    img {
        height: 560px;
        width: 100%;
    }
`;
const BackToResults = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    position: absolute;
    width: 174px;
    height: 32px;
    left: 21px;
    top: 15px;
    h6 {
        border-bottom: 3px solid #444444;
    }
`;
const Badge = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    position: absolute;
    width: 49px;
    height: 32px;
    left: 8px;
    top: 507px;
    background: #ffffff;
    border-radius: 50px;
`;
const ImagePagination = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    position: absolute;
    width: 65px;
    height: 15px;
    left: 334px;
    top: 523px;

    svg {
        padding-right: 5px;
    }
`;
