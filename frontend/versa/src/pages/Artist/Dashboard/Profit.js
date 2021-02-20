import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import Button from "../../../components/Reusable/Button";
import { Input, Label } from "../../../components/Reusable/Input";
const LIGHT_GREY = "hsl(355, 20%, 90%)";
const PRIMARY_COLOR = "#6b45ff";
const Container = styled.div``;

const Card = styled.div`
                            background-color: #2b2a31;
                            padding: 40px 36px 30px;
                            border-radius: 5px;

                            // when rendered in the gallery preview
  a & {
                                padding: 24px 20px 10px;
  }
`;


const sharedAxisStyles = {
    axis: {
        stroke: "transparent"
    },
    tickLabels: {
        fill: LIGHT_GREY,
        fontSize: 14
    },
    axisLabel: {
        fill: LIGHT_GREY,
        padding: 36,
        fontSize: 15,
        fontStyle: "italic"
    }
};

const GradientSvg = styled.svg`
  position: fixed;
  opacity: 0;
`;
const SliderContainer = styled.div`
  padding: 64px 25px 10px;

  // when rendered in the gallery preview
  a & {
                                padding: 24px 36px 0px;
  }
`;

const getMonth = percent =>
    Math.round(FIRST_MONTH + TOTAL_MONTHS * (percent / 100));

const SEASONS = MONTHS.map(month => monthToSeason(month));
const monthToSeason = month => `${month}-${(month + 1)}`;

const MONTHS = Object.keys(profitData).map(month => parseInt(month, 10));
const FIRST_MONTH = MONTH[0];
const LAST_MONTH = MONTHS[MONTHS.length - 1];
const TOTAL_MONTHS = LAST_MONTH - FIRST_MONTH;

