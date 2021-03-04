import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// import theme from "../../Reusable/Colors";
import theme from "../../Redesign/Reusable/Theme";
import Loading from "../../Reusable/Loading";
import DropDown from "./DropDown";
import PageContainer from "../../Redesign/Reusable/PageContainer";

const OrdersTable = ({ user, orderData }) => {
    const [data, setData] = useState(orderData);
    const [sortType, setSortType] = useState();
    const [query, setQuery] = useState();

    const sortOptions = [
        {
            value: "id",
            label: "Order ID",
        },
        {
            value: "ordername",
            label: "Buyer Name",
        },
    ];

    useEffect(() => {
        const sortArray = (type) => {
            const types = {
                ordername: (a, b) => {
                    return a.name.localeCompare(b.name);
                },
                id: (a, b) => {
                    return a.id - b.id;
                },
            };
            const sortProperty = types[type];
            const sorted = [...orderData].sort(sortProperty);
            setData(sorted);
        };

        sortArray(sortType);
    }, [sortType]);

    let headers = [
        "Order ID",
        "Buyer Name",
        "Buyer Address",
        "Order Date",
        "Status",
        "Date Received by Buyer",
    ];

    const history = useHistory();

    const handleChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    const filterData = (data, query) => {
        if (!query) {
            return data;
        }

        return data.filter((order) => {
            let dataValue = Object.values(order).toString().toLowerCase();
            return dataValue.includes(query.toLowerCase());
        });
    };

    const filteredData = filterData(data, query);

    return (
        <>
            {!orderData ? (
                <Loading />
            ) : (
                <TableContainer>
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
                        <h2>Filter: </h2>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleChange}
                            value={query || ""}></input>
                    </Sort>
                    <Table>
                        <thead>
                            <Headers>
                                {headers.map((header, index) => (
                                    <th key={`header${index}`}>
                                        <h2>{header}</h2>
                                    </th>
                                ))}
                            </Headers>
                        </thead>
                        {filteredData &&
                            filteredData.map((order, index) => (
                                <BodyRows key={order.name + index}>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/artist/recent-orders/${order.id}`
                                            )
                                        }>
                                        <p>{order.id}</p>
                                    </td>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/artist/recent-orders/${order.id}`
                                            )
                                        }>
                                        <p>{order.name}</p>
                                    </td>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/artist/recent-orders/${order.id}`
                                            )
                                        }>
                                        <p>{order.shipping_address}</p>
                                    </td>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/artist/recent-orders/${order.id}`
                                            )
                                        }
                                        data-title="Date">
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
                                                `/dashboard/artist/recent-orders/${order.id}`
                                            )
                                        }>
                                        <p>
                                            {order.orderShipDate === null
                                                ? "Not Received Yet"
                                                : order.status !== "Picked Up"
                                                ? "Not Received Yet"
                                                : order.orderShipDate}
                                        </p>
                                    </td>
                                </BodyRows>
                            ))}
                        {!filteredData && (
                            <BodyRows>
                                <td>
                                    <p>
                                        No orders found. Please try searching
                                        again.
                                    </p>
                                </td>
                            </BodyRows>
                        )}
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default OrdersTable;

const TableContainer = styled.div`
    justify-self: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 600px;
`;

const Sort = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1em;

    h2 {
        margin: 0 16px 0 0;
        font-size: 1em;
        font-weight: 700;
        text-transform: uppercase;
        color: ${(props) => props.theme.black};
    }
    input {
        padding: 8px;
        outline: none;
        min-width: 150px;
        border-radius: 8px;
        border: ${(props) =>
            props.border === true
                ? `2px solid ${theme.green}`
                : `2px solid ${theme.black}`};
        :active,
        :hover,
        :focus {
            border: ${(props) =>
                props.border === true
                    ? `2px solid ${theme.green}`
                    : `2px solid ${theme.purple}`};
        }
    }
    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        h2 {
            margin-bottom: 16px;
        }
        select {
            margin-bottom: 16px;
        }
        input {
            margin-bottom: 16px;
        }
    }
`;

const Table = styled.table`
    position: relative;
    border-collapse: collapse;
    margin: 0 1em 2em 1em;
    font-size: 0.9em;

    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    thead > tr > th {
        position: sticky;
        top: 0;
        background-color: ${(props) => props.theme.black};
        :first-of-type {
            border-radius: 15px 0 0 0;
        }
        :last-of-type {
            border-radius: 0 15px 0 0;
        }
    }
    th,
    td {
        padding: 12px 15px;
        :nth-of-type(1) {
            min-width: 50px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(2) {
            min-width: 130px;
        }
        :nth-of-type(3) {
            min-width: 120px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(4) {
            min-width: 250px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(5) {
            min-width: 230px;
        }
        :nth-of-type(6) {
            min-width: 190px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
    }
`;
const Headers = styled.tr`
    h2 {
        color: ${props=>props.theme.blue};
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
        color: ${props=>props.theme.black};
        margin-bottom: 0;
    }
    :hover {
        background-color: ${props=>props.theme.blueHover};
    }
    :nth-of-type(even) {
        background-color: ${props=>props.theme.lightBlue};
        :hover {
            background-color: ${props=>props.theme.blueHover};
        }
    }
    :nth-of-type(odd) {
        background-color: ${props=>props.theme.blue};
        :hover {
            background-color: ${props=>props.theme.blueHover};
        }
    }

    :last-of-type {
        border-bottom: 3px solid ${props=>props.theme.lightPurple};
    }
`;

const SortChoice = styled.select`
    padding: 8px;
    outline: none;
    min-width: 150px;
    cursor: pointer;
    margin-right: 32px;
    border-radius: 8px;
    border: ${(props) =>
        props.border === true
            ? `2px solid ${theme.green}`
            : `2px solid ${theme.black}`};
    :active,
    :hover,
    :focus {
        border: ${(props) =>
            props.border === true
                ? `2px solid ${theme.purple}`
                : `2px solid ${theme.purple}`};
    }
`;
