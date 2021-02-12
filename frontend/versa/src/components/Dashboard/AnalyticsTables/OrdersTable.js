import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";
import DropDown from "./DropDown";

const OrdersTable = ({ user, orderData }) => {
    const [data, setData] = useState(orderData);
    const [sortType, setSortType] = useState();
    const [orderDate, setOrderDate] = useState();
    const [shipDate, setShipDate] = useState();

    const sortOptions = [
        {
            value: "orderdate",
            label: "Order Date",
        },
        {
            value: "status",
            label: "Order Status",
        },
        {
            value: "shipdate",
            label: "Date Received by Buyer",
        },
    ];

    useEffect(() => {
        const sortArray = (type) => {
            const types = {
                status: "status",
                orderdate: "orderdate",
                shipdate: "shipdate",
            };
            const sortProperty = types[type];

            const sorted = [...orderData].sort(
                (a, b) => b[sortProperty] - a[sortProperty]
            );
            console.log(sorted);
            setData(sorted);
        };

        sortArray(sortType);
    }, [sortType]);

    let headers = [
        "Order ID",
        "Buyer Name",
        "Buyer Address",
        "Date",
        "Status",
        "Date Received by Buyer",
    ];

    const history = useHistory();

    return (
        <TableContainer>
            {!orderData ? (
                <Loading />
            ) : (
                <>
                    <Sort>
                        <h2>Sort by: </h2>
                        <SortChoice
                            name="sort"
                            id="sort"
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}>
                            {sortOptions.map((option) => (
                                <>
                                    <option value={option.value}>
                                        {option.label}
                                    </option>
                                </>
                            ))}
                        </SortChoice>
                    </Sort>
                    <Table>
                        <thead>
                            <Headers>
                                {headers.map((header,index) => (
                                    <th key={`header${index}`}>
                                        <h2>{header}</h2>
                                    </th>
                                ))}
                            </Headers>
                        </thead>
                        {data &&
                            data.map((order, index) => (
                                <BodyRows key={order.name + index}>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/recent-orders/${user}/${order.id}`
                                            )
                                        }>
                                        <p>{order.id}</p>
                                    </td>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/recent-orders/${user}/${order.id}`
                                            )
                                        }>
                                        <p>{order.name}</p>
                                    </td>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/recent-orders/${user}/${order.id}`
                                            )
                                        }>
                                        <p>
                                            {order.pickup === true
                                                ? "for Pickup"
                                                : order.shipping_address}
                                        </p>
                                    </td>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/recent-orders/${user}/${order.id}`
                                            )
                                        }>
                                        <p>
                                            {order.orderDate === null
                                                ? "Error Loading Order Date"
                                                : order.orderDate}
                                        </p>
                                    </td>
                                    <td>
                                        <DropDown order={order} />
                                    </td>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/recent-orders/${user}/${order.id}`
                                            )
                                        }>
                                        <p>
                                            {order.shipDate === null
                                                ? "Not Received Yet"
                                                : order.shipDate}
                                        </p>
                                    </td>
                                </BodyRows>
                            ))}
                    </Table>
                </>
            )}
        </TableContainer>
    );
};

export default OrdersTable;

const TableContainer = styled.div`
    justify-self: center;
`;

const Sort = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1em;
    h2 {
        margin: 0 16px 0 0;
        font-size: 1em;
        font-weight: 700;
        text-transform: uppercase;
    }
`;

const Table = styled.table`
    position: relative;
    border-collapse: collapse;
    margin: 0 1em 2em 1em;
    font-size: 0.9em;
    min-width: 400px;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px 15px 0px 0px;
    thead th {
        position: sticky;
        top: 0;
    }
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
    cursor: pointer;
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

const SortChoice = styled.select`
    padding: 8px;
    outline: none;
    min-width: 150px;
    cursor: pointer;
    border: ${(props) =>
        props.border === true
            ? `2px solid #77dd77`
            : `2px solid ${theme.primary}`};
    :active,
    :hover,
    :focus {
        border: ${(props) =>
            props.border === true
                ? `2px solid #77dd77`
                : `2px solid ${theme.primaryHover}`};
    }
`;
