import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Redesign/Reusable/Button";
import { Link, useParams, useHistory } from "react-router-dom";
import {
    getCollabsByEventID,
    getEventByID,
    getUserByToken,
} from "../../axios/gets";
import { sendMessage, userGoing } from "../../axios/posts";
// import theme from "../Reusable/Colors";
import { LeftIcon, Going, NotGoing, SendIcon } from "../../images/icons";
import { deleteUserFromEventByID } from "../../axios/deletes";
import { amIGoing } from "../../axios/gets";
import ImageTest from "../../images/imageTest.png";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import BackLink from "../../components/Redesign/Reusable/BackLink";
// import { clearChoices, setChoices } from "../../redux/actions/EventPage";

const EventPage = () => {
    const [going, setGoing] = useState("false");
    let params = useParams();
    const currentEvent = params.id;

    const [eventData, setEventData] = useState([]);
    const [dateTime, setDateTime] = useState();
    const [collabs, setCollabs] = useState();
    const [question, setQuestion] = useState();
    //state to update attending number when user attends/unattends event
    const [attending, setAttending] = useState();
    const [sent, setSent] = useState();
    const [image, setImage] = useState();

    const [isUser, setIsUser] = useState();
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

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getEventByID(currentEvent);
            console.log(data);
            setEventData(data);
            setImage(data.thumbnail);
            setAttending(data.num_attending);
            const collaborators = await getCollabsByEventID(currentEvent);
            setCollabs(collaborators);
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
    };

    return (
        <PageContainer>
            <BackLink to="/events">
                <LeftIcon />
                Back to Events
            </BackLink>
            <Container>
                <Column>
                    <MainImage
                        src={
                            image
                                ? `https://versabucket.s3.us-east-2.amazonaws.com/eventImages/${image}.jpeg`
                                : ImageTest
                        }
                        alt={"image"}
                    />
                </Column>
                <Column>
                    <h4>
                        {eventData
                            ? eventData.type
                            : "Loading event categories"}
                    </h4>
                    <h2>{eventData ? eventData.title : "Loading Event  "}</h2>
                    <h3>
                        by
                        {eventData
                            ? "  " + eventData.username
                            : "Loading Host Name"}
                    </h3>
                    <Row>
                        {collabs && collabs.length > 0 && (
                            <h3>In collaboration with: </h3>
                        )}
                        {collabs &&
                            collabs.length > 0 &&
                            collabs.map((collab, index) => {
                                return <p key={index}>{collab.username}</p>;
                            })}
                    </Row>
                    <Row>
                        <h3>Date: </h3>
                        <p>
                            {dateTime
                                ? dateTime.startDate + "-" + dateTime.endDate
                                : "Loading dates"}
                        </p>
                    </Row>
                    <Row>
                        <h3>Time: </h3>
                        <p>
                            {dateTime
                                ? dateTime.startTime + "-" + dateTime.endTime
                                : "Loading times"}
                        </p>
                    </Row>
                    <Row>
                        <h3>Location:</h3>
                        <p>{eventData.location}</p>
                    </Row>

                    <Row>
                        <h3>Attending: </h3>

                        <p>{eventData ? attending : "0"} </p>
                    </Row>
                    <Row>
                        <h3>Description</h3>
                        <p>
                            {eventData
                                ? eventData.description
                                : "Loading description..."}
                        </p>
                    </Row>
                    {!going && (
                        <Button
                            onClick={() => {
                                if (isUser) {
                                    userGoing(currentEvent);
                                    setAttending(attending + 1);
                                } else {
                                    routeChange();
                                }

                                setGoing((curr) => !curr);
                            }}>
                            <Going />
                            Attend Event
                        </Button>
                    )}
                    {going && (
                        <Button
                            secondarySmall
                            onClick={() => {
                                if (isUser) {
                                    deleteUserFromEventByID(currentEvent);
                                    setAttending(attending - 1);
                                } else {
                                    routeChange();
                                }

                                setGoing((curr) => !curr);
                            }}>
                            <NotGoing />
                            Unattend Event
                        </Button>
                    )}
                    {isUser && (
                        <Question>
                            <h3>Ask the host about this event:</h3>
                            <Send>
                                {!sent ? (
                                    <>
                                        <Message
                                            value={question}
                                            onChange={(e) => {
                                                setQuestion(e.target.value);
                                            }}
                                        />
                                        <Button
                                            onClick={() => {
                                                sendMessage(
                                                    `Event: ${eventData.title}`,
                                                    eventData.host,
                                                    "B2A",
                                                    question,
                                                    new Date()
                                                );
                                                setSent(true);
                                            }}
                                            secondary>
                                            <SendIcon />
                                            Send
                                        </Button>
                                    </>
                                ) : (
                                    "Message Sent, check dashboard for responses"
                                )}
                            </Send>
                        </Question>
                    )}
                </Column>
            </Container>
        </PageContainer>
    );
};

export default EventPage;

// const AttendButton = styled(Button)`
//     ::after {
//         content: " ${(props) =>
//             props.clicked ? "Unattend Event" : "Attend Event"}";
//     }
// `;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: fit-content;
    h3 {
        font-size: 0.9em;
        text-transform: uppercase;
        font-weight: 700;
        color: ${(props) => props.theme.lightBlack};
        margin-right: 8px;
    }
    p {
        padding: 0;
        font-size: 1em;
    }
`;

const Column = styled.div`
    :nth-of-type(2) {
        margin-left: 16px;
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h3 {
        color: ${(props) => props.theme.purple};
        margin-bottom: 16px;
    }
    p {
        margin-bottom: 16px;
    }
`;

const Message = styled.textarea`
    resize: none;
    width: 100%;
    height: 100%;
    margin: 5px;
`;
const Send = styled.div``;
const Question = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;
// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     margin: 1em 0;
//     h3 {
//         font-weight: 700;
//     }
// `;
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    background: ${(props) => props.theme.blue};
    padding: clamp(16px, 40px, 60px);
    border-radius: 15px;
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

// const MainImage = styled.img`
//     width: 600px;
//     height: 600px;
//     margin: 10px;
//     border: 2px solid rgba(68, 68, 68, 0.1);
//     padding: 1em;

//     @media (max-width: 1000px) {
//         width: 300px;
//         height: 300px;
//         margin: 5px;
//     }
//     @media (max-width: 350px) {
//         width: 85vw;
//     }
// `;

const MainImage = styled.img`
    height: clamp(250px, 600px, 800px);
    height: clamp(250px, 600px, 800px);
    padding: 10px;
    background: ${(props) => props.theme.lightBlue};
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
        color: ${(props) => props.theme.primary};
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

const Collabs = styled(Details)`
    p {
        :first-of-type {
            ::before {
                content: "";
            }
        }

        ::before {
            content: ", ";
        }
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
