import React from "react";
import styled from "styled-components";

import Button from "../../components/Reusable/Button";
import Icon from "../../components/Reusable/Icons";

import ProductForm from "../../components/ProductFormDetail/ProductForm";

const EditProduct = () => {
    return (
        <div>
            <h1>Edit Product</h1>
            <ProductForm />
        </div>
    );
};

export default EditProduct;
