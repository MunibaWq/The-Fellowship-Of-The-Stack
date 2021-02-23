import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserByToken } from "../../../axios/gets";
import { sendMessage } from "../../../axios/posts";
import { Circle, SendIcon } from "../../../images/icons";
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
                <h4>{messageList.topic}</h4>
                <h4>{messageList.from}</h4>
            </Header>
            <MessageDiv>
                <Scrollable>
                {messageList.messages.map((message) => {
                    return message.from_user === userID ? (
                        <MessageHolder>
                            <Circle stroke="none"/>
                            <ToMessage>
                            <Message>
                                <h4>{message.message}</h4>
                            </Message>
                            <Time>
                                <p>
                                    {new Date(
                                        message.time
                                    ).toLocaleTimeString()}
                                    </p>
                                    {message.read ? "✔✔" : "✔"}
                                </Time>
                                
                        </ToMessage></MessageHolder>
                    ) : (
                        <MessageHolderFrom><Circle stroke="none"/><FromMessage>
                            <Message>
                                <h4>{message.message}</h4>
                            </Message>
                            <Time>
                                <p>
                                    {new Date(
                                        message.time
                                    ).toLocaleTimeString()}
                                </p>
                                </Time>
                                
                        </FromMessage></MessageHolderFrom>
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
                    <SendIcon stroke="white" width="60" height="60" />
                </SendButton>
            </Send>
        </ThreadDiv>
    ) : (
        <></>
    );
};
export default MessageThread;

const MessageHolder = styled.div`
    display:flex;
    place-items: flex-end;
    /* justify-content: flex-end; */
    svg {
        height: 18px;
        width:18px;
        path {
            fill: ${props=>props.theme.black + "10"};
        }
    }
    flex-direction: row-reverse;
`
const MessageHolderFrom = styled.div`
    display:flex;
    
    place-items: flex-start;
    svg {
        height: 18px;
        width:18px;
        path {
            fill: ${props=>props.theme.lightPurple};
        }
    }
`
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
const Message = styled.div`
    h4 {
        font-weight: 400;
    }
`;
const Time = styled.div`
    align-self: flex-end;
    display: flex;
    align-items: flex-end;
    p {
        margin-top: 10px;
        margin-right: 10px;
    }
`;
const SendButton = styled.div`
    display: flex;
    margin: -28px -24px -28px 0px;
    height: 85px;
    width: 84px;
    align-items: center;
    background-color: ${props=>props.theme.purple};
    cursor: pointer;
    svg {
        padding-left: 21px;
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
    background-color: ${props=>props.theme.blue};
    overflow-y: auto;
    height: 840px;
    padding: 20px 40px;
    
`;
const ToMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
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
    margin: 20px 0px;
    padding: 10px;
    p {
        color: ${props=>props.theme.black};
        margin-bottom: 0px;
    }
    width: 70%;

    background-color: ${props=>props.theme.lightPurple};
`;
const Header = styled.div`
    background-color: ${props=>props.theme.blue};
    height: 69px;
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    h4 {
        :last-child{
            font-weight:400;
        }
    }
    
`;
