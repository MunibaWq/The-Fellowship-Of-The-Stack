import React from "react";

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
const DriverDashboardMain = () => {
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user);
    console.log(salesData);
    return (
        <DashboardContainer>
            <Greeting>Hello, Driver</Greeting>
            <StoreDash>
                {/* <History>
                    They can toggle the date to go to past day version of
                    dashbord. eg to see yesterdays orders, sales etc
                </History> */}

                <RecentOrders
                    buttonText="View"
                    dataTitle="5 most recent"
                    tableData={recentOrders}
                    total="12"
                    totalLabel="Unfulfilled"
                    title="Daily deliveries"
                    link="/dashboard/recent-orders"></RecentOrders>
                <RecentOrders
                    buttonText="View"
                    dataTitle="5 most recent"
                    tableData={recentOrders}
                    total="12"
                    totalLabel="Unfulfilled"
                    title="Monthly deliveries"
                    link="/dashboard/recent-orders"></RecentOrders>
                <SalesPerOrder
                    buttonText="Reports"
                    dataTitle="Average per week"
                    total="$107.23"
                    totalLabel="Average"
                    graphData={avgOrderData}
                    title={`Daily Earnings`}
                    link="/dashboard/average-order-value"></SalesPerOrder>
                {/* <Profit>Small Card with number of total profit</Profit> */}
                <MonthlySales
                    buttonText="Reports"
                    dataTitle="Sales per week"
                    total="$37.5k"
                    totalLabel="Total"
                    title="Monthly Earnings"
                    graphData={salesData}
                    link="/dashboard/total-sales"></MonthlySales>
                {/* <Events>card showing 5 cards inside of upcoming events</Events> */}
            </StoreDash>
        </DashboardContainer>
    );
};
export default DriverDashboardMain;
const DashboardContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);
    background-color: #eff3fe;
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
    width: 100vw;
    margin: 1em;
    grid-row-gap: 30px;
    grid-column-gap: 50px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
`;
const Greeting = styled.h1`
    margin: 0 1em 2em 1em;
`;
