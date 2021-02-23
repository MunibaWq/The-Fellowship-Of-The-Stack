import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {
    getAssignedPickups,
    getOrdersForDriver,
    getPastDeliveries,
} from "../../../axios/gets";
import styled from "styled-components";
import DashCard from "./DashCard";
import Header from "../../../components/Redesign/Reusable/Header";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";

const DriverDashboardMain = () => {
    const cookies = new Cookies();

    const [ordersToFulfill, setOrdersToFulfill] = useState();
    const [assignedPickups, setAssignedPickups] = useState();
    const [pastDeliveries, setPastDeliveries] = useState();
    const [uniquePickup, setUniquePickup] = useState();
    useEffect(() => {
        const fetchData = async () => {
            let toFulfillData = await getOrdersForDriver();
            setOrdersToFulfill(toFulfillData);
            let assignedData = await getAssignedPickups();
            setAssignedPickups(assignedData);
            let pastData = await getPastDeliveries();
            setPastDeliveries(pastData);
            setUniquePickup(
                Array.from(new Set(assignedData.map((a) => a.username))).map(
                    (name) => {
                        return assignedData.find((a) => a.username === name);
                    }
                )
            );
        };

        fetchData();
    }, []);

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
        <PageContainer>
            <Header title={`Hello, ${cookies.get("name")}`} />
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
                    link="/dashboard/driver/assigned-pickups/"
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
                    link="/dashboard/driver/delivery-history"
                />
            </StoreDash>
        </PageContainer>
    );
};
export default DriverDashboardMain;

const RecentOrders = styled(DashCard)``;

const StoreDash = styled.div`
    display: grid;
    margin: 1em;

    grid-row-gap: 30px;
    grid-column-gap: 50px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
`;
