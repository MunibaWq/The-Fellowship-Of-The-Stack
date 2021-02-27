import React from "react";
import styled from "styled-components";
import * as V from "victory";
import theme from "../../../components/Reusable/Colors";

const PieContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${props=>props.theme.lightBlue};
`;
class CustomLabel extends React.Component {
    render() {
        return (
            <g>
                <V.VictoryTooltip
                    {...this.props}
                    x={200}
                    y={200}
                    orientation="top"
                    pointerLength={0}
                    cornerRadius={50}
                    flyoutWidth={100}
                    flyoutHeight={100}
                    flyoutStyle={{ fill: theme.primary }} />
            </g>
        );
    }
}
CustomLabel.defaultEvents = V.VictoryTooltip.defaultEvents;
export function Pie({ sorters, pieData }) {
    console.log('Pie', pieData)
    return (
        <PieContainer>
            <V.VictoryPie
                width="400"
        height="300"
                padding={{
                   top: 0,
                   left: 100,
                   right:100,
                }}
                padAngle={2}
                innerRadius={125}
                labelRadius={150}
                labelComponent={<CustomLabel />}
                labels={({ datum }) => `${datum.x}: $${+datum.y}`}
                colorScale={[
                    theme.primaryHover,
                    theme.primaryHover + "cc",
                    theme.primaryHover + "99",
                    theme.primaryHover + "66",
                    theme.primaryHover + "33",
                    theme.primaryHover + "18",
                ]}
                data={pieData
                    .sort(sorters["Total Sales"])
                    .reduce((array, product, index) => {
                        if (index < 4) {
                            array.push({ ...product });
                        } else {
                            array[3].title = "Other";
                            array[3].sum = +array[3].sum + +product.sum;
                        }

                        return array;
                    }, [])
                    .map((product) => {
                        return {
                            x: product.title.split(" ").join(`\n`) +
                                `\n${product.size !== "O"
                                    ? product.size + " "
                                    : ""}${product.color !== "O" ? product.color : ""}`,
                            y: +product.sum,
                        };
                    })} />
        </PieContainer>
    );
}
