import React from "react";
import * as V from "victory";
import theme from "../Theme";
import { Circle } from "../../../../images/icons";
import {
    PieContainer,
    Legend
} from "./AnalyticsContainers";

export const Pie = ({ data }) => {
    return (
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
                    theme.purple,
                    theme.purple + "cc",
                    theme.purple + "99",
                    theme.purple + "66",
                    theme.purple + "33",
                ]}
                data={data
                    .sort((one, two) => {
                        return +two.sum - +one.sum;
                    })
                    
                    .map((sales) => {
                        return {
                            y: +sales.sum,
                            x: `${sales.day}/${sales.month}/${sales.year}`,
                        };
                    })
                    .reduce((reduced, current, index) => {
                        let newArray = reduced
                        if (index < 4) {
                            newArray.push(current)
                        } else {
                            newArray[3].x = 'Other'
                            newArray[3].y += current.y
                        }
                        reduced = newArray
                        return reduced;
                    },[])} />
            
        </PieContainer>
    );
};
