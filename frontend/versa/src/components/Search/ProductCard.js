import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../redux/actions";
import { Link } from "react-router-dom";
// import { Image, ImageCard, ProductInfo } from "../Reusable/Card";
// import Card from "../Reusable/Card";
import ItemCard from "../Reusable/ItemCard";

let host = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const productSelected = (id) => {
        dispatch(setSelectedProduct(id));
    };

    return (
        <Link to={`/product-item/${product.id}`}>
            {/* <ImageCard>
                <Image>
                    <img
                        onClick={() => {
                            productSelected(product.id);
                        }}
                        alt="product"
                        src={
                            product.image
                                ? `${host}/images/${product.image}`
                                : product.thumbnail
                                ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${product.thumbnail}`
                                : ""
                        }
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
            </ImageCard> */}
            <ItemCard title={product.title} price={product.price}>
                <img
                    style={{
                        width: "100%",
                    }}
                    onClick={() => {
                        productSelected(product.id);
                    }}
                    alt="product"
                    src={
                        product.image
                            ? `${host}/images/${product.image}`
                            : product.thumbnail
                            ? `https://versabucket.s3.us-east-2.amazonaws.com/images/${product.thumbnail}.jpeg`
                            : ""
                    }
                />
            </ItemCard>
        </Link>
    );
};
// const ImageCard = styled.div`
//     margin-bottom: 10%;
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     height: 95%;
// `;
// const ProductInfo = styled.div`
//     height: 100%;
//     background-color: white;
//     border-style: solid;
//     border-top: none;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     div {
//         margin: 0 10px;
//     }
//     h6 {
//         font-size: smaller;
//     }
// `;
// const Image = styled.div`
//     @media (max-width: 414px) {
//         border-style: solid;
//         img {
//             width: 100%;
//             position: relative;
//         }
//     }
// `;
export default ProductCard;
