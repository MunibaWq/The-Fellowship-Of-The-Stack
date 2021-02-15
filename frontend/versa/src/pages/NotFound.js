import React from "react";
import styled from "styled-components";
import grow from "../images/grow.svg";
import connect from "../images/connect.svg";
import support from "../images/support.svg";
import { StyledLink } from "../components/Reusable/Link";
import { RightIcon } from "../images/icons";
import theme from "../components/Reusable/Colors";

const NotFound = () => {
    return (
        <Container>
            <h1>Page not found</h1>
            <p>Strengthen the Calgary community by doing the following:</p>
            <Actions>
                <ActionLinks>
                    <h2>Support</h2>
                    <img src={support} alt="support" />
                    <StyledLink to="/shop">
                        Shop from local artists
                        <RightIcon stroke={theme.primary} />
                    </StyledLink>
                    <StyledLink to="/shop">
                        View this month's Artist Spotlight
                        <RightIcon stroke={theme.primary} />
                    </StyledLink>
                </ActionLinks>
                <ActionLinks>
                    <h2>Connect</h2>
                    <img src={connect} alt="connect" />
                    <StyledLink to="/events">
                        Meet locals and talented artists at events
                        <RightIcon stroke={theme.primary} />
                    </StyledLink>
                    <StyledLink to="/dashboard/events/create">
                        Create an event as an artist
                        <RightIcon stroke={theme.primary} />
                    </StyledLink>
                </ActionLinks>
                <ActionLinks>
                    <h2>Grow</h2>
                    <img src={grow} alt="grow" />

                    <StyledLink to="/log-in">
                        Grow your business as an artist
                        <RightIcon stroke={theme.primary} />
                    </StyledLink>
                    <StyledLink to="/driverDashboard">
                        Earn more as a driver
                        <RightIcon stroke={theme.primary} />
                    </StyledLink>
                </ActionLinks>
            </Actions>
        </Container>
    );
};

export default NotFound;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3em;
    width: 100%;
    h1 {
        margin-bottom: 1em;
    }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ActionLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 400px;
    }
    justify-content: flex-start;
    h2 {
        text-align: center;
        font-weight: 700;
        margin: 1em;
    }
`;
