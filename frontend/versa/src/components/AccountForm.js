import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FieldContainer, Input, Label, TextField } from "./Reusable/Input";
import Button from "./Reusable/Button";
import axios from "axios";
import { setFormErrors } from "../redux/actions/Errors";
import { setFormInputs } from "../redux/actions/Forms";
import { getUserByToken } from "../axios/gets";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";
import { StyledLink } from "./Reusable/Link";
import { LineCloseIcon } from "../images/icons";
import theme from "./Reusable/Colors";
const cookies = new Cookies();
const AccountForm = (props) => {
    const formError = useSelector((state) => state.formErrors.account.form);
    const input = useSelector((state) => state.formInputs.account);
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserData = async () => {
            let data = await getUserByToken();
            dispatch(setFormInputs("account", "name", data.name));
            dispatch(
                setFormInputs("account", "storeAddress", data.store_address)
            );
            dispatch(setFormInputs("account", "email", data.email));
            dispatch(setFormInputs("account", "storeName", data.username));
            dispatch(setFormInputs("account", "isArtist", data.is_artist));
            dispatch(setFormInputs("account", "address", data.address));
        };
        if (props.type === "Edit") {
            getUserData();
        }
    }, [dispatch, props.type]);

    const submitData = (e) => {
        e.preventDefault();
        const userInfo = {
            name: input.name,
            email: input.email,
            username: input.storeName,
            password: input.password,
            address: input.address,
            isArtist: input.isArtist,
            storeAddress: input.storeAddress,
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
            window.location = "/dashboard";
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
            <Instruction>
                {props.type === "Edit"
                    ? "Change the name on your account"
                    : "Hello, what is your name?"}
            </Instruction>
            <RowContainer>
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
                    name="name"
                />
            </RowContainer>
            <Instruction>
                Are you an artist? Want to sell your products on Versa?
            </Instruction>
            <RowContainer>
                <FieldContainer>
                    <Label>Sign up as an artist?</Label>
                </FieldContainer>
                <CheckedContainer>
                    <input
                        checked={input.isArtist}
                        onChange={(e) => {
                            dispatch(
                                setFormInputs(
                                    "account",
                                    "isArtist",
                                    e.target.checked
                                )
                            );
                        }}
                        id="artist"
                        type="checkbox"
                    />
                    <label htmlFor="artist">Yes</label>
                </CheckedContainer>
            </RowContainer>
            {input.isArtist && (
                <>
                    <Instruction>
                        What is your store called?
                        <br /> <br />
                        Which address will you be shipping your products from?
                        Include the postal code
                        <br />
                        <br />
                    </Instruction>
                    <RowContainer>
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
                            name="storeName"
                        />
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
                            name="storeAddress"
                        />
                    </RowContainer>
                </>
            )}
            <Instruction>
                Where would you like products that you purchase to go to?
                Include the postal code
                <br />
                <br />
            </Instruction>
            <RowContainer>
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
                    name="address"
                />
            </RowContainer>
            <Instruction>
                {props.type === "Edit"
                    ? "Change your accounts email address"
                    : "Enter the email address for you account"}
                <br /> <br />
                {props.type !== "Edit" &&
                    `
                Your password must be at least 8 characters long and include a
                number and an upper case letter`}
            </Instruction>
            <RowContainer>
                <TextField
                    multi={false}
                    tests={[
                        {
                            test: (input) => input.length < 6,
                            error: "Minimum 6 characters",
                        },
                        {
                            test: (input) =>
                                input.search(/^[\w\d]+@[\w\d]+\.\w\w+$/) === -1,
                            error: "Enter a valid email address",
                        },
                    ]}
                    label="Email"
                    form="account"
                    name="email"
                />
                {props.type !== "Edit" && (
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
                        name="password"
                    />
                )}
            </RowContainer>
            <Instruction>
                {input.isArtist
                    ? "Get started adding products to your store"
                    : "Head over to your dashboard to set up some preferences"}
            </Instruction>
            <RowContainer>
                <Container>
                    <StyledLink to="/">
                        <LineCloseIcon
                            width="32"
                            height="32"
                            stroke={theme.primary}
                        />
                        Cancel
                    </StyledLink>
                    <Button primary onClick={submitData}>
                        Submit
                    </Button>
                </Container>
                {formError && <Error>{formError}</Error>}
            </RowContainer>
        </Form>
    );
};

export default AccountForm;
const CheckedContainer = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;
    label {
        margin-bottom: 0px;
        margin-left: 8px;
    }
    input {
        margin-left: 3px;
    }
`;
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

const RowContainer = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-column: 2;
`;

const Instruction = styled.div`
    padding: 20px 20px 20px 0;
    grid-column: 1;
    border-bottom: 2px dashed #ccc;
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
