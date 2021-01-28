import React from "react";
import colors from "../Reusable/Colors";
import { VersaIcon } from "../../images/icons";
import styled, { keyframes } from "styled-components";
const Loading = () => {
    return (
        <Styles>
            <StyledLogo>
                <VersaIcon
                    width="100px"
                    height="100px"
                    triangleFill={colors.logoTriangle}
                    circleFill={colors.logoCircle}
                    rectFill={colors.logoRect}
                    textFill={colors.logoText}
                    triangleStroke="none"
                    circleStroke="none"
                    rectStroke="none"
                    textStroke={colors.logoText}
                    paddingBottom="100px"
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
