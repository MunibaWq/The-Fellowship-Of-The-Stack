import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Reusable/Button";
import { AddIcon } from "../../../images/icons";

import { getMyArtistEvents } from "../../../axios/gets";
import styled from "styled-components";

import EventsTable from "../../../components/Dashboard/AnalyticsTables/EventsTable";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import Header from "../../../components/Redesign/Reusable/Header";
import { StyledLink } from "../../../components/Redesign/Reusable/Link";
import Loading from "../../../components/Redesign/Reusable/Loading";

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
        <PageContainer>
            <Header title="Dashboard Events" sub="View events you have created and update them"/>
          
            

            
            {!eventsData ? (
                <Loading/>
            ) : (
                <EventsContainer>
                    <StyledLink 
                style={{ placeSelf: "flex-end"}}
                primarySmall
                to="/dashboard/artist/events/create">
                <AddIcon />
                Create Event
            </StyledLink>
                        <EventsTable eventsData={eventsData} />
                        </EventsContainer>
            )}
        </PageContainer>
    );
};

export default DashboardEvents;

const EventsContainer = styled.div`
    align-self: center;
    width: 65%;
    justify-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

`





