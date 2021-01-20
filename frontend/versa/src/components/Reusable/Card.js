import styled, { css } from "styled-components";
import Button from "./Button";
// import { H1, H2, H3, H4, H5, H6 } from "./Text";

const CardWrapper = styled.div`
    /* position: relative;
    overflow: hidden;
    width: 500px;
    padding: 3rem 0 2rem;
  
    color: white; */
    margin-bottom: 10%;
    display: flex;
    flex-direction: column;
    border-radius: 20px 20px 0 0;
    width: 50%;
    height: 95%;
    @media (max-width: 600px) {
        /* @media (max-width: 375px screen) { */
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 800;
        font-size: 23.51px;
        line-height: 106%;
        /*or 25px 
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;*/
        border-radius: 10px 10px 0 0;
    }
`;

const ImageCard = styled.div`
width: 100%;
    height: 100%;
    object-fit: cover;
    /* 
    background-color: chartreuse; */

    /* letter-spacing: -0.2px; */
    @media (max-width: 414px) {
   
    img {
        width: 100%;
        position: relative;
    }

`;

const CardTextMain = styled.h6`
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 112%;
    /* or 13px */
    letter-spacing: 1.6px;
    /* text-transform: uppercase; */
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
const CardTextSub = styled.h6`
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

const Card = ({ children, title, price }) => {
    return (
        <CardWrapper>
            <ImageCard>{children}</ImageCard>

            <CardTextMain>{title}</CardTextMain>
            <CardTextSub>${price}</CardTextSub>
        </CardWrapper>
    );
};

export default Card;

/* const ImageCard = styled.div`
    margin-bottom: 10%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 95%;
`; */
/* const ProductInfo = styled.div`
    height: 100%;
    background-color: white;
    border-style: solid;
    border-top: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div {
        margin: 0 10px;
    }
    h6 {
        font-size: smaller;
    }
`;
const Image = styled.div`
    @media (max-width: 414px) {
        border-style: solid;
        img {
            width: 100%;
            position: relative;
        }
    }
`; */
