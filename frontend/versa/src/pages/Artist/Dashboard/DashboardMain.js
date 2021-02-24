import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DashCard from "./DashCard";
import {
    ordersData,
    productData,
    salesData,
    avgOrderData,
    salesByProductData,
    recentOrders,
} from "./data";
import Cookies from "universal-cookie";
import { getMyArtistEvents } from "../../../axios/gets";
const cookies = new Cookies();
const DashboardMain = () => {
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
        <DashboardContainer>
            <Greeting>Hello, {cookies.get("name")}</Greeting>
            <StoreDash>
                {/* <History>
                    They can toggle the date to go to past day version of
                    dashbord. eg to see yesterdays orders, sales etc
                </History> */}
                <Orders
                    buttonText="Reports"
                    dataTitle="Orders this month"
                    graphData={ordersData}
                    total="123"
                    totalLabel="orders"
                    title="Orders"
                    link="/dashboard/artist/total-orders"></Orders>
                <RecentOrders
                    buttonText="View"
                    dataTitle="5 most recent"
                    tableData={recentOrders}
                    total="12"
                    totalLabel="Unfulfilled"
                    title="Recent Orders"
                    link="/dashboard/artist/recent-orders"></RecentOrders>
                <SalesPerOrder
                    buttonText="Reports"
                    dataTitle="Average per week"
                    total="$107.23"
                    totalLabel="Average"
                    graphData={avgOrderData}
                    title={`Sales Per Order`}
                    link="/dashboard/artist/average-order-value"></SalesPerOrder>
                <Inventory
                    buttonText="View"
                    dataTitle="5 lowest in stock"
                    total="7"
                    totalLabel="Low stock"
                    tableData={productData}
                    title="Inventory"
                    link="/dashboard/artist/inventory"></Inventory>
                <SalesByProduct
                    buttonText="Reports"
                    dataTitle="Top 5 products"
                    total="$3.5k"
                    totalLabel="Top Product Sales"
                    pieData={salesByProductData}
                    title="Sales By Product"
                    link="/dashboard/artist/sales-by-products"
                />
                {/* <Profit>Small Card with number of total profit</Profit> */}
                <MonthlySales
                    buttonText="Reports"
                    dataTitle="Sales per week"
                    total="$37.5k"
                    totalLabel="Total"
                    title="Monthly Sales"
                    graphData={salesData}
                    link="/dashboard/artist/total-sales"></MonthlySales>
                <DashCard
                    buttonText="Manage"
                    dataTitle="Hosted Events"
                    total={eventsTableData.table.values.length}
                    totalLabel="Upcoming"
                    title="Events"
                    tableData={eventsTableData}
                    link="/dashboard/artist/manage-events"></DashCard>
            </StoreDash>
        </DashboardContainer>
    );
};
export default DashboardMain;
const DashboardContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);
    background-color: #eff3fe;
    width: 100vw;
    height: fit-content;
`;

const Orders = styled(DashCard)``;
const RecentOrders = styled(DashCard)``;
const Inventory = styled(DashCard)``;
const SalesPerOrder = styled(DashCard)``;
const SalesByProduct = styled(DashCard)``;
// const Events = styled(DashCard)``;
const MonthlySales = styled(DashCard)``;
// const Profit = styled(DashCard)``;
// const History = styled(DashCard)``;
// const Wishlist = styled(DashCard)``;
const StoreDash = styled.div`
    display: grid;
    margin: 1em;
    grid-row-gap: 30px;
    grid-column-gap: 50px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
`;
const Greeting = styled.h1`
    margin: 0 1em 2em 1em;
`;
