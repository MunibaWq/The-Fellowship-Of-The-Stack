import React from "react";
import styled from "styled-components";
const ProductCard = ({ product }) => {
    return (
        <ImageCard>
            <Image>
                <img src={`http://localhost:5000/images/${product.image}`} />
            </Image>
            <ProductInfo>
                <div>
                    <h6>{product.title}</h6>
                </div>
                <div>{product.price}</div>
            </ProductInfo>
        </ImageCard>
    );
};
const ImageCard = styled.div`
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const ProductInfo = styled.div`
    height: 100%;
    background-color: white;
    border-style: solid;
    border-top: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div {
        margin: 10px;
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
`;
export default ProductCard;
