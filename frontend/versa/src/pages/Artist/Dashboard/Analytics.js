import React, { useState, useEffect } from "react";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import Header from "../../../components/Redesign/Reusable/Header";
import SalesByProduct from "../Dashboard/SalesByProduct";
import TotalOrders from "../Dashboard/TotalOrders";
import TotalSales from "../Dashboard/TotalSales";
import AvgOrderValue from "../Dashboard/AvgOrderValue";

import Button from "../../../components/Redesign/Reusable/Button";
import styled from "styled-components";
const Analytics = () => {
    const [nav, setNav] = useState("TS")
    return (
        <PageContainer>
            <Header title="Analytics" />
            <Nav>
                <Button onClick = {()=>{
                    setNav("TS")
                }}primarySmall>Total Sales</Button>
                <Button onClick = {()=>{
                    setNav("TO")
                }}primarySmall>Total Orders</Button>
                <Button onClick = {()=>{
                    setNav("SBP")
                }}primarySmall>Sales By Product</Button>
                <Button onClick = {()=>{
                    setNav("OA")
                }}primarySmall>Order Average</Button>
            </Nav>
            {nav==="TS" && <TotalSales/>}
        </PageContainer>
        
    );
};

export default Analytics;

const Nav = styled.div`
    place-self: flex-start;
    display: flex;
    width: 1066px;
    justify-content: space-between;
`;
