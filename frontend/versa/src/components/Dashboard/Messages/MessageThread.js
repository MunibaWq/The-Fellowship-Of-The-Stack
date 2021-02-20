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

    return (
        <>
            {thread && (
                <MessageDiv>
                    <h2>{thread.topic}</h2>
                    <h3>{thread.from}</h3>
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
                    <Send>
                        <Input
                            value={outgoing}
                            onChange={(e) => {
                                setOutgoing(e.target.value);
                            }}
                        />
                        <Button
                            onClick={() => {
                                sendMessage(
                                    thread.topic,
                                    thread.fromID,
                                    thread.type,
                                    outgoing,
                                    new Date().toUTCString()
                                );
                            }}
                            primary>
                            <SendIcon />
                        </Button>
                    </Send>
                </MessageDiv>
            )}
        </>
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
const Send = styled.div``;
const MessageDiv = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
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
