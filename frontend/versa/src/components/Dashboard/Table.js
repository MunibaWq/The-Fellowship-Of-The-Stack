import React from "react";
import styled from "styled-components";
import theme from "../Reusable/Colors";
import Loading from "../Reusable/Loading";
import DropDown from "./AnalyticsTables/DropDown";

const Table = ({ orderData }) => {
    let headers = [
        "Order ID",
        "Buyer Name",
        "Buyer Address",
        "Date",
        "Status",
        "Shipping Date",
    ];
    const statusOptions = [
        {
            value: "Paid",
            label: "Paid",
        },
        {
            value: "Processing",
            label: "Processing",
        },
        {
            value: "Packed",
            label: "Packed",
        },
        {
            value: "Ready To Ship",
            label: "Ready To Ship",
        },
        {
            value: "Shipped",
            label: "Shipped",
        },
        {
            value: "On Hold",
            label: "On Hold",
        },
        {
            value: "Cancelled",
            label: "Cancelled",
        },
        {
            value: "Refunded",
            label: "Refunded",
        },
    ];
    return (
        <div>
            {!orderData ? (
                <Loading />
            ) : (
                <OrdersTable>
                    <thead>
                        <Headers>
                            {headers.map((header) => (
                                <th>
                                    <h2>{header}</h2>
                                </th>
                            ))}
                        </Headers>
                    </thead>
                    {orderData &&
                        orderData.map((order, index) => (
                            <BodyRows key={order.name + index}>
                                <td>
                                    <p>{order.id}</p>
                                </td>
                                <td>
                                    <p>{order.name}</p>
                                </td>
                                <td>
                                    <p>
                                        {order.address === "none"
                                            ? "for Pickup"
                                            : order.address === "null"
                                            ? "-"
                                            : order.address}
                                    </p>
                                </td>
                                <td>
                                    <p>{order.orderDate}</p>
                                </td>
                                <td>
                                    <DropDown
                                        statusOptions={statusOptions}
                                        order={order}
                                    />
                                </td>
                                <td>
                                    <p>
                                        {order.orderShipDate === null
                                            ? "Not Shipped"
                                            : order.orderShipDate}
                                    </p>
                                </td>
                            </BodyRows>
                        ))}
                </OrdersTable>
            )}
        </div>
    );
};

export default Table;

const OrdersTable = styled.table`
    border-collapse: collapse;
    margin: 0 1em 2em 1em;
    font-size: 0.9em;
    min-width: 400px;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px 15px 0px 0px;

    th,
    td {
        padding: 12px 15px;
    }
`;
const Headers = styled.tr`
    background-color: ${theme.primary};

    h2 {
        color: ${theme.secondary};
        text-align: left;
        margin-bottom: 0;
        text-transform: uppercase;
        font-size: 0.8em;
        /* letter-spacing: 0.03em; */
    }
`;
const BodyRows = styled.tr`
    border-bottom: thin solid #dddddd;
    p {
        color: ${theme.tertiary};
        margin-bottom: 0;
    }
    :hover {
        background-color: ${theme.primary + "40"};
    }
    :nth-of-type(even) {
        background-color: #eff3fe60;
        :hover {
            background-color: ${theme.primary + "40"};
        }
    }

    :last-of-type {
        border-bottom: 2px solid ${theme.primary};
    }
`;

