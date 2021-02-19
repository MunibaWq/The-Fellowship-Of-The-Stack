import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as V from "victory";
import { getTotalSales } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import { Circle } from "../../../images/icons";
import { Input, Label } from "../../../components/Reusable/Input";

const TotalSales = () => {
    const [salesData, setSalesData] = useState();
    const [graphData, setGraphData] = useState();
    const currentUser = 1;
    const [start, setStart] = useState("01-01-1900");
    const [end, setEnd] = useState(new Date().toUTCString());
    useEffect(() => {
        console.log("term,start,end", start, end);
        const fetchData = async (query) => {
            const data = await getTotalSales(query);
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
        let query = `${start}&${end}`;
        fetchData(query);
    }, [start, end]);

    let headers = ["Date", "Total Sales"];

    return (
        <SBPContainer>
            
            <h1>Total Sales Per Day</h1>
            <SearchBarDiv>
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
                        let date2Set = toDate.setDate(toDate.getDate()+1);
                        setEnd(new Date(date2Set).toUTCString());
                    }}
                    type="date"
                />
            </SearchBarDiv>
            
            {!salesData ? (
                <Loading />
            ) : (
                <Data>
                <GraphContainer>
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
                        </GraphContainer>
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
                                theme.primaryHover,
                                theme.primaryHover + "cc",
                                theme.primaryHover + "99",
                                theme.primaryHover + "66",
                                theme.primaryHover + "33",
                            ]}
                                data={salesData.sort((one, two) => { return +one.sum - +two.sum }).map((sales) => {
                                return {
                                    y: +sales.sum,
                                    x: `${sales.day}/${sales.month}/${sales.year}`,
                                };
                            })}
                            />
                            <Legend>
                        <div>
                            <Circle
                                width="10px"
                                height="10px"
                                fill={theme.primary}
                            />
                            Days with highest sales
                        </div>
                        </Legend>
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
                </Data>
            )}
        </SBPContainer>
    );
};

export default TotalSales;
const SearchBarDiv = styled.div`
    position: relative;
    margin-bottom: 40px;
`;
const Data = styled.div`


        display:flex;
      
        flex-wrap: wrap;

`
const SBPContainer = styled.div`
    
    width: 100vw;
    padding: 5em 2em;

    h1 {
        margin: 0 1em 2em 1em;
    }
`;

const SBPTable = styled.table`
    width: 400px;

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
const GraphContainer = styled.div`
    display:flex;
    flex-direction: column;
    width:450px;
    `
const PieContainer = styled.div`
display:flex;
    flex-direction: column;
    width: 400px;
    
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
