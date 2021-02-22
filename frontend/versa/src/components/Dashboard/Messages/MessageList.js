import Cookies from "cookie-parser";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserByToken } from "../../../axios/gets";
import { readMessage } from "../../../axios/posts";
import { Circle } from "../../../images/icons";
import theme from "../../Reusable/Colors";
import { Input } from "../../Reusable/Input";
const timeSince = (time) => {
    const diff = (new Date() - new Date(time)) / 1000;
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
const MessageList = ({ selectedThread, setSelectedThread, messages }) => {
    const [messageList, setMessageList] = useState();
    const [filteredList, setFilteredList] = useState();
    const [userID, setUserID] = useState();
    const [filter, setFilter] = useState("");
    useEffect(() => {
        if (messageList) {
            const regex = new RegExp(filter.toUpperCase());
            const newList = messageList.filter((message) => {
                console.log(message, Object.values(message));
                return Object.values(message).some((value) =>
                    regex.test(`${value}`.toUpperCase())
                );
            });
            setFilteredList(newList);
        }
    }, [filter, messageList]);
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
                    let fromUser = message.from_name;
                    let fromUsername = `${
                        message.from_username
                            ? message.from_username
                            : "User " + message.from_user
                    }`;

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
                            fromUsername,
                            fromID: message.from_user,
                            messages: [message],
                        });
                        threadlist.push(`${fromUser}-${message.topic}`);
                    }
                } else {
                    let toUser = message.to_name;
                    let toUsername = `${
                        message.to_username
                            ? message.to_username
                            : "User " + message.to_user
                    }`;
                    let threadIndex = threadlist.indexOf(
                        `${toUser}-${message.topic}`
                    );
                    if (threadIndex > -1) {
                        threads[threadIndex].messages.push(message);
                    } else {
                        threads.push({
                            type: message.type,
                            unread: 0,
                            topic: message.topic,
                            from: toUser,
                            fromUsername: toUsername,
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
    return filteredList ? (
        <>
            <div
                style={{
                    padding: "12px 24px",
                    color: theme.secondary,
                    backgroundColor: theme.primary,
                    gridColumn: "1 / 3",
                }}>
                {filteredList.reduce((count, thread) => {
                    count += thread.unread;
                    return count;
                }, 0)}{" "}
                unread message
                {filteredList.reduce((count, thread) => {
                    count += thread.unread;
                    return count;
                }, 0) > 1
                    ? "s"
                    : ""}
            </div>

            <MessageGrid>
                <Search>
                    <h2>Search</h2>
                    <Input
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                        }}
                    />
                </Search>
                <Threads>
                    {filteredList.map((thread) => {
                        return (
                            <Thread
                                selected={selectedThread === thread}
                                onClick={() => {
                                    setSelectedThread(thread);
                                    thread.unread = 0;
                                    if (
                                        thread.messages[
                                            thread.messages.length - 1
                                        ].to_user === userID
                                    ) {
                                        // if the latest message is to me, set message as read
                                        readMessage(
                                            thread.topic,
                                            thread.fromID
                                        );
                                    }
                                }}>
                                <UnreadIcon>
                                    {thread.unread > 0 && (
                                        <Circle
                                            width="16"
                                            height="16"
                                            fill={theme.primaryHover}
                                            stroke={theme.primary}
                                        />
                                    )}
                                </UnreadIcon>
                                <ThreadInfo>
                                    <h3>{thread.topic}</h3>
                                    <From>
                                        <p>{thread.from}</p>
                                        <p>{thread.fromUsername}</p>
                                    </From>
                                    <p>
                                        {timeSince(
                                            thread.messages[
                                                thread.messages.length - 1
                                            ].time
                                        )}{" "}
                                    </p>
                                </ThreadInfo>
                            </Thread>
                        );
                    })}
                </Threads>
            </MessageGrid>
        </>
    ) : (
        <></>
    );
};

export default MessageList;

const Threads = styled.div`
    height: 56vh;
    padding-right:1px;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 0.1em;
    }

    ::-webkit-scrollbar-track {
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${theme.primary};
        outline: 1px solid ${theme.primary};
    }
`;

const Search = styled.div`
    h2 {
        font-weight: 700;
    }
    padding: 24px 24px;
    border-bottom: ${theme.primary} 2px solid;
`;
const ThreadInfo = styled.div`
    grid-column: 2;

    display: grid;
    grid-auto-columns: auto;
    h3 {
        grid-column: 1;
        font-weight: 700;
    }

    p {
        :last-child {
            margin-left: 5px;
            grid-column: 2;
            place-self: flex-end;
            margin-right: 10px;
            color: ${theme.primary + "77"};
        }
    }
`;
const From = styled.div`
    display: flex;
    flex-direction: row;
    grid-column: 1;
`;
const UnreadIcon = styled.div`
    grid-column: 1;
    justify-self: end;
    margin: 10px;
`;
const Thread = styled.div`
    display: grid;

    padding: 24px 24px;
    grid-template-columns: 26px calc(100% - 26px);
    border-bottom: #ddd thin solid;
    align-items: center;
    background-color: ${(props) =>
        props.selected ? theme.primary + "45" : theme.secondary};
    p {
        margin-bottom: 0px;
    }
    :nth-child(even) {
        background-color: ${(props) =>
            props.selected ? theme.primary + "45" : theme.primary + "17"};
    }
    :last-child {
        border-bottom: ${theme.primary} 2px solid;
    }
`;
const MessageGrid = styled.div`
    display: grid;
    grid-auto-rows: min-content;
    overflow-y: auto;
    grid-column: 1;
    grid-row: 2;
`;
