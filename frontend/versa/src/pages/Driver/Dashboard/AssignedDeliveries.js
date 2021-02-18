import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getAssignedDeliveries } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import AssignedDeliveriesTable from "../../../components/Dashboard/Driver/AssignedDeliveriestable";

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

    // console.log("o", orderData);

    return (
        <OrderContainer>
            <h1>Orders to Deliver</h1>
            {!orderData ? (
                <Loading />
            ) : (
                <AssignedDeliveriesTable orderData={orderData} user={artist} />
            )}
        </OrderContainer>
    );
};

export default AssignedDeliveries;

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
