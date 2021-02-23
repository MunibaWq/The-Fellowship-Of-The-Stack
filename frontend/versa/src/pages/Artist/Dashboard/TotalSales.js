import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import { getTotalSales } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { Circle } from "../../../images/icons";
import { DateRangeSearch } from "../../../components/Redesign/Reusable/DateRangeSearch";
import { Input, Label } from "../../../components/Reusable/Input";
import { AnalyticsTable } from "../../../components/Redesign/Reusable/AnalyticsTable";
export const sorters = {
    "Date": (one, two) => {
        return (
            new Date(`${one.month}/${one.day}/${one.year}`) -
            new Date(`${two.month}/${two.day}/${two.year}`)
        );
    },
    "Total Sales": (one, two) => {
        return one.sum - two.sum;
    },
};
const TotalSales = () => {
    const [salesData, setSalesData] = useState();
    const [graphData, setGraphData] = useState();
    const [start, setStart] = useState(new Date("01-01-1999").toUTCString());
    const [end, setEnd] = useState(new Date("01-01-2999").toUTCString());
    const [sortBy, setSortBy] = useState("Total Sales");
    useEffect(() => {
        const fetchData = async (query) => {
            const data = await getTotalSales(query);
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
        let query = `${start}&${end}`;
        fetchData(query);
    }, [start, end]);

    let headers = ["Date", "Total Sales"];

    return (
        <SBPContainer>
            <SearchBarDiv>
                <br />
                <br />
                <DateRangeSearch></DateRangeSearch>
            </SearchBarDiv>

            {!salesData ? (
                <Loading />
            ) : (
                <Data>
                    <GraphContainer>
                        <V.VictoryChart
                            domain={
                                graphData && {
                                    x: [
                                        Math.min(
                                            ...graphData.map(
                                                (values) => values.x
                                            )
                                        ),
                                        Math.max(
                                            ...graphData.map(
                                                (values) => values.x
                                            )
                                        ),
                                    ],
                                    y: [
                                        0,
                                        Math.max(
                                            ...graphData.map((sales) => sales.y)
                                        ),
                                    ],
                                }
                            }
                            theme={V.VictoryTheme.grayscale}
                            containerComponent={
                                <V.VictoryVoronoiContainer
                                    labelComponent={
                                        <V.VictoryTooltip
                                            border={0}
                                            cornerRadius={5}
                                            flyoutStyle={{
                                                stroke: "none",
                                                fill: "none",
                                            }}
                                        />
                                    }
                                    labels={({ datum }) =>
                                        `Day ${Math.round(
                                            datum.x,
                                            0
                                        )}: $${Math.round(datum.y, 2)}`
                                    }
                                />
                            }>
                            <V.VictoryLine
                                style={{
                                    labels: { fill: theme.primary },
                                    data: { stroke: theme.primary },
                                    parent: { border: "1px solid #444" },
                                }}
                                data={graphData}></V.VictoryLine>
                        </V.VictoryChart>
                        <Legend>
                            <div>
                                <Circle
                                    width="10px"
                                    height="10px"
                                    fill={theme.primary}
                                />
                                Total Orders per Day
                            </div>
                        </Legend>
                    </GraphContainer>
                    <PieContainer>
                        <V.VictoryPie
                            width="400"
                            height="300"
                            padding={{ top: 0, left: 100, right: 100 }}
                            padAngle={2}
                            innerRadius={25}
                            style={{ labels: { fontSize: 15 } }}
                            labels={({ datum }) => `${datum.x}\n $${datum.y}`}
                            colorScale={[
                                theme.primaryHover,
                                theme.primaryHover + "cc",
                                theme.primaryHover + "99",
                                theme.primaryHover + "66",
                                theme.primaryHover + "33",
                            ]}
                            data={salesData
                                .sort((one, two) => {
                                    return +one.sum - +two.sum;
                                })
                                .map((sales) => {
                                    return {
                                        y: +sales.sum,
                                        x: `${sales.day}/${sales.month}/${sales.year}`,
                                    };
                                })}
                        />
                        <Legend>
                            <div>
                                <Circle
                                    width="10px"
                                    height="10px"
                                    fill={theme.primary}
                                />
                                Days with highest sales
                            </div>
                        </Legend>
                        </PieContainer>
                        <AnalyticsTable headers={headers} setSortBy={setSortBy} tableData={salesData} sortBy={sortBy}/>
                </Data>
            )}
        </SBPContainer>
    );
};

export default TotalSales;
const SearchBarDiv = styled.div`
    position: relative;
    margin-bottom: 40px;
`;
const Data = styled.div`
    display: flex;

    flex-wrap: wrap;
`;
const Container = styled.div``;
const TableContainer = styled(Container)`

`
const SBPContainer = styled.div`
    place-self: flex-start;
`;

export const SBPTable = styled.table`
    width: 400px;

    margin: 5px;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    padding-top: 5px;
    td {
        font-weight: 500;
        padding: 6px;
        font-size: 18px;
    }
    table,
    th,
    thead {
        padding: 6px;
        border-collapse: collapse;
    }
    thead {
        border-bottom: 2px solid #9a9a9a;
        td {
            font-weight: 700;
        }
        text-align: left;
        th {
            cursor: pointer;
            text-decoration: underline;
        }
    }
`;
const GraphContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    width: 450px;
`;
const PieContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    width: 400px;
`;
const Legend = styled.div`
    div {
        display: flex;
        align-items: center;
        font-size: 8px;
        text-transform: uppercase;
    }
    display: flex;
    align-items: center;
    justify-content: space-around;
    div > svg {
        margin: 5px;
    }
`;

