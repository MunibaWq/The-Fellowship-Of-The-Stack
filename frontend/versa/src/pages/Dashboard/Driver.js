import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import PageContainer from "../../components/Redesign/Reusable/PageContainer";
import Header from "../../components/Redesign/Reusable/Header";
import TableCard from "../../components/Redesign/Reusable/TableCard";
import {
    getAssignedPickups,
    getOrdersForDriver,
    getPastDeliveries,
} from "../../axios/gets";
import GraphCard from "../../components/Redesign/Reusable/GraphCard";

const Driver = () => {
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
            <Header
                title={`Hello, ${cookies.get("name")}`}
                sub="Here is your summary for today."
            />
            <CardList>
                <TableCard
                    title="Today's Deliveries"
                    statNum={assignedPickupsTableData.table.values.length}
                    statLabel={
                        assignedPickupsTableData.table.values.length > 1
                            ? "Deliveries To Do"
                            : "Delivery To Do"
                    }
                    link="/dashboard/driver/assigned-pickups/"
                    data={assignedPickupsTableData}
                />
                <TableCard
                    title="Orders to Fulfill"
                    statNum={ordersToFulfillTableData.table.values.length}
                    statLabel="Unfulfilled"
                    link="/dashboard/driver/orders"
                    data={ordersToFulfillTableData}
                />

                <GraphCard
                    title="Value Delivered"
                    statNum={pastDeliveriesGraphData.graphActual.length}
                    statLabel={
                        pastDeliveriesGraphData.graphActual.length > 1
                            ? "Deliveries"
                            : "Delivery"
                    }
                    link="/dashboard/driver/delivery-history"
                    data={pastDeliveriesGraphData}
                />
            </CardList>
        </PageContainer>
    );
};

export default Driver;

const CardList = styled.div`
    margin: 2em 0;
    align-self: flex-start;
    width: 100%;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(390px, 1fr));
    height: fit-content;
`;
