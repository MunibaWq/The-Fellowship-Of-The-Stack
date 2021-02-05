import React from "react";
import styled from "styled-components";
import Pie from "../../../components/Dashboard/Pie";
import Table from "../../../components/Dashboard/Table";
import { salesByProductData, recentOrders } from "./data";

const SalesByProduct = (salesByProductData) => {
    return <SBPContainer>Sales By Product</SBPContainer>;
};

export default SalesByProduct;

const SBPContainer = styled.div`
    padding: 2em;
    margin: 2em;
`;
