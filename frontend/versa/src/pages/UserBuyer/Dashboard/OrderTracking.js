import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getCustomerOrders } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import UserOrdersTable from "../../../components/Dashboard/AnalyticsTables/UserOrdersTable";

const OrderTracking = () => {
    const [orderData, setOrderData] = useState();
    let params = useParams();
    const currentUser = params.id;
    // const [buyerDetails, setBuyerDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCustomerOrders();

            setOrderData(
                data.map((order) => {
                    console.log(order);
                    return {
                        ...order,
                        status:
                            order.status === "Unfulfilled"
                                ? "Paid"
                                : order.status,
                    };
                })
            );
        };
        fetchData();
    }, []);

    console.log("o", orderData);

    return (
        <OrderContainer>
            <h1>Recent Orders</h1>
            {!orderData ? (
                <Loading />
            ) : (
                <UserOrdersTable orderData={orderData} user={currentUser} />
            )}
        </OrderContainer>
    );
};

export default OrderTracking;

const OrderContainer = styled.div`
    padding: 5em 2em;
    display: grid;
    grid-template-rows: 80px auto;
    min-height: 100vh;
    width: 90vw;

    h1 {
        /* margin: 0 0 0 1.3em; */

        justify-self: start;
    }

    :last-child {
        place-self: start;
        align-self: center;
    }
`;
