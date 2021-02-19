import React from "react";
import styled from "styled-components";

const Messages = () => {
    return <Container><h1>Messages</h1></Container>;
};

export default Messages;

const Container = styled.div`
width: 100vw;
    padding: 5em 2em;
    display: grid;
    grid-template-rows: 80px auto;
    /* justify-content:center; */
    min-height: 100vh;
`;