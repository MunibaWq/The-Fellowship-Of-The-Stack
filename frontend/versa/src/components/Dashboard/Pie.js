import React from "react";
import * as V from "victory";
import styled from "styled-components";
import theme from "../Reusable/Colors";

const Pie = ({ data }) => {
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

export default Pie;

const PieContainer = styled.div`
    margin-top: -18px;
    margin-bottom: -18px;
`;
