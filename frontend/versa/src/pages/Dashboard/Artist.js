import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import Loading from "../../components/Redesign/Reusable/Loading";
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

const Artist = () => {
    console.log();
    const cookies = new Cookies();
    const [eventsData, setEventsData] = useState();

    useEffect(() => {
        const fetchData = async (currentUser) => {
            let data = await getMyArtistEvents();
            setEventsData(data);
        };
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
                    statNum="123"
                    statLabel="Orders"
                    data={ordersData}
                    link="/dashboard/artist/analytics"
                />
                <GraphCard
                    title="Total Sales This Month"
                    statNum="$123"
                    link="/dashboard/artist/analytics"
                    statLabel="Orders"
                    data={salesData}
                />
                {/* <GraphCard
                    title="Recent Orders"
                    statNum="123"
                    statLabel="Orders"
                    link="/dashboard/artist/recent-orders"
                    data={recentOrders}
                /> */}
                {/* <GraphCard
                    title="Inventory"
                    statNum="123"
                    statLabel="Orders"
                    link="/dashboard/artist/inventory"
                    data={productData}
                /> */}
                <GraphCard
                    title="Average Order Value"
                    statNum="$213"
                    statLabel="Average"
                    link="/dashboard/artist/analytics"
                    data={avgOrderData}
                />
                {/* <GraphCard
                    title="Events"
                    statNum="123"
                    statLabel="Orders"
                    link="/dashboard/artist/manage-events"
                    data={eventsTableData}
                /> */}
                {/* <GraphCard
                    title="Sales by Product"
                    statNum="123"
                    statLabel="Orders"
                    data={salesByProductData}
                    link="/dashboard/artist/analytics"
                /> */}
            </CardList>
        </PageContainer>
    );
};

export default Artist;

const CardList = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;
