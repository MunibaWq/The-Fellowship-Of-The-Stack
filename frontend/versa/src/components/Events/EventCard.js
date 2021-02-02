import React from "react";
import styled from "styled-components";
import imageTest from "../../images/imageTest.png";
import { Going, WishListIcon, Share } from "../../images/icons";

const EventCard = () => {
    return (
        <CardContainer>
            <Thumbnail src={imageTest} />
            <Name>Meet the owner: Wonderland</Name>
            <Date>Sat Feb 14 - Sunday Feb 15</Date>
            <Time>6:00 PM MST</Time>
            <Stats>
                <NumInterested>20 Interested</NumInterested>
                <NumGoing>135 Interested</NumGoing>
            </Stats>
            <Actions>
                <WishListIcon />
                <Going />
                <Share />
            </Actions>
        </CardContainer>
    );
};

export default EventCard;

const CardContainer = styled.div`
    padding: 25px;
`;

const Thumbnail = styled.img`
    width: 250px;
    height: 250px;
`;
const Name = styled.h2`
    width: 250px;
    margin-top: 10px;
`;
const Date = styled.p`
    margin-bottom: 5px;
`;
const Time = styled.p``;
const Stats = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;
`;
const NumInterested = styled.p``;
const NumGoing = styled.p``;
const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;
`;
