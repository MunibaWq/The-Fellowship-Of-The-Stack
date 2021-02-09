import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRecentOrders } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";

const Orders = () => {
    const [orderData, setOrderData] = useState();
    const currentUser = 1;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecentOrders(currentUser);
            setOrderData(data);
        };
        fetchData();
    }, []);

    let headers = ["Order ID", "Buyer Name", "Date", "Status", "Shipping Date"];

    console.log("to o", orderData);

    return (
        <SBPContainer>
            <h1>Recent Orders</h1>
            {!orderData ? (
                <Loading />
            ) : (
                <div>
                    <SBPTable>
                        }
                        <thead>
                            {headers.map((header, index) => (
                                <th key={header + index}>{header}</th>
                            ))}
                        </thead>
                        <tbody>
                            {orderData.map((order, index) => (
                                <tr key={order.sum + index}>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>
                                        {order.orderDate} at {order.orderTime}
                                    </td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </SBPTable>
                </div>
            )}
        </SBPContainer>
    );
};

export default Orders;

const SBPContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);

    h1 {
        margin: 0 1em 2em 1em;
    }
`;

const SBPTable = styled.table`
    margin: 5px;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    padding-top: 5px;
    td {
        font-weight: 500;
        padding: 6px;
        font-size: 18px;
    }
    table,
    th,
    thead {
        padding: 6px;
        border-collapse: collapse;
    }
    thead {
        border-bottom: 2px solid #9a9a9a;
        td {
            font-weight: 700;
        }
        text-align: left;
    }
`;

// const PieContainer = styled.div`
//     svg {
//         width: fit-content;
//         height: fit-content;
//     }
// `;
