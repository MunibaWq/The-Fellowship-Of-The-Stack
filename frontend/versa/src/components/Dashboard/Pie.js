import React, { useEffect, useState } from "react";
import * as V from "victory";
import styled from "styled-components";
import theme from "../Reusable/Colors";

// salesByProductData = [
//     { x: "Goober \nCandle", y: 32 },
//     { x: "Duck \nEggs", y: 27 },
//     { x: "Totem \nCandle", y: 21 },
//     { x: "Horseshoe \nMagnet", y: 10 },
//     { x: "Other", y: 20 },
// ];

const Pie = ({ productData }) => {
    // const [salesData, setSalesData] = useState([]);

    return (
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
                data={productData.map((product) => {
                    return {
                        x: product.title.split(" ").join(`\n`),
                        y: product.sum,
                    };
                })}
            />
        </PieContainer>
    );
};

export default Pie;

const PieContainer = styled.div`
    svg {
        width: fit-content;
        height: fit-content;
    }
`;
