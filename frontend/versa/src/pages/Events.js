import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "../components/Events/EventCard";
import { searchEvents, getAllEvents } from "../axios/gets";
import { Magnifying } from "../images/icons";
import Loading from "../components/Reusable/Loading";
import theme from "../components/Reusable/Colors.js";
import {
    FieldContainer,
    Input,
    Label,
    TextField,
} from "../components/Reusable/Input";

const Events = () => {
    const [events, setEvents] = useState();
    const [searchQuery, setSearchQuery] = useState();
    const [date1, setDate1] = useState();
    const [date2, setDate2] = useState();
    const [dateResults, setDateResults] = useState();

    console.log("date 1 " + date1);
    console.log("date 2 " + date2);
    useEffect(() => {
        const getEvents = async () => {
            let data = await getAllEvents();
            setEvents(data);
        };
        getEvents();
    }, []);

    const search = async () => {
        let data = await searchEvents(searchQuery);
        setEvents(data);
    };

    return (
        <EventsResults>
            <h1>Events</h1>
            <SearchBarDiv>
                <MagnifyIcon
                    onClick={() => {
                        if (searchQuery) {
                            search();
                        }
                    }}>
                    <Magnifying stroke={theme.primary} strokeWidth="4" />
                </MagnifyIcon>
                <SearchBar
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            search();
                        }
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    type="text"
                />
                <Label>From:</Label>

                <Input
                    style={{ width: "20%" }}
                    onChange={(e) => {
                        let toDate = new Date(e.target.value);
                        let date1Set = toDate.setDate(toDate.getDate() + 1);
                        setDate1(new Date(date1Set));
                    }}
                    type="date"
                />

                <Label style={{ paddingLeft: "3%" }}>To:</Label>
                <Input
                    style={{ width: "20%" }}
                    onChange={(e) => {
                        let toDate = new Date(e.target.value);
                        let date2Set = toDate.setDate(toDate.getDate() + 1);
                        setDate2(new Date(date2Set));
                    }}
                    type="date"
                />
            </SearchBarDiv>

            <Results>
                {!events ? (
                    <Loading />
                ) : events.length > 0 ? (
                    events
                        .sort((event1, event2) => {
                            let eventDate1 = new Date(event1.start_time);
                            let eventDate2 = new Date(event2.start_time);

                            {
                                console.log("eventTime " + eventDate1);
                            }
                            if (new Date() - eventDate1 > 0) {
                                return 1;
                            } else if (new Date() - eventDate2 > 0) {
                                return -1;
                            }
                            return eventDate1 - eventDate2;
                        })

                        .map((theEvent) =>
                            date1 || date2 ? (
                                date1 <=
                                    new Date(theEvent.end_time).setDate(
                                        new Date(theEvent.end_time).getDate() +
                                            1
                                    ) &&
                                date2 >=
                                    new Date(theEvent.start_time).setDate(
                                        new Date(
                                            theEvent.start_time
                                        ).getDate() - 1
                                    ) ? (
                                    <EventCard
                                        key={theEvent.id}
                                        theEvent={theEvent}
                                    />
                                ) : null
                            ) : (
                                <EventCard
                                    key={theEvent.id}
                                    theEvent={theEvent}
                                />
                            )
                        )
                ) : (
                    // .map((theEvent) => (
                    //     <EventCard key={theEvent.id} theEvent={theEvent} />
                    // ))
                    <NoResultsMessage>No results found</NoResultsMessage>
                )}
            </Results>
        </EventsResults>
    );
};

export default Events;

const EventsResults = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4%;
`;

const Results = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: ${(props) =>
        props.loading ? "auto" : "repeat(auto-fit, minmax(300px, 1fr))"};
    margin: 1.5em;
`;

const NoResultsMessage = styled.h1`
    font-size: 25px;
`;
const MagnifyIcon = styled.div`
    position: absolute;
    margin-top: 20px;
    right: 10px;
`;
const SearchBarDiv = styled.div`
    position: relative;
`;
const SearchBar = styled.input`
    padding: 5px;
    font-size: 26px;
    width: 100%;
    height: 50px;
    margin: 10px 0;
    border: 3px solid rgba(68, 68, 68, 0.1);
    border-radius: 10px;
    :focus,
    ::active,
    :hover {
        border: 3px solid ${theme.primary};
    }
    ::-webkit-input-placeholder {
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }

    ::-moz-placeholder {
        /* Firefox 19+ */
        color: rgba(68, 68, 68, 0.3);
        margin: 30px 0 0 8px;
        letter-spacing: 0.05em;
        font-size: 0.8em;
        font-weight: 700;
    }
    :-ms-input-placeholder {
        /* IE 10+ */
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }
    :-moz-placeholder {
        /* Firefox 18- */
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }
`;
