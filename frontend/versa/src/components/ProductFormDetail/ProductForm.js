import React from "react";
import styled from "styled-components";
import { TextField } from "../Reusable/Input";
import Button from "../Reusable/Button";
import Icon from "../Reusable/Icons";

const ProductForm = (props) => {
    return (
        <Form>
            <h2>Product Details</h2>
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
            <h2>Colours</h2>
            <Button>
                Add
                <Icon type="add" />
            </Button>
            <h2 subHeading>Sizes</h2>
            <Button>
                Add <Icon type="add" />
            </Button>
            <h2 subHeading>Images</h2>
            <Button>
                Add <Icon type="add" />
            </Button>
            <Container>
                <Button>
                    Cancel
                    <Icon type="lineClose" />
                </Button>
                <Button primary>Submit</Button>
            </Container>
        </Form>
    );
};

export default ProductForm;

const Form = styled.form``;
const Container = styled.div`
    display: flex;
`;
