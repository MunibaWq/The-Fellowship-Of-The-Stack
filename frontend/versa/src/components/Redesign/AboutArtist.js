import React from "react";
import styled from "styled-components";
import Box from "./Reusable/Box";
import TopBar from "./Reusable/TopBar";

const AboutArtist = ({ artist }) => {
    return (
        <Container>
            <TopBar title={`Meet the Artist: ${artist} `} />
        </Container>
    );
};

export default AboutArtist;

const Container = styled.div``;
