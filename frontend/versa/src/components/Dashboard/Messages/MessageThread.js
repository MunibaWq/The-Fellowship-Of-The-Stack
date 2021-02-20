import React from "react";
import styled from "styled-components";
import { SendIcon } from "../../../images/icons";
import Button from "../../Reusable/Button";
import theme from "../../Reusable/Colors";
import { Input } from "../../Reusable/Input";

const MessageThread = ({ messagest }) => {
    const messages = [
        {
            topic: "Hello",
            from: 23,
            message: "Hey look at this",
            time: "12 dec 2021 3:45:01PM",
            type: "A2A",
            to: 24,
        },
        {
            topic: "Hello",
            from: 24,
            message: "Look at what?",
            time: "12 dec 2021 3:46:01PM",
            type: "A2A",
            to: 23,
        },
    ];
    return (
        <MessageDiv>
            <h2>{messages[0].topic}</h2>
            <h3>{messages[0].from}</h3>
            {messages.map((message) => {
                return message.from === 23 ? (
                    <ToMessage><Message><p>{message.message}</p></Message><Time>{message.time}</Time></ToMessage>
                ) : (
                    <FromMessage><Message><p>{message.message}</p></Message><Time>{message.time}</Time></FromMessage>
                );
            })}
            <Send>
                <Input />
                <Button primary>
                    <SendIcon />
                </Button>
            </Send>
        </MessageDiv>
    );
};
export default MessageThread;
const Message = styled.div``
const Time = styled.div``
const Send = styled.div``;
const MessageDiv = styled.div``;
const ToMessage = styled.div`
p{
    color: ${theme.tertiary};
   
}
background-color: ${theme.tertiary + "10"};
`;
const FromMessage = styled.div`
p{
        color: ${theme.secondary};

   
}
background-color: ${theme.primary};
`;
