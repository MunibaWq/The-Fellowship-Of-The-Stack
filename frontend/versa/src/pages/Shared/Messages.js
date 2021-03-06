import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MessageList from "../../components/Dashboard/Messages/MessageList";
import { getMessages } from "../../axios/gets";
import MessageThread from "../../components/Dashboard/Messages/MessageThread";

const Messages = () => {
    const [messages, setMessages] = useState();
    const [thread, setThread] = useState();
    useEffect(() => {
        const getMessageList = async () => {
            const response = await getMessages();

            response.sort((one, two) => {
                return new Date(one.time) - new Date(two.time);
            });

            setMessages(response);
        };
        getMessageList();
    }, []);

    return (
        <Container>
            <h1>Messages</h1>
            {messages && (
                <MessageSection>
                    <MessageList
                        selectedThread={thread}
                        setSelectedThread={setThread}
                        messages={messages}
                    />
                    <MessageThread thread={thread} />
                </MessageSection>
            )}
        </Container>
    );
};

export default Messages;
const MessageSection = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: 45px auto;
`;
const Container = styled.div`
    width: 100vw;
    padding: 5em 2em;
    display: grid;
    grid-template-rows: 80px auto;

    /* justify-content:center; */
    min-height: 100vh;
`;
