import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductByID } from "../../axios/gets";
import { useParams } from "react-router-dom";
import { getImagesByPID } from "../../axios/gets";
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
            <ProductPage images={images} {...productDataState} />
        </ProductItemContainer>
    );
};

export default ProductItem;

const ProductItemContainer = styled.div``;

