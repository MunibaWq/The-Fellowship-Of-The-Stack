import React from "react";
import styled from "styled-components";
import Pie from "../../../components/Dashboard/Pie";
import Table from "../../../components/Dashboard/Table";
import { salesByProductData, recentOrders } from "./data";

const SalesByProduct = (salesByProductData) => {
    return (
        <SBPContainer>
            <h1>Sales By Product</h1>
        </SBPContainer>
    );
};

export default SalesByProduct;

const SBPContainer = styled.div`
    padding: 2em 2em 2em calc(2em + 66px);

    h1 {
        margin: 0 1em 2em 1em;
    }
`;
