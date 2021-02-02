import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Reusable/Button";
import theme from "../../../components/Reusable/Colors";
import { Circle, RightIcon } from "../../../images/icons";
import * as V from "victory";

const GoToPage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;

const PageLink = styled(Button)`
    margin: 0;
    padding: 0;
    border-bottom: none;
`;

const Title = styled.h1`
    flex: none;
    margin: 0;
    font-size: 1.2em;
    padding: 4px 0;
`;

const Total = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 0 0 0;

    p {
        margin: 0;
        font-size: 2em;
        color: ${theme.tertiary + "95"};
    }
    h3 {
        padding: 0 0 0 4px;
        font-size: 0.8em;
        text-transform: uppercase;
        font-weight: 700;
        color: ${theme.tertiary + "95"};
    }
`;
const AtAGlance = styled.div`
    display: flex;
    flex-direction: column;
`;
const DataTitle = styled.h2``;
const Card = styled.div`
    margin: 0;
    padding: 20px;
    width: 250px;
    background: white;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px;
    :hover {
        box-shadow: 7px 7px 30px rgba(27, 49, 66, 0.13);
    }

    transition: 0.3s;
    hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

const Graph = styled.div``;
const Table = styled.div`
    margin: 5px;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    td {
        font-weight: 300;
        padding: 6px;
        font-size: 10px;
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
    }
`;
const DashCard = (props) => {
    const {
        total,
        totalLabel,
        dataTitle,
        graphTitle,
        tableTitle,
        graphData,
        tableData,
        title,
    } = props;
    return (
        <Card>
            <AtAGlance>
                <GoToPage>
                    <Title>{title}</Title>
                    <PageLink>
                        View
                        <RightIcon stroke={theme.primary} />
                    </PageLink>
                </GoToPage>

                {total && (
                    <Total>
                        <p>{total}</p>
                        <h3>{totalLabel}</h3>{" "}
                    </Total>
                )}
            </AtAGlance>
            {graphData && (
                <>
                    <DataTitle>{dataTitle}</DataTitle>
                    <Graph>
                        <VGraph data={graphData} />
                    </Graph>
                </>
            )}
            {tableData && (
                <>
                    <DataTitle>{dataTitle}</DataTitle>
                    <Table>
                        <VTable data={tableData} />
                    </Table>
                </>
            )}
        </Card>
    );
};
const VTable = ({ data }) => {
    return (
        <table>
            <thead>
                {data.table.headers.map((header) => (
                    <td>{header}</td>
                ))}
            </thead>
            {data.table.values.map((row, index) => (
                <tr>
                    {row.map((data) => (
                        <td>{data}</td>
                    ))}
                </tr>
            ))}
        </table>
    );
};
const VGraph = ({ data }) => {
    return (
        <>
            <V.VictoryChart
                domain={{
                    x: [
                        Math.min(...data.graphGoal.map((values) => values.x)),
                        Math.max(...data.graphGoal.map((values) => values.x)),
                    ],
                    y: [
                        0,
                        Math.max(...data.graphGoal.map((values) => values.y)) *
                            1.2,
                    ],
                }}
                theme={V.VictoryTheme.grayscale}
                containerComponent={
                    <V.VictoryVoronoiContainer
                        labelComponent={
                            <V.VictoryTooltip
                                border={0}
                                cornerRadius={5}
                                flyoutStyle={{ stroke: "none", fill: "none" }}
                            />
                        }
                        labels={({ datum }) =>
                            `Week ${Math.round(datum.x, 0)}: $${Math.round(
                                datum.y,
                                2
                            )}`
                        }
                    />
                }
            >
                <V.VictoryLine
                    style={{
                        labels: { fill: "#44444495" },
                        data: { stroke: theme.primary },
                        parent: { border: "1px solid #00ff00" },
                    }}
                    data={data.graphActual}
                ></V.VictoryLine>
                <V.VictoryLine
                    style={{
                        labels: { fill: "#44444495" },
                        data: { stroke: "#00aa3377" },
                        parent: { border: "1px solid #00ff00" },
                    }}
                    data={data.graphGoal}
                ></V.VictoryLine>
            </V.VictoryChart>
            <Legend>
                <div>
                    <Circle width="10px" height="10px" fill="#00ff00" />
                    Goal
                </div>
                <div>
                    <Circle width="10px" height="10px" fill={theme.primary} />
                    Actual
                </div>
            </Legend>
        </>
    );
};
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
export default DashCard;
