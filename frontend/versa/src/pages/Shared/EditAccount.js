import React from "react";
import styled from "styled-components";
import AccountForm from "../../components/AccountForm";

const EditAccount = () => {
    return (
        <Container>
            <h1>Edit your account</h1>
         
            <AccountForm type={"Edit"} />
        </Container>
    );
};

export default EditAccount;

const Container = styled.div`
    margin: 2em;
    display: flex;
    flex-direction: column;
    /* height: calc(84vh - 4em); */
    text-align: center;
`;
