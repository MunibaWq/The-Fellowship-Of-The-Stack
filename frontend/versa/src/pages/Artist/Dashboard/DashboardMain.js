import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
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
const DashboardMain = () => {
    const dispatch = useDispatch();
    console.log(salesData);
    return (
        <DashboardContainer>
            <Greeting>Hello, Danielle</Greeting>
            <StoreDash>
                {/* <History>
                    They can toggle the date to go to past day version of
                    dashbord. eg to see yesterdays orders, sales etc
                </History> */}
                <Orders
                    dataTitle="Orders this month"
                    graphData={ordersData}
                    total="123"
                    totalLabel="orders"
                    title="Orders"
                ></Orders>
                <RecentOrders
                    dataTitle="5 most recent"
                    tableData={recentOrders}
                    total="12"
                    totalLabel="Unfulfilled"
                    title="Recent Orders"
                ></RecentOrders>
                <SalesPerOrder
                    dataTitle="Average per week"
                    total="$107.23"
                    totalLabel="Average"
                    graphData={avgOrderData}
                    title={`Sales Per Order`}
                ></SalesPerOrder>
                <Inventory
                    dataTitle="5 lowest in stock"
                    total="7"
                    totalLabel="Low stock"
                    tableData={productData}
                    title="Inventory"
                ></Inventory>
                <SalesByProduct
                    dataTitle="Top 5 products"
                    total="$3.5k"
                    totalLabel="Top Product Sales"
                    pieData={salesByProductData}
                    title="Sales By Product"
                />
                {/* <Profit>Small Card with number of total profit</Profit> */}
                <MonthlySales
                    dataTitle="Sales per week"
                    total="$37.5k"
                    totalLabel="Total"
                    title="Monthly Sales"
                    graphData={salesData}
                ></MonthlySales>
                {/* <Events>card showing 5 cards inside of upcoming events</Events> */}
            </StoreDash>
        </DashboardContainer>
    );
};
export default DashboardMain;
const DashboardContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);
    background-color: #eff3fe;
`;

const UserDash = styled.div``;
const Orders = styled(DashCard)``;
const RecentOrders = styled(DashCard)``;
const Inventory = styled(DashCard)``;
const SalesPerOrder = styled(DashCard)``;
const SalesByProduct = styled(DashCard)``;
const Events = styled(DashCard)``;
const MonthlySales = styled(DashCard)``;
const Profit = styled(DashCard)``;
const History = styled(DashCard)``;
const Wishlist = styled(DashCard)``;
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
