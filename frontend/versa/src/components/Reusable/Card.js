import styled, { css } from "styled-components";
import Button from "./Button";
// import { H1, H2, H3, H4, H5, H6 } from "./Text";

const CardWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 500px;
    padding: 3rem 0 2rem;
    border-radius: 20px 20px 0 0;
    color: white;
    @media (max-width: 376px) {
        /* @media (max-width: 375px screen) { */
        /* font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 800;
        font-size: 23.51px;
        line-height: 106%;
        or 25px */
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px 10px 0 0;
    }
`;

const ImageCard = styled.img`
    width: 100%;
    height: 100px;
    background-color: chartreuse;

    /* letter-spacing: -0.2px; */
`;

export const CardTextMain = styled.h6`
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 112%;
    /* or 13px */
    letter-spacing: 1.6px;
    text-transform: uppercase;
    margin-bottom: 8px;
    @media (max-width: 990px) {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 18.51px;
        line-height: 106%;
        /* or 25px */
        margin-bottom: 3px;
        letter-spacing: -0.2px;
    }
`;
export const CardTextSub = styled.h6`
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 112%;
    /* or 13px */
    letter-spacing: 1.6px;
    text-transform: uppercase;
    margin-bottom: 8px;
    @media (max-width: 990px) {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 800;
        font-size: 18.51px;
        line-height: 106%;
        /* or 25px */
        margin-bottom: 16px;
        padding-left: 1px;
        letter-spacing: -0.2px;
    }
`;

const Card = () => {
    return (
        <CardWrapper>
            <img src={process.env.PUBLIC_URL + "imageTest.png"} />

            <div>
                <CardTextMain>Title</CardTextMain>
                <CardTextSub>$14.00</CardTextSub>
            </div>
        </CardWrapper>
    );
};

export default Card;
