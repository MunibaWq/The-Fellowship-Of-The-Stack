import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPastDeliveries } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import DriverPastDeliveriesTable from "../../../components/Dashboard/AnalyticsTables/DriverPastDeliveriesTable";

const DriversPastDeliveries = () => {
    const [orderData, setOrderData] = useState();
    let params = useParams();
    const currentUser = params.id;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastDeliveries();

            setOrderData(data);
        };
        fetchData();
    }, []);

    return (
        <OrderContainer>
            <h1>Delivery History</h1>
            {!orderData ? (
                <Loading />
            ) : (
                <DriverPastDeliveriesTable
                    orderData={orderData}
                    user={currentUser}
                />
            )}
        </OrderContainer>
    );
};

export default DriversPastDeliveries;

const OrderContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);
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
