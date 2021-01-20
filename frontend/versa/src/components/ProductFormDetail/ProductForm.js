import React from "react";
import styled from "styled-components";
import { TextField } from "../Reusable/Input";
import { Title } from "../Reusable/Title";

const ProductForm = (props) => {
    return (
        <Form>
            <Title>Product Details</Title>
            <TextField
                multi={false}
                tests={[
                    {
                        test: (input) => input.length < 1,
                        error: "A name for your product is required",
                    },
                    {
                        test: (input) => input.length < 3,
                        error: "Product name must be longer than 3 letters.",
                    },
                ]}
                label="Product Name"
            ></TextField>
            <TextField
                multi={false}
                tests={[
                    {
                        test: (input) => isNaN(input),
                        error: "Product price must be numbers only.",
                    },
                    {
                        test: (input) => input.length < 1,
                        error: "Required",
                    },
                    {
                        test: (input) => input === 0,
                        error: "Product price cannot be $0.",
                    },
                ]}
                label="Price"
            ></TextField>
            <TextField
                multi={true}
                tests={[
                    {
                        test: (input) => input.length < 10,
                        error: "Product description is required.",
                    },
                ]}
                label="Description"
            ></TextField>
            <TextField
                multi={true}
                tests={[
                    {
                        test: (input) => input.length < 10,
                        error: "Materials description is required.",
                    },
                ]}
                label="Materials"
            ></TextField>
        </Form>
    );
};

export default ProductForm;

const Form = styled.form``;
