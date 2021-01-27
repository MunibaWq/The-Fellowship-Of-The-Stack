import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllProducts } from "../../axios/gets";

const Dashboard = () => {
    const [results, setResults] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            let data = await getAllProducts();
            console.log(data);
        };
        getProducts();
    }, []);

    return (
        <div style={{ padding: "2%" }}>
            <table style={{ width: "100%" }}>
                <tr>
                    <th>title</th>
                    <th>status</th>
                    <th>inventory</th>
                    <th>update</th>
                    <th>delete</th>
                </tr>
            </table>
        </div>
    );
};

export default Dashboard;
