import React from "react";
import styled from "styled-components";
import EventCard from "../components/Events/EventCard";
import { Magnifying } from "../images/icons";
import Loading from "../components/Reusable/Loading";
import theme from "../components/Reusable/Colors.js";

const Events = () => {
    // const search = async () => {
    //     let data = await searchEvents(query);
    //     setEvents(data);
    // };

    //When results can be pulled, must be organised by soonest at the top
    return (
        <EventsResults>
            {/**<SearchBarDiv>
                <MagnifyIcon
                    onClick={() => {
                        if (query) {
                            search();
                        }
                    }}
                >
                    <Magnifying stroke={theme.primary} strokeWidth="4" />
                </MagnifyIcon>
                <SearchBar
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            search();
                        }
                    }}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    type="text"
                />
            </SearchBarDiv>**/}
            <Results>
                {/**{!events ? (
                    <Loading />
                ) : events.length > 0 ? (
                    events.map((product, index) => (
                        <EventCard key={index} event={event} />
                    ))
                ) : (
                    <NoResultsMessage>No results found</NoResultsMessage>
                )}**/}
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </Results>
        </EventsResults>
    );
};

export default Events;

const EventsResults = styled.div`
    display: flex;
    flex-direction: column;
`;

const Results = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    margin: 1.5em;
`;
