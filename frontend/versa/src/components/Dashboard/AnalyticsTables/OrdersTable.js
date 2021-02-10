import React from "react";
import styled from "styled-components";
import {useHistory} from 'react-router-dom'
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";
import DropDown from "./DropDown";

const OrdersTable = ({ user, orderData }) => {
    let headers = [
        "Order ID",
        "Buyer Name",
        "Buyer Address",
        "Date",
        "Status",
        "Date Received by Buyer",
    ];

    const history = useHistory();
    // const handleRowClick = (order.id) => {
    //     history.push(`/dashboard/recent-orders/${order.id}`);
    // } 
    
    return (
        <TableContainer>
            {!orderData ? (
                <Loading />
            ) : (
                <Table>
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
                                <td onClick={()=> history.push(`/dashboard/recent-orders/${user}/${order.id}`)}>
                                    <p>{order.id}</p>
                                </td>
                                <td onClick={()=> history.push(`/dashboard/recent-orders/${user}/${order.id}`)}>
                                    <p>{order.name}</p>
                                </td>
                                <td onClick={()=> history.push(`/dashboard/recent-orders/${user}/${order.id}`)}>
                                    <p>
                                        {order.pickup === true ? "for Pickup" : order.address}
                                    </p>
                                </td>
                                <td onClick={()=> history.push(`/dashboard/recent-orders/${user}/${order.id}`)}>
                                    <p>{order.orderDate}</p>
                                </td>
                                <td>
                                    <DropDown
                                        order={order}
                                    />
                                </td>
                                <td onClick={()=> history.push(`/dashboard/recent-orders/${user}/${order.id}`)}>
                                    <p>
                                        {order.orderShipDate === null
                                            ? "Not Received Yet"
                                            : order.orderShipDate}
                                    </p>
                                </td>
                            </BodyRows>
                        ))}
                </Table>
            )}
        </TableContainer>
    );
};

export default OrdersTable;

const TableContainer = styled.div`
justify-self: center;
`;

const Table = styled.table`
    position: relative;
    border-collapse: collapse;
    margin: 0 1em 2em 1em;
    font-size: 0.9em;
    min-width: 400px;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px 15px 0px 0px;
    thead th{
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

