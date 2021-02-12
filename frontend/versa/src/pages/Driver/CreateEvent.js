import React from "react";
import styled from "styled-components";
import EventForm from "../../components/Events/EventForm";

const CreateEvent = () => {
    return (
        
        <Container>
            <h1>Create an Event</h1>
            <EventForm type={"Add"} />
        </Container>
    );
};

export default CreateEvent;

const Container = styled.div`
    margin: 2em;
    display: flex;
    flex-direction: column;
    /* height: calc(84vh - 4em); */
    text-align: center;
`;