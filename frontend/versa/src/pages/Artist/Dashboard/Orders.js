import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getRecentOrders } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import OrdersTable from "../../../components/Dashboard/AnalyticsTables/OrdersTable";

const Orders = () => {
    const [orderData, setOrderData] = useState();
    let params = useParams();
    const currentUser = params.id;
    const [buyerDetails, setBuyerDetails] = useState();

    useEffect(() => {
        const fetchData = async (currentUser) => {
            const data = await getRecentOrders(currentUser);

            setOrderData(data);
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
                <OrdersTable orderData={orderData} user={currentUser} />
            )}
        </OrderContainer>
    );
};

export default Orders;

const OrderContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);
    display: grid;
    grid-template-rows: 60px auto;
    min-height: 100vh;

    h1 {
        margin: 0 1em 2em 1em;
        justify-self: start;
    }
    :last-of-type {
        place-self: start;
        align-self: center;
    }
`;
