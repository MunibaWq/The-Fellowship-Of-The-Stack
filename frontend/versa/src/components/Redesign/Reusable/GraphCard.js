import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";

const GraphCard = ({ title }) => {
    return (
        <>
            <TopBar littleTitle={title} />
            <Card></Card>
        </>
    );
};

export default GraphCard;

const Card = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;
