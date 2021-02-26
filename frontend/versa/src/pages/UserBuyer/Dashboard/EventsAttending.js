import React, { useState, useEffect } from "react";
import { AddIcon } from "../../../images/icons";

import { getAttendingEvents } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import styled from "styled-components";
import PageContainer from '../../../components/Redesign/Reusable/PageContainer'
import Header from '../../../components/Redesign/Reusable/Header'
import { StyledLink } from "../../../components/Reusable/Link";
import UserEventsTable from "../../../components/Dashboard/AnalyticsTables/UserEventsTable";

const EventsAttending = () => {
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                
                let data = await getAttendingEvents();
                setEventsData(data);
            } catch (e) {
                console.log(e);
            }
        };
        getEvents();
    }, []);

    return (
        
        <PageContainer>
            <Header title="Upcoming Events" />

            
            {!eventsData ? (
                <Loading />
            ) : (
                <UserEventsTable eventsData={eventsData} />
            )}
        </PageContainer>
    );
};

export default EventsAttending;


