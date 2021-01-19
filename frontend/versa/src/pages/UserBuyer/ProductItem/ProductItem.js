import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductPageImage from "../../../components/Product/ProductPageImage";
import { getProductByID } from "../../../axios/gets";
import ProductData from "../../../components/Product/ProductData";
import { useParams } from "react-router-dom";
const ProductItem = () => {
    const params = useParams();
    const currentProduct = params.id;
    const [productDataState, setProductDataState] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductByID(currentProduct);

            setProductDataState(data);
        };
        fetchProduct();
    }, []);
    return (
        <ProductItemContainer>
            <ProductPageImage productDataState={productDataState} />
            <ProductData productDataState={productDataState} />
        </ProductItemContainer>
    );
};

export default ProductItem;

const ProductItemContainer = styled.div`
    max-width: 425px;
`;
