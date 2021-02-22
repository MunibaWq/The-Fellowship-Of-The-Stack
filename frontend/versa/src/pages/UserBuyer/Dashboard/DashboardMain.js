import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DashCard from "../../Artist/Dashboard/DashCard";

import Cookies from "universal-cookie";
import { getAttendingEvents, getCustomerOrders } from "../../../axios/gets";
const cookies = new Cookies();
const DashboardMain = () => {
    const [eventsData, setEventsData] = useState();
    const [ordersData, setOrdersData] = useState();
    const [eventsTableData, setEventsTableData] = useState();
    const [ordersTableData, setOrdersTableData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            let data = await getAttendingEvents();
            setEventsData(data);
            let orders = await getCustomerOrders();
            setOrdersData(orders);
        };
        fetchData();
    }, []);
    useEffect(() => {
        let tempEventsTableData = {};
        if (eventsData) {
            tempEventsTableData = {
                numEvents: eventsData.length,
                table: {
                    headers: ["Event", "Date", "Location"],
                    values: [],
                },
            };

            eventsData
                .sort((one, two) => {
                    if (one.start_time > two.start_time) {
                        return 1;
                    }
                    return -1;
                })
                .forEach((event, index) => {
                    if (index < 5) {
                        tempEventsTableData.table.values.push([
                            event.title,
                            new Date(event.start_time).toLocaleDateString(),
                            event.location,
                        ]);
                    }
                });
        } else {
            tempEventsTableData = {
                numEvents: 0,
                table: {
                    headers: ["Events"],
                    values: [["No upcoming events"]],
                },
            };
        }
        setEventsTableData(tempEventsTableData);
    }, [eventsData]);

    useEffect(() => {
        let tempOrdersTableData = {};
        if (ordersData) {
            tempOrdersTableData = {
                numOrders: ordersData.length,
                table: {
                    headers: ["Order", "Date", "Status", "Total"],
                    values: [],
                },
            };

            ordersData
                .sort((one, two) => {
                    if (one.date > two.date) {
                        return 1;
                    }
                    return -1;
                })
                .forEach((order, index) => {
                    if (index < 5) {
                        tempOrdersTableData.table.values.push([
                            order.id,
                            new Date(order.date).toLocaleDateString(),
                            order.status === "Unfulfilled" ? "Paid" : order.status,
                            order.order_total,
                        ]);
                    }
                });
        } else {
            tempOrdersTableData = {
                numOrders: 0,
                table: {
                    headers: ["Orders"],
                    values: [["No orders"]],
                },
            };
        }
        setOrdersTableData(tempOrdersTableData);
    }, [ordersData]);

    return (
        <DashboardContainer>
            <Greeting>Hello, {cookies.get("name")}</Greeting>
            <StoreDash>
                {/* <History>
                    They can toggle the date to go to past day version of
                    dashbord. eg to see yesterdays orders, sales etc
                </History> */}
                {ordersTableData && (
                    <Orders
                        buttonText="Details"
                        dataTitle="Orders this month"
                        tableData={ordersTableData}
                        total={ordersTableData.numOrders}
                        totalLabel="orders"
                        title="Orders"
                        link="/dashboard/shopper/order-tracking"></Orders>
                )}
                {eventsTableData && (
                    <DashCard
                        buttonText="Manage"
                        dataTitle="Upcoming Events"
                        total={eventsTableData.numEvents}
                        totalLabel="Attending"
                        title="Events"
                        tableData={eventsTableData}
                        link="/dashboard/shopper/events-attending"></DashCard>
                )}
            </StoreDash>
        </DashboardContainer>
    );
};
export default DashboardMain;
const DashboardContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);
    background-color: #eff3fe;
    width: 100vw;
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
