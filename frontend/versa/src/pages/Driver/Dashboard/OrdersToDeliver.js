import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOrdersForDriver } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import OrdersToDeliverTable from "../../../components/Dashboard/Driver/OrdersToDeliverTable";

const OrdersToDeliver = () => {
    const [orderData, setOrderData] = useState();
    let params = useParams();
    const currentUser = params.id;
    const [buyerDetails, setBuyerDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrdersForDriver();

            setOrderData(data);
        };
        fetchData();
    }, []);

    return (
        <OrderContainer>
            <h1>Orders to Deliver</h1>
            {!orderData ? (
                <Loading />
            ) : (
                <OrdersToDeliverTable
                    orderData={orderData}
                    user={currentUser}
                />
            )}
        </OrderContainer>
    );
};

export default OrdersToDeliver;

const OrderContainer = styled.div`
    padding: 4em 2em 2em calc(2em + 66px);
    display: grid;
    grid-template-rows: 60px auto;

    h1 {
        margin: 0 1em 2em 1em;
        justify-self: start;
    }
    :last-of-type {
        place-self: start;
        align-self: center;
    }
`;
