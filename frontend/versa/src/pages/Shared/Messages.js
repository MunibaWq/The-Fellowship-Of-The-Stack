import React, { useEffect } from "react";
import styled from "styled-components";
import MessageList from "../../components/Dashboard/Messages/MessageList";
import { getMessages } from "../../axios/gets";

const Messages = () => {
    useEffect(() => {
        const getMessageList = async () => {
            const response = await getMessages();
            console.log(response);
        };
        getMessageList();
    }, []);

    return (
        <Container>
            <h1>Messages</h1>
            <MessageList />
        </Container>
    );
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
