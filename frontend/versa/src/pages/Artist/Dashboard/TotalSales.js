import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import { getTotalSales } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { Circle } from "../../../images/icons";
import Button from "../../../components/Reusable/Button";

const TotalSales = () => {
    const [salesData, setSalesData] = useState();
    const [graphData, setGraphData] = useState();
    const currentUser = 1;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTotalSales(currentUser);
            let temp = [];
            data.map((sales) => {
                return temp.push({
                    x: sales.day,
                    y: parseFloat(sales.sum),
                });
            });
            console.log(temp);
            setGraphData(temp);
            setSalesData(data);
        };

        fetchData();
    }, []);
    let headers = ["Date", "Total Sales"];

    return (
        <SBPContainer>
            <Button to="/dashboard">Back to Dashboard</Button>
            <h1>Total Sales Per Day</h1>
            {!salesData ? (
                <Loading />
            ) : (
                <div>
                    <V.VictoryChart
                        domain={
                            graphData && {
                                x: [
                                    Math.min(
                                        ...graphData.map((values) => values.x)
                                    ),
                                    Math.max(
                                        ...graphData.map((values) => values.x)
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
                    <PieContainer>
                        <V.VictoryPie
                            padding={{ top: 0, left: 150, right: 150 }}
                            padAngle={2}
                            innerRadius={25}
                            style={{ labels: { fontSize: 5 } }}
                            labels={({ datum }) => `${datum.x}: $${datum.y}`}
                            colorScale={[
                                theme.primaryHover,
                                theme.primaryHover + "cc",
                                theme.primaryHover + "99",
                                theme.primaryHover + "66",
                                theme.primaryHover + "33",
                            ]}
                            data={salesData.map((sales) => {
                                return {
                                    y: sales.sum,
                                    x: `February ${sales.day}, ${sales.year}`,
                                };
                            })}
                        />
                    </PieContainer>
                    <SBPTable>
                        <thead>
                            {headers.map((header, index) => (
                                <th key={header + index}>{header}</th>
                            ))}
                        </thead>
                        <tbody>
                            {salesData.map((sales, index) => (
                                <tr key={sales.sum + index}>
                                    <td>{`February ${sales.day},${sales.year}`}</td>
                                    <td>${sales.sum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </SBPTable>
                </div>
            )}
        </SBPContainer>
    );
};

export default TotalSales;

const SBPContainer = styled.div`
    width: 100vw;
    padding: 2em 2em 2em calc(2em + 66px);

    h1 {
        margin: 0 1em 2em 1em;
    }
`;

const SBPTable = styled.table`
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
    }
`;

const PieContainer = styled.div`
    svg {
        width: fit-content;
        height: fit-content;
    }
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
