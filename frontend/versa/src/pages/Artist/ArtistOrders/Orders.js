import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getRecentOrders } from "../../../axios/gets";
import Loading from "../../../components/Redesign/Reusable/Loading";
import OrdersTable from "../../../components/Dashboard/AnalyticsTables/OrdersTable";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import Header from "../../../components/Redesign/Reusable/Header";

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

    return (
        <PageContainer>
            <Header
                title="Recent Orders"
                sub="View orders from customers and update order status."
            />
            <OrderContainer>
                {!orderData ? (
                    <Loading />
                ) : (
                    <OrdersTable orderData={orderData} user={currentUser} />
                )}
            </OrderContainer>
        </PageContainer>
    );
};

export default Orders;

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
