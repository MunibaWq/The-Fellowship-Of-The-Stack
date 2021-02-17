import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Reusable/Button";
import { Link, useParams, useHistory } from "react-router-dom";
import { getCollabsByEventID, getEventByID, getUser } from "../../axios/gets";
import { userGoing } from "../../axios/posts";
import theme from "../Reusable/Colors";
import { LeftIcon, Going, NotGoing } from "../../images/icons";
import { deleteUserFromEventByID } from "../../axios/deletes";
import { amIGoing } from "../../axios/gets";
import imageTest from "../../images/imageTest.png";

const EventPage = () => {
    const [going, setGoing] = useState(false);
    let params = useParams();
    const currentEvent = params.id;

    const [eventData, setEventData] = useState([]);
    const [dateTime, setDateTime] = useState();
    const [isUser, setIsUser] = useState();
    const [collabs, setCollabs] = useState();

    useEffect(() => {
        const findUser = async () => {
            const response = await getUser();
            setIsUser(response);
            // console.log(response);
        };
        findUser();
    }, []);

    useEffect(() => {
        const attendStatus = async () => {
            const response = await amIGoing(currentEvent);
            console.log(response);

            if (response) {
                setGoing(true);
            } else setGoing(false);
        };
        attendStatus();
    }, [currentEvent]);

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getEventByID(currentEvent);
            setEventData(data);
            const collaborators = await getCollabsByEventID(currentEvent);
            setCollabs(collaborators);
            console.log(collaborators);
            return data;
        };
        fetchEvent().then((data) => {
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            let eventDate = new Date(data.start_time);
            let startTime = eventDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            let startDate = eventDate.toLocaleDateString("en-US", options);

            let eventEndDate = new Date(data.end_time);
            let endDate = eventEndDate.toLocaleDateString("en-US", options);
            let endTime = eventEndDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

            console.log(startTime);
            console.log(endTime);

            setDateTime({
                startDate,
                endDate,
                startTime,
                endTime,
            });
        });
    }, [currentEvent]);

    const history = useHistory();

    const routeChange = () => {
        let path = `/account`;
        history.push(path);
        console.log(history);
    };

    return (
        <Container>
            <Link to="/events">
                <Button>
                    <LeftIcon stroke={theme.primary} />
                    Back to Events
                </Button>
            </Link>
            <MainInfo>
                <EventImages>
                    <MainImage src={imageTest} alt={"image"}></MainImage>
                </EventImages>

                <EventDetail>
                    <h4>
                        {eventData
                            ? eventData.type
                            : "Loading event categories"}
                    </h4>
                    <h1>{eventData ? eventData.name : "Loading Event  "}</h1>
                    <h2>
                        by
                        {eventData
                            ? "  " + eventData.username
                            : "Loading Host Name"}
                    </h2>
                    <Details>
                        <h3>In collaboration with: </h3>
                        {/*collabs &&
                            collabs.map((collaborator, index) => {
                                return (
                                    <p key={index}>{collaborator.username}</p>
                                );
                            })*/}
                    </Details>
                    <Details>
                        <h3>Date: </h3>
                        <p>
                            {dateTime
                                ? dateTime.startDate + "-" + dateTime.endDate
                                : "Loading dates"}
                        </p>
                    </Details>
                    <Details>
                        <h3>Time: </h3>
                        <p>
                            {dateTime
                                ? dateTime.startTime + "-" + dateTime.endTime
                                : "Loading times"}
                        </p>
                    </Details>
                    <Details>
                        <h3>Location:</h3>
                        <p>{eventData.location}</p>
                    </Details>
                    <Details>
                        <h3>Interested: </h3>

                        <p>{eventData ? eventData.num_interested : "0"} </p>
                    </Details>
                    <Details>
                        <h3>Attending: </h3>

                        <p>{eventData ? eventData.num_attending : "0"} </p>
                    </Details>
                    <Description>
                        <h3>Description</h3>
                        <p>
                            {eventData
                                ? eventData.description
                                : "Loading description..."}
                        </p>
                    </Description>
                    {!going && (
                        <Button
                            primary
                            onClick={() => {
                                if (isUser) {
                                    userGoing(currentEvent);
                                } else {
                                    routeChange();
                                }
                                // }
                                setGoing((curr) => !curr);
                            }}>
                            <Going stroke={theme.secondary} />
                            Attend Event
                        </Button>
                    )}
                    {going && (
                        <Button
                            primary
                            onClick={() => {
                                if (isUser) {
                                    deleteUserFromEventByID(currentEvent);

                                    console.log("true");
                                } else {
                                    routeChange();
                                }

                                setGoing((curr) => !curr);
                            }}>
                            <NotGoing stroke={theme.secondary} />
                            Remove Event
                        </Button>
                    )}
                </EventDetail>
            </MainInfo>
        </Container>
    );
};

export default EventPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0;
    h3 {
        font-weight: 700;
    }
`;

const MainInfo = styled.div`
    display: flex;
    margin: 40px;
    flex-direction: row;
    justify-content: flex-start;
    @media (max-width: 1000px) {
        flex-wrap: wrap;
        margin: 20px;
        justify-content: center;
    }
`;

const EventImages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 20px;
    @media (max-width: 1000px) {
        flex-wrap: wrap;
        flex-direction: column;
        margin: 10px;
    }
`;

const MainImage = styled.img`
    width: 600px;
    height: 600px;
    margin: 10px;
    border: 2px solid rgba(68, 68, 68, 0.1);
    padding: 1em;

    @media (max-width: 1000px) {
        width: 300px;
        height: 300px;
        margin: 5px;
    }
    @media (max-width: 350px) {
        width: 85vw;
    }
`;

const EventDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 30px 20px;
    h1 {
        font-size: 2em;
        font-weight: 700;
        margin: 0 0 1em 0;
    }
    h2 {
        font-size: 1em;
        font-weight: 700;
        margin: 0 0 2em 0;
    }

    h3 {
        margin: 0 1em 1em 0;
    }
    h4 {
        margin: 0 1em 1em 0;
        color: ${theme.primary};
    }
    p {
        margin: 0 0 8px 0;
    }
    @media (max-width: 1000px) {
        h1 {
            font-size: 1.5em;
        }
        h2 {
            font-size: 1em;
        }
        h3 {
            margin: 0 0.5em 0.5em 0;
        }
    }
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;

    padding: 1em 0;
    h3 {
        margin-bottom: 0.8em;
    }
`;

const Details = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    h3,
    p {
        margin-bottom: 0;
    }

    p {
        font-size: 0.9em;
    }
`;

// const Stats = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 2em;
//     height: 2em;
//     margin: 0 0px 20px 0px;
//     padding: 20px;
//     border: ${theme.tertiary};
//     border-radius: 50px;
//     background-color: ${theme.tertiary};
//     p {
//         margin: 0;
//         font-size: 0.8em;
//         color: white;
//     }
// `;
