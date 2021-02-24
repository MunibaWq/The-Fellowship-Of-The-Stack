import React from "react";
import styled from "styled-components";
import EventForm from "../../components/Events/EventForm";
import PageContainer from '../../components/Redesign/Reusable/PageContainer'
import Header from '../../components/Redesign/Reusable/Header'
const CreateEvent = () => {
    return (
        <PageContainer>
            <Header title="Create an Event" />
            <EventForm type={"Add"} />
        </PageContainer>
    );
};

export default CreateEvent;

