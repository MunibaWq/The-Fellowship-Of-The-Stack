import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllProducts } from "../../axios/gets";
import { getImagesByPID } from "../../axios/gets";

import Loading from "../../components/Reusable/Loading";

const Dashboard = (currentProduct) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            let data = await getAllProducts();
            setResults(data);
        };
        getProducts();
    }, []);

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
                                <td style={{ width: "50px", height: "50px" }}>
                                    <img
                                        src={`${"http://localhost:5000"}/images/${
                                            result.id
                                        }.jpeg`}
                                        style={{
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </td>
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
