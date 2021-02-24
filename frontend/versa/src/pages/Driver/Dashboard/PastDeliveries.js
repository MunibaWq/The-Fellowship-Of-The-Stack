import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Redesign/Reusable/Loading";
import { getPastDeliveries } from "../../../axios/gets";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import PastDeliveriesTable from "../../../components/Dashboard/Driver/PastDeliveriesTable";
import Header from "../../../components/Redesign/Reusable/Header";

const PastDeliveries = () => {
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
        <PageContainer>
            <Header
                title="Delivery History"
                sub="These are your past orders. Click on a row in order to see the items you delivered to the customer."
                link="/dashboard/driver/"
                linkText="Dashboard"
            />
            {!orderData ? (
                <Loading />
            ) : (
                <PastDeliveriesTable orderData={orderData} user={currentUser} />
            )}
        </PageContainer>
    );
};

export default PastDeliveries;
