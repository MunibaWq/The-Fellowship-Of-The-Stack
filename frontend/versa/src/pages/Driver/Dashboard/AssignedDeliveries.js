import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getAssignedDeliveries } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import AssignedDeliveriesTable from "../../../components/Dashboard/Driver/AssignedDeliveriestable";
import Button from "../../../components/Reusable/Button";
import { LeftIcon } from "../../../images/icons";
import theme from "../../../components/Reusable/Colors";

const AssignedDeliveries = () => {
    const [orderData, setOrderData] = useState();
    let params = useParams();
    const artist = params.artistid;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAssignedDeliveries();
            setOrderData(data);
        };
        fetchData();
    }, []);

    return (
        <OrderContainer>
            <h1>Deliveries</h1>
            {!orderData ? (
                <Loading />
            ) : (
                <AssignedDeliveriesTable orderData={orderData} />
            )}
        </OrderContainer>
    );
};

export default AssignedDeliveries;

const OrderContainer = styled.div`
    margin-top: 2em;
    padding: 2em 2em 2em calc(2em + 66px);
    display: grid;
    grid-template-rows: 60px auto;

    h1 {
        margin: 0 1em 1em 0.6em;
        justify-self: start;
        /* font-size: 72px; */
        font-weight: 700;
    }
    :last-of-type {
        place-self: start;
        align-self: center;
    }
`;
