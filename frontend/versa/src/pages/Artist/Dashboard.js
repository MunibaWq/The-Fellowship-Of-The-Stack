import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllProducts } from "../../axios/gets";
import { getImagesByPID } from "../../axios/gets";
import { Link } from "react-router-dom";
import Button from "../../components/Reusable/Button";
import colors from "../../components/Reusable/Colors";
import { AddIcon } from "../../images/icons";
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
            <Link to="/products/create">
                <Button secondary>
                    Create a new product
                    <AddIcon stroke={colors.primary} />
                </Button>
            </Link>
            <table style={{ width: "100%" }}>
                <tr>
                    <input type="checkbox" />
                    <th></th>
                    <th>title</th>
                    <th>status</th>
                    <th>inventory</th>
                    <th>Edit</th>
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
                                <td>status</td>
                                <td>inventory</td>
                                <td>
                                    <Link to="/products/edit/:results.id">
                                        <Button secondary>
                                            Edit
                                            <AddIcon stroke={colors.primary} />
                                        </Button>
                                    </Link>
                                </td>
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
