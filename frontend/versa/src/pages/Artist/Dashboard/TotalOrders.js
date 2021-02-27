import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import { getTotalOrders } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import { DateRangeSearch } from "../../../components/Redesign/Reusable/DateRangeSearch";
import { Graph } from "../../../components/Redesign/Reusable/Analytics/Graph";
import { AnalyticsTable } from "../../../components/Redesign/Reusable/Analytics/AnalyticsTable";
import TableTopBar from "../../../components/Redesign/Reusable/TableTopBar";
import TopBar from "../../../components/Redesign/Reusable/TopBar";
const sorters = {
    "Date": (one, two) => {
        return (
            new Date(`${one.month}/${one.day}/${one.year}`) -
            new Date(`${two.month}/${two.day}/${two.year}`)
        );
    },
    "Order Total": (one, two) => {
        return +one.sum - +two.sum;
    },
};
const TotalOrders = () => {
    const [salesData, setSalesData] = useState();
    const [graphData, setGraphData] = useState();
    const [start, setStart] = useState(new Date("01-01-1900"));
    const [end, setEnd] = useState(new Date("2999"));
    const [sortBy, setSortBy] = useState("Order Total");

    useEffect(() => {
        const fetchData = async (query) => {
            const data = await getTotalOrders(query);
            let temp = [];
            data.map((sales) => {
                return temp.push({
                    x: sales.day,
                    y: parseFloat(sales.sum),
                });
            });
            setGraphData(temp);
            setSalesData(data);
        };
        let query = `${start.toUTCString()}&${end.toUTCString()}`;
        fetchData(query);
    }, [start, end]);

    let headers = ["Date", "Order Total"];

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
                            <TopBar title="Total Orders Per Day" />
                            <Graph
                                legendTitle="Total Orders Per Day"
                                graphData={graphData}
                                labels={({ datum }) =>
                                    `Day ${Math.round(
                                        datum.x,
                                        0
                                    )}: ${Math.round(datum.y, 0)}`
                                }
                            />
                        </Card>
                    </Left>
                    <Right>
                        <Card>
                            <TableTopBar
                                setSortBy={setSortBy}
                                titles={headers}
                            />
                            <AnalyticsTable
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

export default TotalOrders;
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
