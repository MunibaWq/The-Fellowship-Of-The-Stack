import React from "react";
import styled from "styled-components";
import EventForm from "../../components/Events/EventForm";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import Header from '../../components/Redesign/Reusable/Header'
const EditEvent = () => {
    return (
        
        <PageContainer>
            <Header title="Edit Event"/>
            <EventForm type={"Edit"} />
        </PageContainer>
    );
};

export default EditEvent;

const Container = styled.div`
    margin: 2em;
    display: flex;
    flex-direction: column;
    /* height: calc(84vh - 4em); */
    text-align: center;
    width:90vw;
`;