import React, { useState } from "react";
import styled from "styled-components";
import imageTest from "../../images/imageTest.png";
import { Going, WishListIcon, Share, NotGoing } from "../../images/icons";
import Button from "../Reusable/Button";
import theme from "../Reusable/Colors";

const EventCard = ({
    id,
    name,
    host,
    description,
    status,
    capacity,
    start_time,
    end_time,
    location,
    thumbnail,
    type,
    num_attendees,
}) => {
    const [interested, setInterested] = useState(false);
    const [going, setGoing] = useState(false);

    return (
        <CardContainer>
            {thumbnail ? (
                <Thumbnail src={thumbnail} />
            ) : (
                <Thumbnail src={imageTest} />
            )}
            <Name>{name}</Name>
            <Host>{host}</Host>
            <Date>Sat Feb 14 - Sunday Feb 15</Date>
            <Time>6:00 PM MST</Time>
            <Stats>
                <NumInterested>20 Interested</NumInterested>
                <NumGoing>{num_attendees} Interested</NumGoing>
            </Stats>
            <Actions>
                <ActionButton
                    onClick={() => {
                        setInterested((curr) => !curr);
                    }}>
                    {interested && (
                        <div>
                            <WishListIcon
                                onClick={() => setInterested(false)}
                                fill="#FF0000"
                                stroke="#FF0000"
                                width="33"
                                height="33"
                            />
                            <p>Added!</p>
                        </div>
                    )}
                    {!interested && (
                        <div>
                            <WishListIcon stroke={theme.primary} />
                        </div>
                    )}
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        setGoing((curr) => !curr);
                    }}>
                    {!going && (
                        <div>
                            <Going />
                        </div>
                    )}
                    {going && <NotGoing />}
                </ActionButton>
                <ActionButton>
                    <Share />
                </ActionButton>
            </Actions>
        </CardContainer>
    );
};

export default EventCard;

const CardContainer = styled.div`
    margin: 25px;
    cursor: pointer;
`;

const Thumbnail = styled.img`
    width: 250px;
    height: 250px;
`;
const Name = styled.h2`
    width: 250px;
    margin-top: 10px;
`;
const Host = styled.h3`
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

const ActionButton = styled(Button)`
    flex-direction: column;
    margin: 0;
    padding: 0;
    :hover,
    :focus,
    :active {
        transform: scale(1.05);
    }
    p {
        font-size: 0.5em;
    }
`;
