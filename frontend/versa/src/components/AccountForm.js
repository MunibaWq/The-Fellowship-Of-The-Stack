import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField } from "./Reusable/Input";
import Button from "./Reusable/Button";
import Icon from "./Reusable/Icons";
import { ColorInput, Input } from "./Reusable/Input";
import { Modal, ModalTitle } from "./Reusable/Modal";
import axios from "axios";
import { addImage } from "../axios/posts";
import { useParams } from "react-router";
import { getImagesByPID, getProductByID } from "../axios/gets";
import theme from "./Reusable/Colors";
import { AddIcon, LineCloseIcon } from "../images/icons";
import colors from "./Reusable/Colors";
import { crop } from "../imageUtils";
let host = process.env.NODE_ENV === "production" ? "" : "";
function deleteItem(index, arr, set) {
    let newArray = [...arr];
    newArray.splice(index, 1);
    set(newArray);
}

const AccountForm = (props) => {
    const [inputName, setInputName] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [inputAddress, setInputAddress] = useState();
    const [inputPassword, setInputPassword] = useState();
    const [inputStoreName, setInputStoreName] = useState();
    const [formError, setFormError] = useState(false);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const getUserData = async () => {
            // let data = await getUserByID(id);

            // setInputName(data.title);
            // setInputAddress(data.colours);
            // setInputEmail(data.sizes);
            // setInputStoreName(data.description);
        };
        if (props.type === "Edit") {
            getUserData();
        }
    }, [id, props.type]);

    const submitData = (e) => {
        e.preventDefault();
        const userInfo = {
            name: inputName,
            email: inputEmail,
            username: inputStoreName,
            password: inputPassword,
            address: inputAddress,
            type:1
        };
        const sendData = async () => {
            
            if (props.type === "Add") {
                axios.post(host + "/users/create", {
                    data: userInfo,
                });
            } else {
                axios.put(
                    host + "/users/update/",
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
            setFormError(true);
        }
    };

    return (
        <Form onSubmit={submitData}>
            <Instruction1>Hello, what is your name?</Instruction1>
            <RowContainer1>
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
                    value={inputName}
                    setValue={setInputName}
                ></TextField>
                
            </RowContainer1>
            <Instruction2>
                What is your store called?
                <br /> <br />
                Which address will you be shipping your products from? Include the postal code
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
                    value={inputStoreName}
                    setValue={setInputStoreName}
                ></TextField>
                <TextField
                    multi={true}
                    tests={[
                        {
                            test: (input) => input.length < 10,
                            error: "Minimum 10 characters",
                        },
                    ]}
                    label="Address"
                    value={inputAddress}
                    setValue={setInputAddress}
                ></TextField>
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
                            test: (input) => input.search(/^[\w\d]+@[\w\d]+\.\w\w+$/) === -1,
                            error: "Enter a valid email address"
                        }
                    ]}
                    label="Email"
                    value={inputEmail}
                    setValue={setInputEmail}
                ></TextField>
                <TextField
                    multi={false}
                    password={true}
                    tests={[
                        {
                            test: (input) => input.length < 9,
                            error: "Minimum 10 characters",
                        },
                        {
                            test: (input) => input.search(/[A-Z]/) === -1 || input.search(/\d/) === -1,
                            error: "Uppercase letter and number required"
                        }
                    ]}
                    label="Password"
                    value={inputPassword}
                    setValue={setInputPassword}
                ></TextField>
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
                {formError && <Error>Please check all input is valid</Error>}
            </RowContainer5>
        </Form>
    );
};

export default AccountForm;

const Radio = styled.div`
    padding-top: 10px;
`;

const ImageUpload = styled.section``;
const ImageList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-y: auto;
    height: 50vh;
    margin-top: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

const RemoveIcon = styled.div`
    display: flex;
    cursor: pointer;
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
const RowContainer4 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 4;
    grid-column: 2;
    align-items: center;
`;
const Instruction4 = styled.div`
    padding: 20px 0 20px 0;
    border-bottom: 2px dashed #ccc;
    grid-row: 4;
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

const ColorDiv = styled.div`
    position: relative;
    margin: 20px 0;
`;
const SizeDiv = styled.div`
    position: relative;
    margin: 20px 0;
`;
const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Error = styled.p`
    color: red;
`;
const NewSize = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 7px 15px;
    background: ${colors.primary};
    color: ${colors.secondary};
    margin: 8px;
    border-radius: 20px;

    p {
        margin-right: 10px;
        color: ${colors.secondary};
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-bottom: unset;
    }
`;

const NewSizePrice = styled.p`
    margin-right: 10px;
`;

const UploadedImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: 0 20px;
`;
const ImagesDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ColorOption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    border: 2px solid ${theme.primary};
    border-radius: 20px;
    margin: 8px;
    p {
        margin-right: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;

const ColorPreview = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 50%;
    border: 1px solid black;
    background-color: ${(props) => props.color};
`;
