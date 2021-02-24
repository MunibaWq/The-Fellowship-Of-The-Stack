import * as V from "victory";
import { Circle } from "../../../images/icons";
import styled from "styled-components";

export const VGraph = ({ data }) => {
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
                        labels: { fill: "B4FFC6" },
                        data: { stroke: "#B4FFC6" },
                        parent: { border: "2px solid #1C1C1C" },
                    }}
                    data={data.graphActual}></V.VictoryLine>
                <V.VictoryLine
                    style={{
                        labels: { fill: "#E0B8FF" },
                        data: { stroke: "#E0B8FF" },
                        parent: { border: "2px solid #00ff00" },
                    }}
                    data={data.graphGoal}></V.VictoryLine>
            </V.VictoryChart>
            <Legend>
                <div>
                    <Circle width="10px" height="10px" fill="#E0B8FF" />
                    Goal
                </div>
                <div>
                    <Circle width="10px" height="10px" fill="#B4FFC6" />
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
