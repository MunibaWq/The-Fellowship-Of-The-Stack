import React, { useEffect, useState } from "react";
import {
    getAssignedPickups,
    getOrdersReadyForDelivery,
    getPastDeliveries,
} from "../../../axios/gets";
import styled from "styled-components";
import DashCard from "./DashCard";

const DriverDashboardMain = () => {
    const [ordersToFulfill, setOrdersToFulfill] = useState();
    const [assignedPickups, setAssignedPickups] = useState();
    const [pastDeliveries, setPastDeliveries] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let toFulfillData = await getOrdersReadyForDelivery();
            setOrdersToFulfill(toFulfillData);
            let assignedData = await getAssignedPickups();
            setAssignedPickups(assignedData);
            let pastData = await getPastDeliveries();
            setPastDeliveries(pastData);
        };
        fetchData();
    }, []);

    console.log(assignedPickups);
    let ordersToFulfillTableData = {};
    ordersToFulfill
        ? (ordersToFulfillTableData = {
              table: {
                  headers: ["ID", "Shipping Address", "Status"],
                  values: [],
              },
          }) &&
          ordersToFulfill
              .slice(0, 5)
              .map((order) =>
                  ordersToFulfillTableData.table.values.push([
                      order.id,
                      order.shipping_address,
                      order.status === "Driver Assigned"
                          ? "Assigned to you"
                          : order.status,
                  ])
              )
        : (ordersToFulfillTableData = {
              table: {
                  headers: ["Orders to Fulfill"],
                  values: [["No orders yet"]],
              },
          });

    const uniquePickup = Array.from(
        new Set(assignedPickups.map((a) => a.name))
    ).map((name) => {
        return assignedPickups.find((a) => a.name === name);
    });
    let assignedPickupsTableData = {};
    uniquePickup
        ? (assignedPickupsTableData = {
              table: {
                  headers: ["Artist", "Pickup Address"],
                  values: [],
              },
          }) &&
          uniquePickup
              .slice(0, 5)
              .map((order) =>
                  assignedPickupsTableData.table.values.push([
                      order.username,
                      order.address,
                  ])
              )
        : (assignedPickupsTableData = {
              table: {
                  headers: ["Orders to Deliver"],
                  values: [["No orders yet"]],
              },
          });

    let pastDeliveriesGraphData = {};
    pastDeliveries
        ? (pastDeliveriesGraphData = {
              graphActual: [],
              graphGoal: [
                  { x: 1, y: 1000 },
                  { x: 2, y: 1000 },
                  { x: 3, y: 1000 },
                  { x: 4, y: 1000 },
              ],
          }) &&
          pastDeliveries.slice(0, 5).map((order, index) =>
              pastDeliveriesGraphData.graphActual.push({
                  x: index,
                  y: order.order_total,
              })
          )
        : (pastDeliveriesGraphData = {
              graphGoal: [{ x: 0, y: 0 }],
              graphActual: [{ x: 0, y: 0 }],
          });

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
                    dataTitle="Ready To Pickup"
                    tableData={assignedPickupsTableData}
                    total={assignedPickupsTableData.table.values.length}
                    totalLabel={
                        assignedPickupsTableData.table.values.length > 1
                            ? "Deliveries To Do"
                            : "Delivery To Do"
                    }
                    title="Today's Deliveries"
                    link="/dashboard/driver/assigned-deliveries"
                />
                <RecentOrders
                    buttonText="View"
                    dataTitle="Ready To Add To Deliveries"
                    tableData={ordersToFulfillTableData}
                    total={ordersToFulfillTableData.table.values.length}
                    totalLabel="Unfulfilled"
                    title="Orders to Fulfill"
                    link="/dashboard/driver/orders"
                />
                <RecentOrders
                    buttonText="View"
                    dataTitle="Orders Delivered"
                    graphData={pastDeliveriesGraphData}
                    total={pastDeliveriesGraphData.graphActual.length}
                    totalLabel={
                        pastDeliveriesGraphData.graphActual.length > 1
                            ? "Deliveries"
                            : "Delivery"
                    }
                    title="Value of Past Deliveries"
                    link="/dashboard/driver/order-history"
                />
            </StoreDash>
        </DashboardContainer>
    );
};
export default DriverDashboardMain;
const DashboardContainer = styled.div`
    width: 100%;
    padding: 4em 2em 2em calc(2em + 66px);
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
    margin: 1em;

    grid-row-gap: 30px;
    grid-column-gap: 50px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
`;
const Greeting = styled.h1`
    margin: 0 1em 2em 1em;
`;
