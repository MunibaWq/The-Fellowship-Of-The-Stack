import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductPageImage from "../../components/Product/ProductPageImage";
import { getProductByID } from "../../axios/gets";
import { useParams } from "react-router-dom";
import { getImagesByPID } from "../../axios/gets";
import ProductSummary from "../../components/Product/ProductSummary";
import ProductDetails from "../../components/Product/ProductDetails";
import ProductPage from "../../components/Product/ProductPage";

const ProductItem = () => {
    const params = useParams();
    const currentProduct = params.id;
    const [productDataState, setProductDataState] = useState([]);
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductByID(currentProduct);

            setProductDataState(data);
        };
        const fetchImages = async () => {
            let response = await getImagesByPID(currentProduct);
            setImages(response);
        };
        fetchProduct();
        fetchImages();
    }, [currentProduct]);
    return (
        <ProductItemContainer>
            <ProductPageImage
                images={images}
                productDataState={productDataState}
            />

            <ProductSummary {...productDataState} />
            <ProductDetails {...productDataState} />
            <ProductPage {...productDataState} />
        </ProductItemContainer>
    );
};

export default ProductItem;

const ProductItemContainer = styled.div``;
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
