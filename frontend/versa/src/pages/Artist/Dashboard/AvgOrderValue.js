import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import { getAvgOrderValue } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { Circle } from "../../../images/icons";
import Button from "../../../components/Reusable/Button";
import { Input, Label } from "../../../components/Reusable/Input";
import { DateRangeSearch } from "../../../components/Redesign/Reusable/DateRangeSearch";
import TopBar from "../../../components/Redesign/Reusable/TopBar";
import { Graph } from "../../../components/Redesign/Reusable/Analytics/Graph";
import TableTopBar from "../../../components/Redesign/Reusable/TableTopBar";
import { AnalyticsTable } from "../../../components/Redesign/Reusable/Analytics/AnalyticsTable";
const sorters = {
    "Date": (one, two) => {
        return (
            new Date(`${one.month}/${one.day}/${one.year}`) -
            new Date(`${two.month}/${two.day}/${two.year}`)
        );
    },
    "Average Order Value": (one, two) => {
        return one.average - two.average;
    },
};
const AvgOrderValue = () => {
    const [salesData, setSalesData] = useState();
    const [graphData, setGraphData] = useState();
    const [start, setStart] = useState(new Date("01-01-1900"));
    const [end, setEnd] = useState(new Date('2999'));
    const [sortBy, setSortBy] = useState("Average Order Value");
    useEffect(() => {
        const fetchData = async (query) => {
            const data = await getAvgOrderValue(query);
            let temp = [];
            data.map((sales) => {
                return temp.push({
                    x: sales.day,
                    y: parseFloat(sales.average),
                });
            });
            setGraphData(temp);
            setSalesData(data);
        };
        let query = `${start.toUTCString()}&${end.toUTCString()}`;
        fetchData(query);
    }, [start, end]);

    let headers = ["Date", "Average Order Value"];

    return (
        <SBPContainer>
            <SearchBarDiv>
                <br />
                <br />
                <DateRangeSearch setDate1={setStart} setDate2={setEnd} />
            </SearchBarDiv>

            {!salesData ? (
                <Loading />
            ) : (
                    <Data>
                        <Left>
                            <Card>
                                <TopBar title="Average Order Value Per Day" />
                                <Graph
                                    graphData={graphData}
                                    labels={({ datum }) =>
                                        `Day ${Math.round(
                                            datum.x,
                                            0
                                        )}: $${Math.round(datum.y, 2)}`
                                    }
                                /></Card>
                        </Left>
                        <Right>
                            <Card>
                                <TableTopBar
                                    setSortBy={setSortBy}
                                    titles={headers}
                                />
                                <AnalyticsTable
                                    avg
                                    tableData={salesData}
                                    sortBy={sortBy}
                                    sorters={sorters}
                                />
                            </Card>
                        </Right>
                    </Data>
                )}
        </SBPContainer>
    );
};

export default AvgOrderValue;
const Card = styled.div`
    border-radius: 16px 16px 0 0;
    margin: 24px;

    h4 {
        color: ${(props) => props.theme.lightBlue};
        margin: 20px 40px;
    }
`;
const SearchBarDiv = styled.div`
    position: relative;
    margin-bottom: 40px;
`;
const Data = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
`;
const SBPContainer = styled.div`
    place-self: flex-start;
    width: 100%;
`;

const Left = styled.div`
    display: grid;
    grid-template-rows: fit-content;
`;
const Right = styled.div`
    display: grid;
    grid-template-rows: fit-content;
`;