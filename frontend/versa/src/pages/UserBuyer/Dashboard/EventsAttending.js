import React, { useState, useEffect } from "react";
import { AddIcon } from "../../../images/icons";

import { getAttendingEvents } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import styled from "styled-components";

import { StyledLink } from "../../../components/Reusable/Link";
import UserEventsTable from "../../../components/Dashboard/AnalyticsTables/UserEventsTable";

const EventsAttending = () => {
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                
                let data = await getAttendingEvents();
                console.log('here it is', data)
                setEventsData(data);
            } catch (e) {
                console.log(e);
            }
        };
        getEvents();
    }, []);

    console.log(eventsData);
    return (
        <EventsContainer>
            

            <h1>Upcoming Events</h1>
            {!eventsData ? (
                <Loading />
            ) : (
                <UserEventsTable eventsData={eventsData} />
            )}
        </EventsContainer>
    );
};

export default EventsAttending;

const EventsContainer = styled.div`
    width: 100vw;
    padding: 5em 2em;
    display: grid;
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
