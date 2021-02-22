import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserByToken } from "../../../axios/gets";
import { sendMessage } from "../../../axios/posts";
import { SendIcon } from "../../../images/icons";
import theme from "../../Reusable/Colors";
import { Input } from "../../Reusable/Input";
import ScrollableFeed from 'react-scrollable-feed'

const MessageThread = ({ thread }) => {
    const [userID, setUserID] = useState();
    const [outgoing, setOutgoing] = useState("");
    const [messageList, setMessageList] = useState();
 
  
    useEffect(() => {
        const getUser = async () => {
            const response = await getUserByToken();
            return response.id;
        };
        getUser().then((res) => setUserID(res));
    }, []);

    useEffect(() => {
        setMessageList(thread);
        
    }, [thread]);

    return messageList ? (
        <ThreadDiv>
            <Header>
                <h3>{messageList.topic}</h3>
                <h3>{messageList.from}</h3>
            </Header>
            <MessageDiv>
                <Scrollable>
                {messageList.messages.map((message) => {
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
                    
                    </Scrollable>
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
                        let newList = {
                            ...messageList,
                            messages: [
                                ...messageList.messages,
                                {
                                    from_user: userID,
                                    message: outgoing,
                                    time: new Date().toUTCString(),
                                },
                            ],
                        };

                        sendMessage(
                            thread.topic,
                            thread.fromID,
                            thread.type,
                            outgoing,
                            new Date().toUTCString()
                        );
                        setMessageList(newList);
                        setOutgoing("");
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
const Scrollable = styled(ScrollableFeed)`
::-webkit-scrollbar {
    width: 0.1em;
}

::-webkit-scrollbar-track {
}

::-webkit-scrollbar-thumb {
    background-color: ${props=>props.theme.purple};
    outline: 1px solid ${props=>props.theme.purple};
}
display: flex;
flex-direction: column;
`
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
    background-color: ${props=>props.theme.purple};
    width: 29px;
    height: 29px;
    cursor: pointer;
    svg {
        :hover {
            path {
                stroke: ${props=>props.theme.purple};
            }
        }
    }
`;
const Send = styled.div`
    padding: 24px;
    background-color: ${props=>props.theme.black};
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    input {
        background-color: ${props=>props.theme.lightBlue};
        margin-right: 20px;
        :hover,:active,:focus {
            border: 3px solid  ${props=>props.theme.lightBlue};
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
    grid-row:2;
    grid-column:2;
    background-color: ${props=>props.theme.lightBlue};
`;
const MessageDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #eff3fe60;
    overflow-y: auto;
    height: 60vh;
    
`;
const ToMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;

    p {
        color: ${props=>props.theme.black};
        margin-bottom: 0px;
    }
    background-color: ${props=>props.theme.black + "10"};
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
        color: ${props=>props.theme.black};
        margin-bottom: 0px;
    }
    width: 70%;

    background-color: ${props=>props.theme.lightPurple};
`;
const Header = styled.div`
    height: 69px;
`;
