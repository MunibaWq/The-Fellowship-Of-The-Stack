import React from "react";
import styled from "styled-components";
import EventForm from "../../components/Events/EventForm";

const EditEvent = () => {
    return (
        
        <Container>
            <h1>Edit an Event</h1>
            <EventForm type={"Edit"} />
        </Container>
    );
};

export default EditEvent;

const Container = styled.div`
    margin: 2em;
    display: flex;
    flex-direction: column;
    /* height: calc(84vh - 4em); */
    text-align: center;
`;