import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Reusable/Button";
import { AddIcon } from "../../../images/icons";

import { getMyArtistEvents } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import styled from "styled-components";

import EventsTable from "../../../components/Dashboard/AnalyticsTables/EventsTable";

const DashboardEvents = () => {
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const getMyEvents = async () => {
            let data = await getMyArtistEvents();
            setEventsData(data);
        };
        getMyEvents();
    }, []);

    console.log(eventsData);
    return (
        <div>
            <Link to="/dashboard/events/create">
                <Button secondary style={{ float: "right" }}>
                    <AddIcon />
                    Create Event
                </Button>
            </Link>
            <EventsContainer style={{ width: "100%" }}>
                <h1>Dashboard Events</h1>
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
    padding: 2em 3em 2em calc(2em + 66px);
    display: grid;
    grid-template-rows: auto auto;

    h1 {
        margin: 0 1em 2em 1em;
    }
`;
