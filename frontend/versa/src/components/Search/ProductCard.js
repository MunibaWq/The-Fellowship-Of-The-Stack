import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSelectedProduct, setPage } from "../../redux/actions";

import { useSelector } from "react-redux";
import ProductItem from "../../pages/ProductItem/ProductItem";
import { Link, Route, Switch } from "react-router-dom";

const ProductCard = ({ product }) => {
    const currentProduct = useSelector((state) => state.selectedProduct);

    const dispatch = useDispatch();
    const productSelected = (id) => {
        dispatch(setSelectedProduct(id));
        dispatch(setPage("ProductItem"));
        fetchCurrentProduct();
    };
    const fetchCurrentProduct = () => {
        console.log(`go to current product`, currentProduct);

        <Route path="product-item">
            <ProductItem currentProduct={currentProduct} />
        </Route>;
    };

    return (
        <ImageCard>
            <Image>
                <img
                    onClick={() => {
                        console.log("test");
                        productSelected(product.id);
                        fetchCurrentProduct(currentProduct);
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
