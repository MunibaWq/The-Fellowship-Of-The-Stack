import React, { useState } from "react";
import styled from "styled-components";
import imageTest from "../../images/imageTest.png";
import { Going, WishListIcon, Share, NotGoing } from "../../images/icons";
import Button from "../Reusable/Button";
import theme from "../Reusable/Colors";

const EventCard = () => {
    const [interested, setInterested] = useState(false);
    const [going, setGoing] = useState(false);

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
                <ActionButton
                    onClick={() => {
                        setInterested((curr) => !curr);
                    }}
                >
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
                            <WishListIcon
                                fill="white"
                                stroke={theme.primary}
                                width="33"
                                height="33"
                            />
                        </div>
                    )}
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        setGoing((curr) => !curr);
                    }}
                >
                    {!going && (
                        <div>
                            <Going width="33" height="33" />
                        </div>
                    )}
                    {going && <NotGoing width="33" height="33" />}
                </ActionButton>
                <ActionButton>
                    <Share width="33" height="33" />
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
