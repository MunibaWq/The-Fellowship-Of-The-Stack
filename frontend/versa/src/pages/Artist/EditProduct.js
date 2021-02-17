import React from "react";
import styled from "styled-components";
import ProductForm from "../../components/ProductForm";

const EditProduct = () => {
    return (
        <Container>
            <h1>Edit Product</h1>
            <ProductForm type={"Edit"}/>
        </Container>
    );
};

export default EditProduct;

const Container = styled.div`
margin:2em;
    display: flex;
    flex-direction: column;
    /* height: calc(84vh - 4em); */
text-align:center;
width:90vw;
`;
