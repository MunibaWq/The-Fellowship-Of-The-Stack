import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Reusable/Button";
import { AddIcon } from "../../../images/icons";

import { getMyArtistEvents } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import styled from "styled-components";

import EventsTable from "../../../components/Dashboard/AnalyticsTables/EventsTable";
import { StyledLink } from "../../../components/Reusable/Link";

const DashboardEvents = () => {
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const getMyEvents = async () => {
            try {
                let data = await getMyArtistEvents();
                setEventsData(data);
            } catch (e) {
                console.log(e);
            }
        };
        getMyEvents();
    }, []);

    return (
        <EventsContainer>
            <StyledLink
                style={{ gridColumn: 2, gridRow: 1, justifySelf: "end", height: "fit-content" }}
                secondary
                to="/dashboard/artist/events/create">
                <AddIcon />
                Create Event
            </StyledLink>

            <h1 style={{gridColumn:1, gridRow: 1}}>Dashboard Events</h1>
            {!eventsData ? (
                <Loading />
            ) : (
                <EventsTable eventsData={eventsData} />
            )}
        </EventsContainer>
    );
};

export default DashboardEvents;

const EventsContainer = styled.div`
    width: 100vw;
    padding: 5em 2em;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 80px auto;
    /* justify-content:center; */
    min-height: 100vh;
    h1 {
        margin: 0 0 0 0.55em;
        justify-self: start;
    }
    :last-of-type {
        align-self: center;
    }
`;
