import styled, { css } from "styled-components";

export const Title = styled.h1`
    margin-top: 30px;
    font-size: 72px;
    text-align: center;
    @media (max-width: 760px) {
        font-size: 50px;
    }
    @media (max-width: 380px) {
        font-size: 40px;
    }
    ${(props) =>
        props.subHeading &&
        css`
            margin-top: 30px;
            font-size: 48px;
            @media (max-width: 760px) {
                font-size: 30px;
            }
            @media (max-width: 380px) {
                font-size: 24px;
            }
        `}
`;
