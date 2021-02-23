import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getReadyDeliveries } from "../../../axios/gets";
import Loading from "../../../components/Redesign/Reusable/Loading";
import ReadyDeliveriesTable from "../../../components/Dashboard/Driver/ReadyDeliveriesTable";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import Header from "../../../components/Redesign/Reusable/Header";

const Deliveries = () => {
    const [orderData, setOrderData] = useState();
    let params = useParams();
    const currentUser = params.id;
    const [buyerDetails, setBuyerDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReadyDeliveries();

            setOrderData(data);
        };
        fetchData();
    }, []);

    return (
        <PageContainer>
            <Header
                title="Ready to Deliver"
                sub="These are orders that you have completed pickups for and are ready to deliver. "
                link="/dashboard/driver/assigned-pickups"
                linkText="Pickups"
            />
            {!orderData ? (
                <Loading />
            ) : (
                <ReadyDeliveriesTable
                    orderData={orderData}
                    user={currentUser}
                />
            )}
        </PageContainer>
    );
};

export default Deliveries;
