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
    align-items: flex-start;
    width: 100%;
`;

const PageLink = styled(Button)`
    svg {
        margin: 0 -5px;
        fill: ${theme.primary};
    }
    font-size: 0.8em;
    margin: 0;
    padding: 0;
    border-bottom: none;
`;

const Title = styled.h1`
    max-width: 133px;
    flex: none;
    margin: 0;
    font-size: 1em;
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
const DataTitle = styled.h2`
    text-align: center;
    font-size: 0.8em;
    font-weight: 700;
    margin: 30px 0 0 0;
`;
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
`;

const Graph = styled.div``;
const Table = styled.div`
    margin: 5px;
    display: flex;
    justify-content: center;
    padding-top: 5px;
    td {
        font-weight: 300;
        padding: 6px;
        font-size: 10px;
    }
    table,
    th,
    thead {
        padding: 6px;
        font-size: 12px;
        border-collapse: collapse;
    }
    thead {
        border-bottom: 2px solid #9a9a9a;
        td {
            font-weight: 700;
        }
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
const PieContainer = styled.div`
    margin-top: -18px;
    margin-bottom: -18px;
`;
const DashCard = (props) => {
    const {
        buttonText,
        total,
        totalLabel,
        dataTitle,
        pieData,
        graphData,
        tableData,
        title,
        link,
    } = props;
    return (
        <Card>
            <AtAGlance>
                <GoToPage>
                    <Title>{title}</Title>
                    <Link to={link}>
                        <PageLink>
                            {buttonText}
                            <RightIcon stroke={theme.primary} />
                        </PageLink>
                    </Link>
                </GoToPage>

                {total && (
                    <Total>
                        <p>{total}</p>
                        <h3>{totalLabel}</h3>{" "}
                    </Total>
                )}
            </AtAGlance>
            {pieData && (
                <>
                    <DataTitle>{dataTitle}</DataTitle>
                    <Graph>
                        <VPie data={pieData} />
                    </Graph>
                </>
            )}
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
const VPie = ({ data }) => {
    return (
        <PieContainer>
            <V.VictoryPie
                padding={{ top: 0, left: 100, right: 100 }}
                padAngle={2}
                innerRadius={50}
                labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                colorScale={[
                    theme.primaryHover,
                    theme.primaryHover + "cc",
                    theme.primaryHover + "99",
                    theme.primaryHover + "66",
                    theme.primaryHover + "33",
                ]}
                data={data}
            />
        </PieContainer>
    );
};
const VTable = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {data.table.headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            {data.table.values.map((row, index) => (
                <tr key={index}>
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
                }>
                <V.VictoryLine
                    style={{
                        labels: { fill: theme.primary },
                        data: { stroke: theme.primary },
                        parent: { border: "1px solid #00ff00" },
                    }}
                    data={data.graphActual}></V.VictoryLine>
                <V.VictoryLine
                    style={{
                        labels: { fill: "#00aa33" },
                        data: { stroke: "#00aa3377" },
                        parent: { border: "1px solid #00ff00" },
                    }}
                    data={data.graphGoal}></V.VictoryLine>
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

export default DashCard;
