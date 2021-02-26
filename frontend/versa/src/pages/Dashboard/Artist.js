import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import Header from "../../components/Redesign/Reusable/Header";
import GraphCard from "../../components/Redesign/Reusable/GraphCard";
import { getMyArtistEvents } from "../../axios/gets";
import {
    ordersData,
    productData,
    salesData,
    avgOrderData,
    salesByProductData,
    recentOrders,
} from "../Artist/Dashboard/data";
import TableCard from "../../components/Redesign/Reusable/TableCard";
import PieCard from "../../components/Redesign/Reusable/PieCard";

const Artist = () => {
    console.log();
    const cookies = new Cookies();
    const [eventsData, setEventsData] = useState();

    useEffect(() => {
        const fetchData = async (currentUser) => {
            let data = await getMyArtistEvents();
            setEventsData(data);
        };
        window.scrollTo({
            top: 0,
            left: 0,
        });
        fetchData();
    }, []);
    let eventsTableData = {};
    eventsData
        ? (eventsTableData = {
              table: {
                  headers: ["Event", "Date", "Location"],
                  values: [],
              },
          }) &&
          eventsData.map((event) =>
              eventsTableData.table.values.push([
                  event.title,
                  event.start_time,
                  event.location,
              ])
          )
        : (eventsTableData = {
              table: {
                  headers: ["Events"],
                  values: [["No upcoming events"]],
              },
          });
    return (
        <PageContainer>
            <Header
                title={`Hello, ${cookies.get("name")}`}
                sub="Here is your summary for today."
            />
            <CardList>
                <GraphCard
                    title="Total Orders This Month"
                    statNum="68"
                    statLabel="Orders"
                    data={ordersData}
                    link="/dashboard/artist/analytics"
                />
                <TableCard
                    title="Recent Orders"
                    statNum="12"
                    statLabel="Unfulfilled"
                    link="/dashboard/artist/recent-orders"
                    data={recentOrders}
                />
                <PieCard
                    title="Top 5 Products"
                    statNum="$1.1k"
                    statLabel="Top Product Sales"
                    data={salesByProductData}
                    link="/dashboard/artist/analytics"
                />
                <GraphCard
                    title="Total Sales This Month"
                    statNum="$7.6k"
                    link="/dashboard/artist/analytics"
                    statLabel="Sales"
                    data={salesData}
                />
                <TableCard
                    title="Inventory"
                    statNum="5"
                    statLabel="Low Stock Products"
                    link="/dashboard/artist/inventory"
                    data={productData}
                />
                <GraphCard
                    title="Average Order Value This Month"
                    statNum="$213"
                    statLabel="Average"
                    link="/dashboard/artist/analytics"
                    data={avgOrderData}
                />
                <TableCard
                    title="Events"
                    statNum="3"
                    statLabel="Upcoming Events"
                    link="/dashboard/artist/manage-events"
                    data={eventsTableData}
                />
            </CardList>
        </PageContainer>
    );
};

export default Artist;

const CardList = styled.div`
    margin: 2em 0;
    align-self: flex-start;
    width: 100%;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(390px, 1fr));
    height: fit-content;
`;
