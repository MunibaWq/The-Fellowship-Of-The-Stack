import React from "react";
import styled from "styled-components";
import { VGraph } from "./Graph";
import { View } from "../../../images/icons";
import { StyledLink } from "./Link";
import TopBar from "./TopBar";

const GraphCard = ({ title, stat, statLabel, link, data }) => {
    return (
        <>
            <TopBar littleTitle={title} />
            <Card>
                <Overview>
                    <Stats>
                        <p>{stat}</p>
                        <p>{statLabel}</p>
                    </Stats>
                    <StyledLink primaryExtraSmall to={link}>
                        <View /> View
                    </StyledLink>
                </Overview>
                <Graph>
                    <VGraph data={data} />
                </Graph>
            </Card>
        </>
    );
};
export default GraphCard;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background: ${(props) => props.theme.lightBlue};
`;
const Overview = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;
const Stats = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-weight: 700;
        font-size: 0.8em;

        :first-of-type {
            font-size: 1.5em;
            font-weight: 700;
            margin-bottom: 0;
        }
    }
`;

const Graph = styled.div``;
