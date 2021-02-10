import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Reusable/Button";
import { AddIcon } from "../../../images/icons";

import { getAllArtistEvents } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import styled from "styled-components";

import EventsTable from "../../../components/Dashboard/AnalyticsTables/EventsTable";

const DashboardEvents = () => {
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const getArtistEvents = async () => {
            let data = await getAllArtistEvents(22);
            setEventsData(data);
        };
        getArtistEvents();
    }, []);
    console.log(eventsData);
    return (
        <div>
            Dashboard Events
            <Link to="/dashboard/events/create">
                <Button>
                    <AddIcon />
                    Create Event
                </Button>
            </Link>
            <EventsContainer>
                {!eventsData ? (
                    <Loading />
                ) : (
                    <EventsTable eventsData={eventsData} />
                )}
            </EventsContainer>
        </div>
    );
};

export default DashboardEvents;

const EventsContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);
    display: grid;
    grid-template-rows: auto auto;

    h1 {
        margin: 0 1em 2em 1em;
    }
`;
