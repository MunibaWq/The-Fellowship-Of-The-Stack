import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Going, NotGoing } from "../../images/icons";
import { userGoing } from "../../axios/posts";
import { deleteUserFromEventByID } from "../../axios/deletes";
import imageTest from "../../images/imageTest.png";
import Button from "../Reusable/Button";
import theme from "../Reusable/Colors";
import { amIGoing, getUserByToken } from "../../axios/gets";

const EventCard = ({ theEvent }) => {
    //const [interested, setInterested] = useState(false);
    const [going, setGoing] = useState(false);
    const [isUser, setIsUser] = useState();

    //state to update attending number when user attends/unattends event
    const [attending, setAttending] = useState(Number(theEvent.num_attending));

    let currentEvent = theEvent.id;
    const history = useHistory();

    const routeChange = () => {
        let path = `/account`;
        history.push(path);
    };

    useEffect(() => {
        const findUser = async () => {
            const response = await getUserByToken();
            setIsUser(response);
        };
        findUser();
    }, []);

    useEffect(() => {
        const attendStatus = async () => {
            const response = await amIGoing(currentEvent);
            if (response) {
                setGoing(true);
            } else setGoing(false);
        };
        attendStatus();
    }, [currentEvent]);

    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let eventDate = new Date(theEvent.start_time);
    let startDate = eventDate.toLocaleDateString("en-US", options);
    let startTime = eventDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    let eventEndDate = new Date(theEvent.end_time);
    let endDate = eventEndDate.toLocaleDateString("en-US", options);
    let endTime = eventEndDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <CardContainer>
            {theEvent.thumbnail ? (
                <Link to={`/events/${theEvent.id}`}>
                    <Thumbnail
                        src={`https://versabucket.s3.us-east-2.amazonaws.com/eventImages/${theEvent.thumbnail}.jpeg`}
                    />
                </Link>
            ) : (
                <Link to={`/events/${theEvent.id}`}>
                    <Thumbnail src={imageTest} />
                </Link>
            )}
            <Link to={`/events/${theEvent.id}`}>
                <Name>{theEvent.name}</Name>
                <Host>{theEvent.host_name}</Host>
                <EventDate>
                    {startDate
                        ? startDate === endDate
                            ? startDate
                            : startDate + "-" + endDate
                        : "Loading"}
                </EventDate>
                <Time>{startTime ? startTime + "-" + endTime : "Loading"}</Time>
                <Stats></Stats>
            </Link>
            <Actions>
                {/**<ActionButton
                    onClick={() => {
                        setInterested((curr) => !curr);
                    }}>
                    {interested && (
                        <div>
                            <WishListIcon
                                onClick={() => setInterested(false)}
                                fill="#FF0000"
                                stroke="#FF0000"
                                width="33"
                                height="33"
                            />
                            <p>Added!</p>
                        </div>
                    )}
                    {!interested && (
                        <div>
                            <WishListIcon stroke={theme.primary} />
                        </div>
                    )}
                    
                </ActionButton>**/}
                <ActionButton
                    onClick={() => {
                        if (going) {
                            if (isUser) {
                                deleteUserFromEventByID(currentEvent);
                                setAttending(attending - 1);
                            } else {
                                routeChange();
                            }
                        } else {
                            if (isUser) {
                                userGoing(currentEvent);
                                setAttending(attending + 1);
                            } else {
                                routeChange();
                            }
                        }
                        setGoing((curr) => !curr);
                    }}>
                    {!going && (
                        <div>
                            <Going stroke={theme.primary} />
                        </div>
                    )}
                    {going && <NotGoing />}
                </ActionButton>
                <NumGoing>{attending} Going</NumGoing>
                {/**} <ActionButton>
                    <Share stroke={theme.primary} />
                    </ActionButton>**/}
            </Actions>
        </CardContainer>
    );
};

export default EventCard;

const CardContainer = styled.div`
    margin: 25px;
    cursor: pointer;
`;

const Thumbnail = styled.img`
    width: 250px;
    height: 250px;
`;
const Name = styled.h2`
    width: 250px;
    margin-top: 10px;
`;
const Host = styled.h3`
    width: 250px;
    margin-top: 10px;
`;
const EventDate = styled.p`
    margin-bottom: 5px;
`;
const Time = styled.p``;
const Stats = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;
`;
const NumInterested = styled.p``;
const NumGoing = styled.p``;
const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;
    height: 32px;
`;

const ActionButton = styled(Button)`
    flex-direction: column;
    margin: 0;
    padding: 0;
    :hover,
    :focus,
    :active {
        transform: scale(1.05);
    }
    p {
        font-size: 0.5em;
    }
    div {
        svg {
            path {
                fill: ${(props) => props.fill};
            }
        }
    }
`;
