import React from "react";
import styled from "styled-components";
import Login from "../Shared/Login";


const ArtistLogIn = () => {
    return (
        <Container>
            <h1>Welcome back!</h1>
         
            <Login />
        </Container>
    );
};

export default ArtistLogIn;

const Container = styled.div`
    margin: auto;
    display: flex;
    max-width: 50%;
    flex-direction: column;
    justify-content: center;
    height: 85vh;
    overflow-y: hidden;
    @media (max-width: 500px){
        max-width: 100%;
        margin: 0 10px 4em 10px;
        height: 78vh;
    }
`;
