import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ArtistDetails from "../../../components/Product/ArtistDetails"
import CustomerReviews from "../../../components/Product/CustomerReviewsSection";
import ProductPageImage from "../../../components/Product/ProductPageImage";
import { getProductByID } from '../../../axios/gets'
import ProductData from "../../../components/Product/ProductData";
import { useParams } from "react-router-dom";
const ProductItem = () => {
    const params = useParams();
    const currentProduct = params.id;
    const [productDataState, setProductDataState] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            console.log("ProductData.js currentProduct", currentProduct);
            const data = await getProductByID(currentProduct)
            

            console.log(data);
            setProductDataState(data);
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
    max-width: 425px;
`;
