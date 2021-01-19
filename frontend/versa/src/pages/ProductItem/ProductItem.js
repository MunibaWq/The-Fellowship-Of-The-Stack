import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArtistDetails from "../../components/Product/ArtistDetails";
import CustomerReviews from "../../components/Product/CustomerReviewsSection";
import ProductPageImage from "../../components/Product/ProductPageImage";
import axios from "axios";
import ProductData from "../../components/Product/ProductData";
import { useParams } from "react-router-dom";
import { getImagesByPID } from "../../axios/gets";
let host = process.env.NODE_ENV==='production'? "" : "http://localhost:5000"
const ProductItem = () => {
    // const currentProduct = useSelector((state) => state.selectedProduct)
    const params = useParams();
    const currentProduct = params.id;
    const [productDataState, setProductDataState] = useState([]);
    const [images, setImages]= useState([])
    useEffect(() => {
        const fetchProduct = async () => {
            console.log("ProductData.js currentProduct", currentProduct);
            //add axios to fetch data from API
            const response = await axios.get(
                `${host}+/product/${currentProduct}`
            );

            console.log(response.data);
            setProductDataState(response.data);
        };
        const fetchImages = async () => {
            setImages(getImagesByPID(currentProduct))
        }
        fetchProduct();
        fetchImages();
    }, []);
    console.log("productItem.js", currentProduct);
    return (
        <ProductItemContainer>
            <ProductPageImage images={images} productDataState={productDataState} />
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
