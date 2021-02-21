import React from "react";
import styled from "styled-components";
import ProductForm from "../../components/ProductForm";

const AddProduct = () => {
    return (
        <Container>
            <h1>Add Product</h1>
            <ProductForm type={"Add"} />
        </Container>
    );
};

export default AddProduct;

const Container = styled.div`
width:90vw;
    margin: 2em;
    display: flex;
    flex-direction: column;
    /* height: calc(84vh - 4em); */
    text-align: center;
`;

