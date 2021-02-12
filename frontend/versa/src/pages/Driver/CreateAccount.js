import React from "react";
import styled from "styled-components";
import AccountForm from "../../components/AccountForm";

const CreateAccount = () => {
    return (
        <Container>
            <h1>Bring Your Business Online!</h1>
         
            <AccountForm type={"Add"} />
        </Container>
    );
};

export default CreateAccount;

const Container = styled.div`
    margin: 2em;
    display: flex;
    flex-direction: column;
    /* height: calc(84vh - 4em); */
    text-align: center;
`;
