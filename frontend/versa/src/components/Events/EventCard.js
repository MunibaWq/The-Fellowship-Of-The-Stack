import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Going, NotGoing } from "../../images/icons";
import { userGoing } from "../../axios/posts";
import { deleteUserFromEventByID } from "../../axios/deletes";
import imageTest from "../../images/imageTest.png";
import Button from "../Reusable/Button";
import theme from "../Reusable/Colors";
import { amIGoing } from "../../axios/gets";

const EventCard = ({ theEvent }) => {
    //const [interested, setInterested] = useState(false);
    const [going, setGoing] = useState("unset");
    let currentEvent = theEvent.id;

    useEffect(() => {
        const attendStatus = async () => {
            const response = await amIGoing(currentEvent);
            if (response) {
                setGoing(true);
            } else setGoing(false);
        };
        attendStatus();
    }, []);

    // useEffect(() => {
    //     if (going !== "unset") {
    //         if (!going) {
    //             deleteUserFromEventByID(currentEvent);
    //         } else {
    //             userGoing(currentEvent);
    //         }
    //     }
    // }, [going, currentEvent]);

    console.log("results", theEvent);
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

    //TO DO:
    //function to send data
    //get user data
    //create a variable that contains the user name, email, status (going, not going, interested), event name, event start date, event start time
    // axios post to /mail/send
    // event button, if user status = going, render the not going button. if user status = not going. render going button

    return (
        <CardContainer>
            {theEvent.thumbnail ? (
                <Link to={`/events/${theEvent.id}`}>
                    <Thumbnail src={theEvent.thumbnail} />
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
                <Stats>
                    <NumInterested>
                        {theEvent.num_interested} Interested
                    </NumInterested>
                    <NumGoing>{theEvent.num_attending} Going</NumGoing>
                </Stats>
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
                            deleteUserFromEventByID(currentEvent);
                        } else {
                            userGoing(currentEvent);
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
