import React from "react";
import styled from "styled-components";
import grow from "../images/grow.svg";
import connect from "../images/connect.svg";
import support from "../images/support.svg";
import { Link } from "react-router-dom";
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

                    <StyledLink to="/driverDashboard">
                        Earn a living as a driver
                        <RightIcon stroke={theme.primary} />
                    </StyledLink>
                    <StyledLink to="/log-in">
                        Grow your business as an artist
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
    margin: 3em 0;
    h1 {
        margin-bottom: 1em;
    }
    @media screen and (max-width: 768px) {
        p{
            padding: 0 0.8em;
        }
    @media screen and (max-width: 420px) {
        p{
            padding: 0 0.8em;
        }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media screen and (max-width: 420px) {
        flex-direction: column;
    }
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const ActionLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        max-width: 300px;
    }
    justify-content: flex-start;
    h2 {
        text-align: center;
        font-weight: 700;
        margin: 1em;
    }
    @media screen and (max-width: 768px) {
        align-items: flex-start;
        img {
            width: 300px;
        }
    }
    @media screen and (max-width: 768px) {
        align-items: flex-start;
        img {
            width: 200px;
        }
    }
    @media screen and (max-width: 420px) {
        img {
            width: 150px;
        }
    }
`;

const StyledLink = styled(Link)`
    font-size: 1em;
    font-weight: 700;
    color: ${theme.primary};
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 8px;
`;
