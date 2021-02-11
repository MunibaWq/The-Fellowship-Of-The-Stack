import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllMyProducts } from "../../../axios/gets";
import { getImagesByPID } from "../../../axios/gets";
import { Link } from "react-router-dom";
import Button from "../../../components/Reusable/Button";
import theme from "../../../components/Reusable/Colors";
import { AddIcon, EditIcon, DeleteIcon } from "../../../images/icons";
import axios from "axios";
import Loading from "../../../components/Reusable/Loading";
import { DeleteProductModal } from "../../../components/Dashboard/DeleteProductModal";

const Inventory = (currentProduct) => {
    const [results, setResults] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [status, setStatus] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            let data = await getAllMyProducts();
            setResults(data);
        };
        getProducts();
    }, []);

    useEffect(() => {
        const getStock = async () => {
            let data = await axios.get("/stock/getAll");
            setInventory(data.data);
        };
        getStock();
    }, []);

    function groupStockObj(obj, id) {
        let result = [];
        for (let row of obj) {
            if (row.product_id === id) {
                result.push(row);
            }
        }
        return result;
    }

    function countInv(arr) {
        let invTotal = 0;
        let invItems = arr.length;
        for (let item of arr) {
            invTotal += item.quantity;
        }
        return `(${invTotal}) stock over ${invItems} variations.`;
    }

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
            <Link to="/dashboard/products/create">
                <Button secondary style={{ float: "right" }}>
                    Create a new product
                    <AddIcon stroke={theme.primary} />
                </Button>
            </Link>
            <TableStyle>
                <tr>
                    <th>PIC</th>
                    <th>TITLE</th>
                    <th>STATUS</th>
                    <th>INVENTORY</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
                {results.length > 0 && inventory.length > 0 ? (
                    results.map((result) => {
                        return (
                            <tr style={{ padding: "10%" }}>
                                <td
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                    }}>
                                    <img
                                        alt={result.title}
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
                                <td>
                                    {countInv(
                                        groupStockObj(inventory, result.id)
                                    )}
                                </td>
                                <td>
                                    <Link
                                        to={
                                            "/dashboard/products/edit/" +
                                            result.id
                                        }>
                                        <EditIcon stroke={theme.primary} />
                                    </Link>
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

export default Inventory;

export const TableStyle = styled.table`
    min-width: 655px;
    text-align: left;
    padding: 1%;
    margin-top: 10%;
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
