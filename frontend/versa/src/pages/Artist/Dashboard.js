import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllProducts } from "../../axios/gets";
import Loading from "../../components/Reusable/Loading";

const Dashboard = () => {
    const [results, setResults] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            let data = await getAllProducts();
            console.log(data);
            setResults(data);
        };
        getProducts();
    }, []);
    console.log(results);
    return (
        <div style={{ padding: "2%" }}>
            <table style={{ width: "100%" }}>
                <tr>
                    <input type="checkbox" />
                    <th></th>
                    <th>title</th>
                    <th>status</th>
                    <th>inventory</th>
                    <th>update</th>
                    <th>delete</th>
                </tr>

                {results ? (
                    results.map((result) => {
                        return (
                            <tr style={{ padding: "100%" }}>
                                <input type="checkbox" />
                                <td>ThumbNail</td>
                                <td>{result.title}</td>
                                <td>Stat</td>
                                <td>Inven</td>

                                <td>Update</td>

                                <td>Delete</td>
                            </tr>
                        );
                    })
                ) : (
                    <td>Loading...</td>
                )}
            </table>
        </div>
    );
};

export default Dashboard;
