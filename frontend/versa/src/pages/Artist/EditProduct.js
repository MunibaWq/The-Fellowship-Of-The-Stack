import React from "react";
import styled from "styled-components";
import ProductForm from "../../components/ProductFormDetail/ProductForm";

const EditProduct = () => {
    return (
        <Container>
            <h1>Edit Product</h1>
            <ProductForm />
        </Container>
    );
};

export default EditProduct;

const Container = styled.div`
    margin: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
