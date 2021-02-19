import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getAssignedPickups } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import AssignedPickupsTable from "../../../components/Dashboard/Driver/AssignedPickupstable";

const AssignedPickups = () => {
    const [orderData, setOrderData] = useState();
    let params = useParams();
    const artist = params.artistid;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAssignedPickups();
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
                <AssignedPickupsTable orderData={orderData} />
            )}
        </OrderContainer>
    );
};

export default AssignedPickups;

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
