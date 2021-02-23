import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";

const DriverPastDeliveriesTable = ({ user, orderData }) => {
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
                id: (a, b) => {
                    return a.id - b.id;
                },
                ordername: (a, b) => {
                    return a.name.localeCompare(b.name);
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
        "Delivery Address",
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
                                    <option
                                        value={option.value}
                                        key={option.value}>
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
                        <tbody>
                            {filteredData &&
                                filteredData.map((order, index) => (
                                    <BodyRows key={order.name + order.status}>
                                        <td
                                            onClick={() =>
                                                history.push(
                                                    `/dashboard/driver/past/${order.id}`
                                                )
                                            }
                                            key={order.name + order.name}>
                                            <p>{order.id}</p>
                                        </td>
                                        <td
                                            onClick={() =>
                                                history.push(
                                                    `/dashboard/driver/past/${order.id}`
                                                )
                                            }
                                            key={order.name + order.id}>
                                            <p>{order.name}</p>
                                        </td>
                                        <td
                                            onClick={() =>
                                                history.push(
                                                    `/dashboard/driver/past/${order.id}`
                                                )
                                            }
                                            key={order.name + order.id + 34}>
                                            <p>{order.shipping_address}</p>
                                        </td>
                                        <td
                                            onClick={() =>
                                                history.push(
                                                    `/dashboard/driver/past/${order.id}`
                                                )
                                            }>
                                            <p>
                                                {!order.orderShipDate
                                                    ? "No ship date available"
                                                    : order.orderShipDate ===
                                                      null
                                                    ? "No ship date available"
                                                    : order.orderShipDate}
                                            </p>
                                        </td>
                                    </BodyRows>
                                ))}
                            {filteredData.length === 0 && (
                                <BodyRows key="no row">
                                    <td key="No results">No Results Found</td>
                                </BodyRows>
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </TableContainer>
    );
};

export default DriverPastDeliveriesTable;

const TableContainer = styled.div`
    margin-top: 2em;
    justify-self: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 600px;
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
        color: ${(props) => props.theme.black};
    }
    input {
        padding: 8px;
        outline: none;
        min-width: 150px;
        border-radius: 8px;
        border: 2px solid
            ${(props) =>
                props.border === true ? props.theme.green : props.theme.black};
        :active,
        :hover,
        :focus {
            border: 2px solid
                ${(props) =>
                    props.border === true
                        ? props.theme.green
                        : props.theme.purple};
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
    border-collapse: collapse;
    margin: 0 1em 2em 1em;
    font-size: 0.9em;
    min-width: 955px;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px 15px 0px 0px;
    thead > tr > th {
        position: sticky;
        top: 0;
        background-color: ${(props) => props.theme.black};
        :first-of-type {
            border-radius: 16px 0 0 0;
        }
        :last-of-type {
            border-radius: 0 16px 0 0;
        }
    }
    th,
    td {
        padding: 20px 40px;
        :nth-of-type(1) {
            min-width: 80px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(2) {
            min-width: 170px;
        }
        :nth-of-type(3) {
            min-width: 20px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(4) {
            min-width: 190px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(5) {
            min-width: 250px;
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
        color: ${(props) => props.theme.blue};
        text-align: left;
        margin-bottom: 0;
        text-transform: uppercase;
        font-size: 0.8em;
    }
`;
const BodyRows = styled.tr`
    border-bottom: thin solid ${(props) => props.theme.blue};
    transition: all 0.2s ease;

    cursor: pointer;
    p {
        color: ${theme.tertiary};
        margin-bottom: 0;
    }
    :hover {
        background-color: ${(props) => props.theme.blueHover};
    }
    :nth-of-type(even) {
        background-color: ${(props) => props.theme.lightBlue};
        :hover {
            background-color: ${(props) => props.theme.blueHover};
        }
    }

    :last-of-type {
        border-bottom: 2px solid ${(props) => props.theme.lightPurple};
    }
`;

const SortChoice = styled.select`
    padding: 8px;
    outline: none;
    min-width: 150px;
    cursor: pointer;
    border-radius: 8px;
    margin-right: 32px;
    border: 2px solid
        ${(props) =>
            props.border === true ? props.theme.green : props.theme.black};
    :active,
    :hover,
    :focus {
        border: 2px solid
            ${(props) =>
                props.border === true ? props.theme.green : props.theme.purple};
    }
`;
