import React from "react";
import { Title } from "../../components/Reusable/Title";
import InputText from "../../components/ProductFormDetail/InputText";
import InputTextArea from "../../components/ProductFormDetail/InputTextArea";
import Button from "../../components/Reusable/Button";
import Icon from "../../components/Reusable/Icons";
import { TextField } from "../../components/Reusable/Input";
import ProductForm from "../../components/ProductFormDetail/ProductForm";

const EditProduct = () => {
    return (
        <div>
            <Title>Edit Product</Title>
            <ProductForm />
            <Title subHeading>Colours</Title>
            <Button>
                Add
                <Icon type="add" />
            </Button>
            <Title subHeading>Sizes</Title>
            <Button>
                Add <Icon type="add" />
            </Button>
            <Title subHeading>Images</Title>
            <Button>
                Add <Icon type="add" />
            </Button>
            <Button>Cancel</Button>
            <Button primary>Submit</Button>
        </div>
    );
};

export default EditProduct;
