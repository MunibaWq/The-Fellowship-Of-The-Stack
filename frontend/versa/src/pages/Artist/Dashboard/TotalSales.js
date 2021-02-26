import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getTotalSales } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import { DateRangeSearch } from "../../../components/Redesign/Reusable/DateRangeSearch";
import { AnalyticsTable } from "../../../components/Redesign/Reusable/Analytics/AnalyticsTable";
import { Graph } from "../../../components/Redesign/Reusable/Analytics/Graph";
import { Pie } from "../../../components/Redesign/Reusable/Analytics/Pie";
import TopBar from "../../../components/Redesign/Reusable/TopBar";
import TableTopBar from "../../../components/Redesign/Reusable/TableTopBar";

const TotalSales = () => {
    const [salesData, setSalesData] = useState();
    const [graphData, setGraphData] = useState();
    const [start, setStart] = useState(new Date("01-01-1999").toUTCString());
    const [end, setEnd] = useState(new Date("01-01-2999").toUTCString());
    const [sortBy, setSortBy] = useState("Total Sales");
    const sorters = {
        "Date": (one, two) => {
            return (
                new Date(`${one.month}/${one.day}/${one.year}`) -
                new Date(`${two.month}/${two.day}/${two.year}`)
            );
        },
        "Total Sales": (one, two) => {
            return one.sum - two.sum;
        },
    };
    useEffect(() => {
        const fetchData = async (query) => {
            const data = await getTotalSales(query);
            let temp = [];
            data.map((sales) => {
                return temp.push({
                    x: sales.day,
                    y: parseFloat(sales.sum),
                });
            });
            setGraphData(temp);
            setSalesData(data);
        };
        window.scrollTo({
            top: 0,
            left: 0,
        });
        let query = `${start}&${end}`;
        fetchData(query);
    }, [start, end]);

    let headers = ["Date", "Total Sales"];

    return (
        <SBPContainer>
            <SearchBarDiv>
                <br />
                <br />
                <DateRangeSearch
                    setDate1={setStart}
                    setDate2={setEnd}></DateRangeSearch>
            </SearchBarDiv>

            {!salesData ? (
                <Loading />
            ) : (
                <Data>
                    <Left>
                        <Card>
                            <TopBar title="Total Sales Per Day" />
                            <Graph
                                legendTitle="Total Sales"
                                graphData={graphData}
                                labels={({ datum }) =>
                                    `Day ${Math.round(
                                        datum.x,
                                        0
                                    )}: $${Math.round(datum.y, 2)}`
                                }
                            />
                        </Card>
                        <Card>
                            <TopBar title="Days with highest sales" />
                            <Pie
                                data={salesData}
                                legendText="Days with highest sales"
                            />
                        </Card>
                    </Left>
                    <Right>
                        <Card>
                            <TableTopBar
                                    setSortBy={setSortBy}
                                   
                                titles={headers}
                            />

                            <AnalyticsTable
                                decimal
                                tableData={salesData}
                                sortBy={sortBy}
                                sorters={sorters}
                            />
                        </Card>
                        
                    </Right>
                </Data>
            )}
        </SBPContainer>
    );
};

export default TotalSales;
const Card = styled.div`
    border-radius: 16px 16px 0 0;
    margin: 24px;

    h4 {
        color: ${(props) => props.theme.lightBlue};
        margin: 20px 40px;
    }
`;
const Left = styled.div`
    display: grid;
    grid-template-rows: auto auto;
`;
const Right = styled.div`
    display: grid;
    grid-auto-rows: max-content;
`;
const SearchBarDiv = styled.div`
    position: relative;
    margin-bottom: 40px;
`;
const Data = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    width: 100%;
`;

const SBPContainer = styled.div`
    place-self: flex-start;
    width: 100%;
`;
