import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getAssignedPickups } from "../../../axios/gets";
import Loading from "../../../components/Reusable/Loading";
import AssignedPickupsTable from "../../../components/Dashboard/Driver/AssignedPickupsTable";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import Header from "../../../components/Redesign/Reusable/Header";

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
        <PageContainer>
            <Header
                title="Deliveries"
                sub="These are your orderes organised by artist address so that you can pick up products in batches."
            />
            {!orderData ? (
                <Loading />
            ) : (
                <AssignedPickupsTable orderData={orderData} />
            )}
        </PageContainer>
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
