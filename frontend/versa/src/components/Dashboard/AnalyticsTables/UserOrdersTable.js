import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";

const UserOrdersTable = ({ orderData }) => {
    const [data, setData] = useState(orderData);
    const [query, setQuery] = useState("");
    const [completed, setCompleted] = useState(false);
    let headers = ["Order ID", "Order Date", "Shipping Address", "Status"];

    const history = useHistory();

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const filterData = (query, data) => {
            if (!query) {
                return data;
            }
            return data.filter((order) => {
                let dataValue = Object.values(order).toString().toLowerCase();
                return dataValue.includes(query.toLowerCase());
            });
        };
        setData(
            filterData(
                query,
                orderData.filter((order) => {
                    if (completed) {
                        return order.status === "Delivered";
                    } else {
                        return order.status !== "Delivered";
                    }
                })
            )
        );
    }, [query, orderData, completed]);

    return (
        <TableContainer>
            {!data ? (
                <Loading />
            ) : (
                <>
                    <Sort>
                        <Completion>
                            <Option>
                                <input
                                    id="past"
                                    onChange={() => {
                                        setCompleted(true);
                                    }}
                                    type="radio"
                                    checked={completed}
                                />
                                <label htmlFor="past">Past Orders</label>
                            </Option>
                            <Option>
                                <input
                                    id="current"
                                    onChange={() => {
                                        setCompleted(false);
                                    }}
                                    type="radio"
                                    checked={!completed}
                                />
                                <label htmlFor="current">Current</label>
                            </Option>
                        </Completion>
                        <h2>Filter: </h2>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleChange}
                            value={query}></input>
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
                        {data &&
                            data.map((order, index) => (
                                <BodyRows key={order.name + index}>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/shopper/order-tracking/${order.id}`
                                            )
                                        }>
                                        <p>{order.id}</p>
                                    </td>

                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/shopper/order-tracking/${order.id}`
                                            )
                                        }
                                        data-title="Date">
                                        <p>
                                            {order.orderDate === null
                                                ? "Error Loading Order Date"
                                                : order.orderDate}
                                        </p>
                                    </td>
                                    <td
                                        onClick={() =>
                                            history.push(
                                                `/dashboard/shopper/order-tracking/${order.id}`
                                            )
                                        }>
                                        <p>{order.shipping_address}</p>
                                    </td>
                                    <td>
                                        <p>{order.status}</p>
                                    </td>
                                </BodyRows>
                            ))}
                        {!data && (
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
                </>
            )}
        </TableContainer>
    );
};

export default UserOrdersTable;
const Completion = styled.div`
    display: flex;
    margin-right: 100px;
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
        color: ${theme.primary};
    }
    input {
        padding: 8px;
        outline: none;
        min-width: 150px;
        border: ${(props) =>
            props.border === true
                ? `2px solid ${theme.primaryHover}`
                : `2px solid ${theme.primary}`};
        :active,
        :hover,
        :focus {
            border: ${(props) =>
                props.border === true
                    ? `2px solid #77dd77`
                    : `2px solid ${theme.primaryHover}`};
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
const TableContainer = styled.div`
    justify-self: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 600px;
`;

const Option = styled.div`
    input {
        min-width: 1px;
        margin: 10px;
    }
    display: flex;
    align-items: baseline;
`;
const Table = styled.table`
    position: relative;
    border-collapse: collapse;
    margin: 0 1em 2em 1em;
    font-size: 0.9em;

    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px 15px 0px 0px;
    thead th {
        position: sticky;
        top: 0;
    }
    th,
    td {
        padding: 12px 15px;

        :nth-of-type(1) {
            width: 50px;
        }
        :nth-of-type(2) {
            width: 250px;
        }
        :nth-of-type(3) {
            width: 460px;
        }
        :nth-of-type(4) {
            width: 130px;
        }
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
    margin-right: 32px;
    border: ${(props) =>
        props.border === true
            ? `2px solid ${theme.primaryHover}`
            : `2px solid ${theme.primary}`};
    :active,
    :hover,
    :focus {
        border: ${(props) =>
            props.border === true
                ? `2px solid ${theme.primaryHover}`
                : `2px solid ${theme.primaryHover}`};
    }
`;
