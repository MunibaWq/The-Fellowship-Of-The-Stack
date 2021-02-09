import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRecentOrders } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import theme from "../../../components/Reusable/Colors";
import Table from "../../../components/Dashboard/Table";

const OrdersCopy = () => {
    const [orderData, setOrderData] = useState();
    const currentUser = 1;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecentOrders(currentUser);
            setOrderData(data);
        };
        fetchData();
    }, []);

    return (
        <OrderContainer>
            <h1>Recent Orders</h1>
            {!orderData ? <Loading /> : <Table orderData={orderData} />}
        </OrderContainer>
    );
};

export default OrdersCopy;

const OrderContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);

    h1 {
        margin: 0 1em 2em 1em;
    }
`;
