import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Pie from "../../../components/Dashboard/Pie";
import Table from "../../../components/Dashboard/Table";
import { getSalesByProduct } from "../../../axios/gets";

const SalesByProduct = () => {
    const [data, setData] = useState();
    let params = useParams();
    const currentUser = params.id;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSalesByProduct(currentUser);
            setData(data);
            console.log(data, "sbp page");
            return data;
        };
        fetchData();
    }, []);
    return (
        <SBPContainer>
            <h1>Sales By Product</h1>
            <Pie data={data} />
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
