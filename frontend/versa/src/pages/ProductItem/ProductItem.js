import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArtistDetails from "../../components/Product/ArtistDetails";
import CustomerReviews from "../../components/Product/CustomerReviewsSection";
import ProductPageImage from "../../components/Product/ProductPageImage";
import axios from "axios";
import ProductData from "../../components/Product/ProductData";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ProductItem = () => {
    // const currentProduct = useSelector((state) => state.selectedProduct)
    const params = useParams();
    const currentProduct = params.id;
    const [productDataState, setProductDataState] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            console.log("ProductData.js currentProduct", currentProduct);
            //add axios to fetch data from API
            const response = await axios.get(
                `http://localhost:5000/product/${currentProduct}`
            );

            console.log(response.data);
            setProductDataState(response.data);
        };
        fetchProduct();
    }, []);
    console.log("productItem.js", currentProduct);
    return (
        <ProductItemContainer>
            <ProductPageImage productDataState={productDataState} />
            <ProductData productDataState={productDataState} />
            <ArtistDetails />
            <CustomerReviews />
        </ProductItemContainer>
    );
};

export default ProductItem;

const ProductItemContainer = styled.div`
    max-width: 414px;
`;
