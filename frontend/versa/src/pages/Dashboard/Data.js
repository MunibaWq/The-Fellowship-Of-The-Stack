import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const Data = () => {
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
    return <div></div>;
};

export default Data;
