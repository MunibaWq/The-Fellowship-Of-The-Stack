import React from "react";
import styled from "styled-components";
import { Circle } from "../../images/icons";

const index = () => {
    return (
        <ImageButtonContainer>
            <img src="../../images/imageTest.png" alt="prudct-image" />
            <BackToResults>
                <h6>Back to results</h6>
            </BackToResults>
            <Badge>New</Badge>
            <ImagePagination>
                <Circle />
            </ImagePagination>
        </ImageButtonContainer>
    );
};

export default index;

const ImageButtonContainer = styled.div`
    height: ;
`;
const BackToResults = styled.div``;
const Badge = styled.div``;
const ImagePagination = styled.div``;
