import React from "react";
import colors from "../Reusable/Colors";
import { ShapesLogo } from "../../images/icons";
import styled, { keyframes } from "styled-components";
const Loading = () => {
    return (
        <Styles>
            <StyledLogo>
            <ShapesLogo
            width="100"
            height="100"
            circle={colors.logoCircle}
            rectangle={colors.logoRect}
            triangle={colors.logoTriangle}
            alt="Versa Logo"
        />
            </StyledLogo>
            <LoadingMessage>Loading...</LoadingMessage>
        </Styles>
    );
};

const Styles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledLogo = styled.div`
    animation: ${rotate} 3s ease-in-out infinite;
    width: 100px;
    height: 100px;
`;

const LoadingMessage = styled.p`
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 30px 0 0 8px;
    font-size: 0.8em;
    font-weight: 700;
`;

export default Loading;
