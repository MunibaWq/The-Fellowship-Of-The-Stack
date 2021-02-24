import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";
import { driverUpdateStatus } from "../../../axios/puts";
import { DriverPicked, RightIcon } from "../../../images/icons";
import Button from "../../Redesign/Reusable/Button";

const ReadyDeliveriesTable = ({ orderData }) => {
    let history = useHistory();
    const [data, setData] = useState(orderData);
    const [sortType, setSortType] = useState();
    const [query, setQuery] = useState();
    const [status, setStatus] = useState("Ready to Deliver");
    const [id, setID] = useState();
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
        if (status === "Delivery in Progress") {
            driverUpdateStatus("Delivery in Progress", id);
            history.go(0);
        }
        if (status === "Delivered") {
            driverUpdateStatus("Delivered", id);
            history.go(0);
        }
    }, [status]);

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

    let headers = ["Customer Name", "Shipping Address", "Actions"];

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

    const uniqueArtist = Array.from(
        new Set(filteredData.map((a) => a.name))
    ).map((name) => {
        return filteredData.find((a) => a.name === name);
    });
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
                            {uniqueArtist &&
                                uniqueArtist.map((order, index) => (
                                    <BodyRows key={order.name + order.status}>
                                        <td key={order.name + order.id}>
                                            <p>{order.name}</p>
                                        </td>
                                        <td key={order.name + order.id + 34}>
                                            <p>{order.shipping_address}</p>
                                        </td>
                                        {order.status ===
                                        "Delivery in Progress" ? (
                                            <td>
                                                <Button
                                                    secondarySmall
                                                    onClick={(e) => {
                                                        setID(order.id);
                                                        setStatus("Delivered");
                                                    }}>
                                                    <DriverPicked
                                                        stroke={theme.primary}
                                                    />
                                                    Set Order as Delivered
                                                </Button>
                                            </td>
                                        ) : (
                                            <td>
                                                <Button
                                                    secondarySmall
                                                    onClick={(e) => {
                                                        setID(order.id);
                                                        setStatus(
                                                            "Delivery in Progress"
                                                        );
                                                    }}>
                                                    <a
                                                        rel={"noreferrer"}
                                                        target="_blank"
                                                        href={`https://www.google.com/maps?saddr&daddr=${order.shipping_address}`}>
                                                        Start Delivery
                                                    </a>
                                                </Button>
                                            </td>
                                        )}
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

export default ReadyDeliveriesTable;

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
    position: relative;
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
    td {
        a {
            color: ${(props) => props.theme.lightBlue};
        }
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

const SetAsDelivered = styled.button.attrs((props) => ({
    type: props.type || "button",
}))`
    outline: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: none;
    cursor: pointer;
    border-radius: 8px;
    border: none;
    transition: background 0.3s ease;
    svg {
        margin-right: 8px;
    }
    :hover {
        svg {
            path {
                stroke: ${theme.primaryHover};
            }
        }
        p {
            color: ${theme.primaryHover};
        }
    }
    p {
        color: ${theme.primary};
        font-weight: bold;
        margin: 0;
        padding: 0;
    }
`;
