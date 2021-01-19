import React from "react";
import { Title } from "../../components/Reusable/Title";
import InputText from "../../components/ProductFormDetail/InputText";
import InputTextArea from "../../components/ProductFormDetail/InputTextArea";
import Button from "../../components/Reusable/Button";
import Icon from "../../components/Reusable/Icons";

const EditProduct = () => {
    return (
        <div>
            <Title>Edit Product</Title>
            <div>
                <Icon type="tool" />
                <Icon type="refresh" />
                <Icon type="search" />
                <Icon type="heart" />
                <Icon type="setting" />
                <Icon type="visible" />
                <Icon type="filledTick" />
                <Icon type="outlineTick" />
                <Icon type="tick" />
                <Icon type="miniBurger" />
                <Icon type="filledBookmark" />
                <Icon type="outlineBookmark" />
                <Icon type="filledError" />
                <Icon type="outlineError" />
                <Icon type="alarmBellError" />
                <Icon type="add" />
                <Icon type="copy" />
                <Icon type="link" />
                <Icon type="edit" />
                <Icon type="filter" />
                <Icon type="location" />
            </div>
            <Title subHeading>Product Details</Title>
            <InputText name="pName" label="Name:" />
            <InputText name="pPrice" type="number" label="Price: " />
            <InputTextArea name="pDescription" label="Description:" />
            <InputTextArea name="pFit" label="Size and fit:" />
            <InputTextArea name="pMaterials" label="Materials:" />
            <Title subHeading>Colours</Title>
            <Button>Add </Button>
            <Title subHeading>Sizes</Title>
            <Button>Add</Button>
            <Title subHeading>Images</Title>
            <Button>Add</Button>
            <Button cancel>Cancel</Button>
            <Button submit>Submit</Button>
        </div>
    );
};

export default EditProduct;
