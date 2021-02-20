import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserByToken } from "../../../axios/gets";
import { sendMessage } from "../../../axios/posts";
import { SendIcon } from "../../../images/icons";
import Button from "../../Reusable/Button";
import theme from "../../Reusable/Colors";
import { Input } from "../../Reusable/Input";

const MessageThread = ({ thread }) => {
    const [userID, setUserID] = useState();
    const [outgoing, setOutgoing] = useState("");
    useEffect(() => {
        const getUser = async () => {
            const response = await getUserByToken();
            return response.id;
        };
        getUser().then((res) => setUserID(res));
    }, []);

    return thread ? (
        <ThreadDiv>
            <Header>
                <h3>{thread.topic}</h3>
                <h3>{thread.from}</h3>
            </Header>
            <MessageDiv>
                {thread.messages.map((message) => {
                    console.log(message);
                    return message.from_user === userID ? (
                        <ToMessage>
                            <Message>
                                <p>{message.message}</p>
                            </Message>
                            <Time>
                                <p>
                                    {new Date(
                                        message.time
                                    ).toLocaleTimeString()}
                                </p>
                            </Time>
                        </ToMessage>
                    ) : (
                        <FromMessage>
                            <Message>
                                <p>{message.message}</p>
                            </Message>
                            <Time>
                                <p>
                                    {new Date(
                                        message.time
                                    ).toLocaleTimeString()}
                                </p>
                            </Time>
                        </FromMessage>
                    );
                })}
            </MessageDiv>
            <Send>
                <Input
                    value={outgoing}
                    onChange={(e) => {
                        setOutgoing(e.target.value);
                    }}
                />
                <SendButton
                    tertiary
                    onClick={() => {
                        sendMessage(
                            thread.topic,
                            thread.fromID,
                            thread.type,
                            outgoing,
                            new Date().toUTCString()
                        );
                    }}>
                    <SendIcon stroke="white" width="24" height="24" />
                </SendButton>
            </Send>
        </ThreadDiv>
    ) : (
        <></>
    );
};
export default MessageThread;
const Message = styled.div``;
const Time = styled.div`
    align-self: flex-end;
    p {
        margin-top: 10px;
    }
`;
const SendButton = styled.div`
    display: flex;
    margin-right: 10px;
    align-items: center;
    background-color: ${theme.primary};
    width: 29px;
    height: 29px;
`;
const Send = styled.div`
    padding: 10px;
    background-color: ${theme.primary};
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    input {
        background-color: white;
        margin-right: 20px;
        :hover {
            border: 3px solid ${theme.secondary};
        }
    }
`;

const ThreadDiv = styled.div`
    h3 {
        font-weight: 700;
        margin: 10px;
        :last-of-type {
            font-weight: 300;
        }
    }
`;
const MessageDiv = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 0.1em;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${theme.primary};
        outline: 1px solid ${theme.primary};
    }
    height: 60vh;
    border-top: ${theme.primary}33 1px solid;
`;
const ToMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;

    p {
        color: ${theme.tertiary};
        margin-bottom: 0px;
    }
    background-color: ${theme.tertiary + "10"};
    align-self: flex-end;
    width: 70%;
`;
const FromMessage = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin: 20px;
    padding: 10px;
    p {
        color: ${theme.secondary};
        margin-bottom: 0px;
    }
    width: 70%;

    background-color: ${theme.primary};
`;
const Header = styled.div`
    height: 69px;
`;
