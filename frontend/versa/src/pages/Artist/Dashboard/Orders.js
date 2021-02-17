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
    // const [buyerDetails, setBuyerDetails] = useState();

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
    padding: 5em 2em;
    display: grid;
    grid-template-rows: auto auto;
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
