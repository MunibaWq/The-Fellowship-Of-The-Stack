import Cookies from "cookie-parser";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserByToken } from "../../../axios/gets";
import { readMessage } from "../../../axios/posts";
import { Circle } from "../../../images/icons";
import theme from "../../Reusable/Colors";
const cookies = new Cookies();
const timeSince = (time) => {
    console.log(new Date(time));
    console.log(new Date());
    const diff = (new Date() - new Date(time)) / 1000;
    console.log(diff);
    switch (true) {
        case diff < 60:
            return diff.toFixed(0) + " seconds";
        case diff < 3600:
            return (diff / 60).toFixed(0) + " minutes";
        case diff < 3600 * 24:
            return (diff / 3600).toFixed(0) + " hours";
        default:
            return (diff / 3600 / 24).toFixed(0) + " days";
    }
};
const MessageList = ({ setThread, messages }) => {
    const [messageList, setMessageList] = useState();
    const [userID, setUserID] = useState();
    useEffect(() => {
        const getUser = async () => {
            const response = await getUserByToken();
            return response.id;
        };

        getUser().then((id) => {
            setUserID(id);

            let threadlist = [];
            let threads = [];
            for (const message of messages) {
                if (id === message.to_user) {
                    let fromUser = `User ${message.from_user}`;

                    if (message.type === "A2A") {
                        fromUser = message.from_username;
                    }
                    let threadIndex = threadlist.indexOf(
                        `${fromUser}-${message.topic}`
                    );
                    if (threadIndex > -1) {
                        threads[threadIndex].messages.push(message);
                        if (!message.read) {
                            threads[threadIndex].unread += 1;
                        }
                    } else {
                        let unread = message.read ? 0 : 1;
                        threads.push({
                            type: message.type,
                            unread,
                            topic: message.topic,
                            from: fromUser,
                            fromID: message.from_user,
                            messages: [message],
                        });
                        threadlist.push(`${fromUser}-${message.topic}`);
                    }
                } else {
                    let toUser = `User ${message.to_user}`;

                    if (message.type === "A2A") {
                        toUser = message.to_username;
                    }
                    let threadIndex = threadlist.indexOf(
                        `${toUser}-${message.topic}`
                    );
                    if (threadIndex > -1) {
                        threads[threadIndex].messages.push(message);
                    } else {
                        let unread = message.read ? 0 : 1;
                        threads.push({
                            type: message.type,
                            unread,
                            topic: message.topic,
                            from: toUser,
                            fromID: message.to_user,
                            messages: [message],
                        });
                        threadlist.push(`${toUser}-${message.topic}`);
                    }
                }
            }

            threads.sort((one, two) => {
                return (
                    new Date(two.messages[two.messages.length - 1].time) -
                    new Date(one.messages[one.messages.length - 1].time)
                );
            });

            setMessageList(threads);
        });
    }, [messages]);
    return messageList ? (
        <MessageGrid>
            {messageList.map((thread) => {
                return (
                    <Thread
                        onClick={() => {
                            setThread(thread);
                            thread.unread = 0;
                            if (
                                thread.messages[thread.messages.length - 1]
                                    .to_user === userID
                            ) {
                                // if the latest message is to me, set message as read
                                readMessage(thread.topic, thread.fromID);
                            }
                        }}>
                        <UnreadIcon>
                            {thread.unread > 0 && (
                                <Circle width="16" height="16" fill="green" />
                            )}
                        </UnreadIcon>
                        <ThreadInfo>
                            <h3>{thread.topic}</h3>
                            <p>{thread.from}</p>
                            <p>
                                {timeSince(
                                    thread.messages[thread.messages.length - 1]
                                        .time
                                )}{" "}
                            </p>
                        </ThreadInfo>
                    </Thread>
                );
            })}
        </MessageGrid>
    ) : (
        <></>
    );
};

export default MessageList;
const ThreadInfo = styled.div`
    grid-column: 2;
`;
const UnreadIcon = styled.div`
    grid-column: 1;
`;
const Thread = styled.div`
    display: grid;
    grid-template-columns: 14% 86%;
    border-bottom: black 1px solid;
    align-items: center;
    p {
        margin-bottom: 0px;
    }
    :nth-child(even){
        background-color:${theme.primary+'17'};
    }
`;
const MessageGrid = styled.div`
    display: grid;
    grid-auto-rows: 100px;
  
        
   
`;
