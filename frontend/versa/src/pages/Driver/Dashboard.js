import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllProducts } from "../../axios/gets";
import { getImagesByPID } from "../../axios/gets";
import { Link } from "react-router-dom";
import Button from "../../components/Reusable/Button";
import theme from "../../components/Reusable/Colors";
import { AddIcon, EditIcon, DeleteIcon } from "../../images/icons";
import axios from "axios";
import Loading from "../../components/Reusable/Loading";
import { DeleteProductModal } from "../../components/Dashboard/DeleteProductModal";

const Dashboard = (currentProduct) => {
    const [results, setResults] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [status, setStatus] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    useEffect(() => {
        const getProducts = async () => {
            let data = await getAllProducts();
            setResults(data);
        };
        getProducts();
    }, []);
    console.log(results);

    const updateStatus = async (result, status) => {
        result.status = status;
        await axios.put("/products/edit/" + result.id, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: result,
        });
        return status;
    };
    const showModal = (id) => {
        setVisible(!visible);
        console.log(`showing screen x`, window.innerWidth);
        setCurrentId(id);
    };
    return (
        <div style={{ padding: "2%" }}>
            <Link to="/account">
                <Button secondary>
                    Back To Dashboard
                    <AddIcon stroke={theme.primary} />
                </Button>
            </Link>
            <Link to="/products/create">
                <Button secondary>
                    Create a new product
                    <AddIcon stroke={theme.primary} />
                </Button>
            </Link>
            <TableStyle style={{ width: "100%" }}>
                <tr>
                    <th>PIC</th>
                    <th>TITLE</th>
                    <th>STATUS</th>
                    <th>INVENTORY</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
                {results ? (
                    results.map((result, index) => {
                        return (
                            <tr style={{ padding: "10%" }}>
                                <td
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                    }}>
                                    <img
                                        src={
                                            "https://versabucket.s3.us-east-2.amazonaws.com/images/" +
                                            result.thumbnail +
                                            ".jpeg"
                                        }
                                        style={{
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </td>
                                <td>{result.title}</td>
                                <td>
                                    {result.status} <br />
                                    <select
                                        onChange={(e) => {
                                            const newStatus = updateStatus(
                                                result,
                                                e.target.value
                                            );
                                            setStatus(newStatus);
                                        }}>
                                        <option value={result.status}>
                                            Select Status
                                        </option>
                                        <option label="Active">Active</option>
                                        <option label="Backorder">
                                            Backorder
                                        </option>
                                        <option label="Discontinue">
                                            Discontinue
                                        </option>
                                    </select>
                                </td>
                                <td>{Math.floor(Math.random() * 10)}</td>
                                <td>
                                    <Link to={`/products/edit/:${result.id}`}>
                                        <EditIcon stroke={theme.primary} />
                                    </Link>
                                    {/* <Button secondary>
                                            Edit
                                            <AddIcon stroke={colors.primary} />
                                        </Button>
                                    </Link> */}
                                </td>
                                <td>
                                    <Button
                                        onClick={() => showModal(result.id)}>
                                        <DeleteIcon stroke={theme.primary} />
                                    </Button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <td>Loading...</td>
                )}
            </TableStyle>
            {visible ? (
                <DeleteProductModal
                    value={visible}
                    setter={setVisible}
                    id={currentId}
                    display="flex"
                />
            ) : (
                <DeleteProductModal
                    value={visible}
                    setter={setVisible}
                    id={currentId}
                    display="none"
                />
            )}
        </div>
    );
};

export default Dashboard;

const TableStyle = styled.table`
    min-width: 655px;
    text-align: left;
    padding: 1%;

    width: 100%;
    /* border: 1px solid black; */
    border-collapse: collapse;
    th {
        padding: 1%;
    }
    td {
        padding: 1%;
        border-collapse: collapse;
    }
`;
