import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductPageImage from "../../../components/Product/ProductPageImage";
import { getProductByID } from "../../../axios/gets";
import ProductData from "../../../components/Product/ProductData";
import { useParams } from "react-router-dom";
import { getImagesByPID } from "../../../axios/gets";
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
            <Container>
                <ProductData productDataState={productDataState} />
            </Container>
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