const MonthSlider = ({ month, setMonth }) => {
    const [value, setValue] = useState(0);

    return (
        <SliderContainer>
            <Slider
                onChange={newValue => {
                    setValue(newValue);
                    const calculatedMonth = getMonth(newValue);

                    if (month !== calculatedMonth) {
                        setMonth(calculatedMonth);
                    }
                }}
                color={PRIMARY_COLOR}
                value={value}
                maxValue={100}
                tooltipValues={SEASONS}
            />
        </SliderContainer>
    );
};
const Profit = () => {
  
    const [month, setMonth] = useState(FIRST_MONTH);
    const [profitData, setProfitData] = useState();
    const [term, setTerm] = useState("");
    const [start, setStart] = useState("01-01-1900");
    const [end, setEnd] = useState(new Date().toUTCString());
    
    
    useEffect(() => {
        
        const fetchData = async (query) => {
            const data = []

            setProfitData(data);
        };
        let query = `${term.toUpperCase()}&${start}&${end}`;
        fetchData(query);
    }, [term, start, end]);
    
    return (
        <ProfitContainer>
            <h1>Profit</h1>
            <SearchBarDiv>
                <Label>Search by Product Title</Label>
                <SearchBar
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search"
                    type="text"
                />
                <br />
                <br />
                <Label>Date Range</Label>
                <br />
                <br />
                <Label>From:</Label>

                <Input
                    style={{ width: "20%" }}
                    onChange={(e) => {
                        let toDate = new Date(e.target.value);
                        let date1Set = toDate.setDate(toDate.getDate());
                        setStart(new Date(date1Set).toUTCString());
                    }}
                    type="date"
                />

                <Label style={{ paddingLeft: "3%" }}>To:</Label>
                <Input
                    style={{ width: "20%" }}
                    onChange={(e) => {
                        let toDate = new Date(e.target.value);
                        let date2Set = toDate.setDate(toDate.getDate() + 1);
                        setEnd(new Date(date2Set).toUTCString());
                    }}
                    type="date"
                />
            </SearchBarDiv>

            {!profitData ? (
                <Loading />
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}>
                    <PieContainer>
                            <Container>
                                <GradientSvg>
                                    <defs>
                                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="50%" y2="100%">
                                            <stop offset="0%" stopColor="#FFE29F" />
                                            <stop offset="40%" stopColor="#FFA99F" />
                                            <stop offset="100%" stopColor={PRIMARY_COLOR} />
                                        </linearGradient>
                                    </defs>
                                </GradientSvg>

                                <Card>
                                    <V.VictoryChart
                                        containerComponent={
                                            <V.VictoryVoronoiContainer
                                                labels={getTooltipText}
                                                voronoiDimension="x"
                                                labelComponent={
                                                    <V.VictoryTooltip
                                                        constrainToVisibleArea
                                                        style={{
                                                            fill: LIGHT_GREY,
                                                            fontSize: 11
                                                        }}
                                                        flyoutStyle={{
                                                            fill: "#24232a",
                                                            stroke: PRIMARY_COLOR,
                                                            strokeWidth: 0.5
                                                        }}
                                                    />
                                                }
                                            />
                                        }
                                        height={280}
                                    >
                                        <V.VictoryLabel
                                            text={`Profit by product (${monthToSeason(year)})`}
                                            x={225}
                                            y={18}
                                            textAnchor="middle"
                                            style={{ fill: LIGHT_GREY, fontSize: 16 }}
                                        />
                                        <V.VictoryAxis
                                            style={{
                                                ...sharedAxisStyles,
                                                grid: {
                                                    fill: LIGHT_GREY,
                                                    stroke: LIGHT_GREY,
                                                    pointerEvents: "painted",
                                                    strokeWidth: 0.5
                                                }
                                            }}
                                            label="Profit made"
                                            dependentAxis
                                        />
                                        <V.VictoryAxis
                                            style={{
                                                ...sharedAxisStyles,
                                                axisLabel: { ...sharedAxisStyles.axisLabel, padding: 35 }
                                            }}
                                            label="Product"
                                        />
                                        <V.VictoryHistogram
                                            cornerRadius={2}
                                            domain={{ y: [0, 125] }}
                                            animate={{ duration: 300 }}
                                            data={profitData[month]}
                                            bins={_.range(0, 16, 2)}
                                            style={{
                                                data: {
                                                    stroke: "transparent",
                                                    fill: "url(#gradient1)",
                                                    strokeWidth: 1,
                                                },
                                                labels: {
                                                    fill: "red"
                                                }
                                            }}
                                            x="3pa"
                                        />
                                    </V.VictoryChart>

                                    <MonthSlider month={month} setMonth={setMonth} />
                                </Card>
                            </Container>
                    </PieContainer>
                    
                </div>
            )}
        </ProfitContainer>
    );
};

export default SalesByProduct;


const MagnifyIcon = styled.div`
    position: absolute;
    margin-top: 20px;
    right: 10px;
`;
const SearchBarDiv = styled.div`
    position: relative;
    margin-bottom: 40px;
`;
const SearchBar = styled.input`
    padding: 5px;
    font-size: 26px;
    width: 100%;
    height: 50px;
    margin: 10px 0;
    border: 3px solid rgba(68, 68, 68, 0.1);
    border-radius: 10px;
    :focus,
    ::active,
    :hover {
        border: 3px solid ${theme.primary};
    }
    ::-webkit-input-placeholder {
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }

    ::-moz-placeholder {
        /* Firefox 19+ */
        color: rgba(68, 68, 68, 0.3);
        margin: 30px 0 0 8px;
        letter-spacing: 0.05em;
        font-size: 0.8em;
        font-weight: 700;
    }
    :-ms-input-placeholder {
        /* IE 10+ */
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }
    :-moz-placeholder {
        /* Firefox 18- */
        color: rgba(68, 68, 68, 0.3);
        letter-spacing: 0.05em;
        margin: 30px 0 0 8px;
        font-size: 0.8em;
        font-weight: 700;
    }
`;

const ProfitContainer = styled.div`
    width: 100vw;
    padding: 5em 2em;

    h1 {
        margin: 0 1em 2em 1em;
    }
`;


const PieContainer = styled.div`
    width: 500px;
    svg {
        width: fit-content;
        height: fit-content;
    }
`;
