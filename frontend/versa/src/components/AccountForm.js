import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "./Reusable/Input";
import Button from "./Reusable/Button";
import axios from "axios";
import { useParams } from "react-router";
import { setFormErrors } from "../redux/actions/Errors";
import { setFormInputs } from "../redux/actions/Forms";
import { getUserByID } from "../axios/gets";

const AccountForm = (props) => {
    const params = useParams();
    const id = params.id;
    const formError = useSelector((state) => state.formErrors.account.form);
    const input = useSelector((state) => state.formInputs.account);
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserData = async () => {
            let data = await getUserByID(id);
            dispatch(setFormInputs("account", "name", data.name));
            dispatch(setFormInputs("account", "address", data.address));
            dispatch(setFormInputs("account", "email", data.email));
            dispatch(setFormInputs("account", "storeName", data.username));
        };
        if (props.type === "Edit") {
            getUserData();
        }
    }, [dispatch, props.type, id]);

    const submitData = (e) => {
        e.preventDefault();
        const userInfo = {
            name: input.name,
            email: input.email,
            username: input.storeName,
            password: input.password,
            address: input.address,
            type: 1,
        };
        const sendData = async () => {
            if (props.type === "Add") {
                axios.post("/api/users/create", {
                    data: userInfo,
                });
            } else {
                axios.put(
                    "/api/users/update/",
                    {
                        data: userInfo,
                    },
                    { withCredentials: true }
                );
            }
            // window.location.href = "/";
        };
        let error = document.getElementById("error");
        if (!error) {
            sendData();
        } else {
            dispatch(
                setFormErrors("account", "Please check all input is valid")
            );
        }
    };

    return (
        <Form onSubmit={submitData}>
            <Instruction1>Hello, what is your name?</Instruction1>
            <RowContainer1>
                {"Hello" + JSON.stringify(input)}
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => input.length < 1,
                            error: "Required",
                        },
                        {
                            test: (input) => input.length < 2,
                            error: "Minimum 2 characters.",
                        },
                    ]}
                    label="Name"
                    // value={inputName}
                    form="account"
                    name="name"></TextField>
            </RowContainer1>
            <Instruction2>
                What is your store called?
                <br /> <br />
                Which address will you be shipping your products from? Include
                the postal code
                <br />
                <br />
            </Instruction2>
            <RowContainer2>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => input.length < 3,
                            error: "Minimum 2 characters",
                        },
                    ]}
                    label="Store Name"
                    form="account"
                    name="storeName"></TextField>
                <TextField
                    multi={true}
                    tests={[
                        {
                            test: (input) => input.length < 10,
                            error: "Minimum 10 characters",
                        },
                    ]}
                    label="Address"
                    form="account"
                    name="address"></TextField>
            </RowContainer2>
            <Instruction3>
                Enter the email address for you account
                <br /> <br />
                Your password must be at least 8 characters long and include a
                number and an upper case letter
            </Instruction3>
            <RowContainer3>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => input.length < 6,
                            error: "Minimum 6 characters",
                        },
                        {
                            test: (input) =>
                                input.search(/^[\w\d\.]+@[\w\d\.]+\.\w\w+$/) ===
                                -1,
                            error: "Enter a valid email address",
                        },
                    ]}
                    label="Email"
                    form="account"
                    name="email"></TextField>
                <TextField
                    multi={false}
                    password={true}
                    tests={[
                        {
                            test: (input) => input.length < 9,
                            error: "Minimum 10 characters",
                        },
                        {
                            test: (input) =>
                                input.search(/[A-Z]/) === -1 ||
                                input.search(/\d/) === -1,
                            error: "Uppercase letter and number required",
                        },
                    ]}
                    label="Password"
                    form="account"
                    name="password"></TextField>
            </RowContainer3>
            <Instruction5>
                Get started adding products to your store
            </Instruction5>
            <RowContainer5>
                <Container>
                    <Button primary onClick={submitData}>
                        Submit
                    </Button>
                </Container>
                {formError && <Error>{formError}</Error>}
            </RowContainer5>
        </Form>
    );
};

export default AccountForm;
const Form = styled.form`
    margin-top: 40px;
    grid-template-columns: 30% 65%;
    grid-template-rows: auto;
    display: grid;
    grid-column-gap: 5%;
    /* @media only screen and (min-width: 800px) {
        height: 95%; 
     } */
`;

const RowContainer1 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 1;
    grid-column: 2;
`;

const Instruction1 = styled.div`
    padding: 20px 20px 20px 0;
    grid-row: 1;
    grid-column: 1;
    border-bottom: 2px dashed #ccc;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const RowContainer2 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 2;
    grid-column: 2;
`;
const Instruction2 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 2;
    grid-column: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const RowContainer3 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 3;
    grid-column: 2;
`;
const Instruction3 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 3;
    grid-column: 1;
    text-align: left;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const RowContainer5 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 5;
    grid-column: 2;
    align-items: center;
`;
const Instruction5 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 5;
    grid-column: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Error = styled.p`
    color: red;
`;
