import React from "react";
import * as V from "victory";
import { Circle } from "../../../../images/icons";
import { GraphContainer, Legend } from "./AnalyticsContainers";
import theme from '../Theme'
export const Graph = ({ graphData }) => {
    return <GraphContainer>
        <V.VictoryChart
            domain={graphData && {
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
            }}
            theme={V.VictoryTheme.grayscale}
            containerComponent={<V.VictoryVoronoiContainer
                labelComponent={<V.VictoryTooltip
                    border={0}
                    cornerRadius={5}
                    flyoutStyle={{
                        stroke: "none",
                        fill: "none",
                    }} />}
                labels={({ datum }) => `Day ${Math.round(
                    datum.x,
                    0
                )}: $${Math.round(datum.y, 2)}`} />}>
            <V.VictoryLine
                style={{
                    labels: { fill: theme.purple },
                    data: { stroke: theme.purple },
                    parent: { border: "1px solid #444" },
                }}
                data={graphData}></V.VictoryLine>
        </V.VictoryChart>
        
    </GraphContainer>;
};
