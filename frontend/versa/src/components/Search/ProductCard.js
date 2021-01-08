import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSelectedProduct, setPage } from "../../redux/actions";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const productSelected = (id) => {
        dispatch(setSelectedProduct(id));
        dispatch(setPage("ProductItem"));
    };
    return (
        <ImageCard>
            <Image>
                <img onClick={() => {
                    console.log('test')
                    productSelected(product.id);
                } }alt = "product"src={`http://localhost:5000/images/${product.image}`} />
            </Image>
            <ProductInfo>
                <div>
                    <h6>{product.title}</h6>
                </div>
                <div><h6>${product.price}</h6></div>
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
        margin: 0 10px;
    }
    h6 {
        font-size:smaller;
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
