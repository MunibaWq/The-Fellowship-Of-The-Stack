import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../redux/actions";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    
    console.log('loaded')
    const dispatch = useDispatch();
    const productSelected = (id) => {
        console.log('here')
        dispatch(setSelectedProduct(id));
        
    };

    

    return (
        <Link to={`/product-item`}>
        <ImageCard>
            <Image>
                <img
                    onClick={() => {
                        console.log("test");
                        productSelected(product.id);
                        // fetchCurrentProduct(currentProduct);
                    }}
                    alt="product"
                    src={`http://localhost:5000/images/${product.image}`}
                />
            </Image>
            <ProductInfo>
                <div>
                    <h6>{product.title}</h6>
                </div>
                <div>
                    <h6>${product.price}</h6>
                </div>
            </ProductInfo>
        </ImageCard>
    </Link>
    );
};
const ImageCard = styled.div`
    margin-bottom: 10%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height:95%;
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
`;
export default ProductCard;
