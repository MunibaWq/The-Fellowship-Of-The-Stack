import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "../components/Events/EventCard";
import { searchEvents, getAllEvents } from "../axios/gets";
import { Magnifying } from "../images/icons";
import Loading from "../components/Reusable/Loading";
import theme from "../components/Reusable/Colors.js";

const Events = () => {
    const [events, setEvents] = useState();
    const [searchQuery, setSearchQuery] = useState();

    useEffect(() => {
        const getEvents = async () => {
            let data = await getAllEvents();
            console.log("get events", data);
            setEvents(data);
        };
        getEvents();
        console.log("set events", events);
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
            </SearchBarDiv>
            <Results>
                {!events ? (
                    <Loading />
                ) : events.length > 0 ? (
                    events.map((theEvent) => (
                        <EventCard key={theEvent.id} theEvent={theEvent} />
                    ))
                ) : (
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
