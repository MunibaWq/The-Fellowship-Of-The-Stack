import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllMyProducts } from "../../../axios/gets";
import { Link } from "react-router-dom";
import Button from "../../../components/Redesign/Reusable/Button";
// import theme from "../../../components/Reusable/Colors";
import theme from "../../../components/Redesign/Reusable/Theme";
import PageContainer from "../../../components/Redesign/Reusable/PageContainer";
import { AddIcon, UnfillPencilIcon, BinIcon } from "../../../images/icons";
import axios from "axios";
import { DeleteProductModal } from "../../../components/Dashboard/DeleteProductModal";
import Cookies from "universal-cookie";
import InventoryDropDown from "../../../components/Dashboard/AnalyticsTables/InventoryDropDown";
import Loading from "../../../components/Redesign/Reusable/Loading";
import Header from "../../../components/Redesign/Reusable/Header";

const cookies = new Cookies();

const Inventory = (currentProduct) => {
    const [results, setResults] = useState([]);
    const [inventory, setInventory] = useState([]);
    // const [status, setStatus] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                let data = await getAllMyProducts();
                setResults(data);
            } catch (e) {
                //window.location = '/account'
            }
        };
        getProducts();
    }, []);

    useEffect(() => {
        const getStock = async () => {
            let data = await axios.get("api/stock/getAll");
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
        await axios.put("api/products/edit/" + result.id, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: result,
        });
    };
    const showModal = (id) => {
        setVisible(!visible);
        setCurrentId(id);
    };

    let headers = [
        "",
        "Title",
        "Status",
        // "Inventory",
        "Edit",
        "Delete",
    ];

    return (
        <PageContainer>
            <Header title="Inventory" />
            <TableContainer>
                <Link
                    to="/dashboard/artist/products/create"
                    style={{ alignSelf: "flex-end" }}>
                    <CreateProductButton>
                        Create a new product
                    </CreateProductButton>
                </Link>
                <Table style={{ alignSelf: "center" }}>
                    <thead>
                        <Headers>
                            {headers.map((header, index) => (
                                <th key={`header${index}`}>
                                    <h2>{header}</h2>
                                </th>
                            ))}
                        </Headers>
                    </thead>
                    <tbody>
                        {results.length > 0 && inventory.length > 0 ? (
                            results.map((result, index) => {
                                return (
                                    <BodyRows key={result.title + index}>
                                        {/* <tr
                                            key={"inventory" + index}
                                            style={{ padding: "10%" }}> */}
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
                                        <td>
                                            <p>{result.title}</p>
                                        </td>
                                        <td>
                                            <InventoryDropDown
                                                result={result}
                                            />
                                        </td>
                                        {/* <td>
                                            {countInv(
                                                groupStockObj(
                                                    inventory,
                                                    result.id
                                                )
                                            )}
                                        </td> */}
                                        <td>
                                            <Link
                                                to={
                                                    "/dashboard/artist/products/edit/" +
                                                    result.id
                                                }>
                                                <UnfillPencilIcon
                                                    stroke={theme.black}
                                                />
                                            </Link>
                                        </td>
                                        <td>
                                            <DeleteButton
                                                onClick={() =>
                                                    showModal(result.id)
                                                }>
                                                <BinIcon />
                                            </DeleteButton>
                                        </td>
                                        {/* </tr> */}
                                    </BodyRows>
                                );
                            })
                        ) : (
                            <td>
                                <Loading />
                            </td>
                        )}
                    </tbody>
                </Table>
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
            </TableContainer>
        </PageContainer>
    );
};

export default Inventory;

const TableContainer = styled.div`
    justify-self: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 600px;
`;

const DeleteButton = styled.button.attrs(() => ({
    type: "button",
}))`
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    svg {
        path {
            stroke: ${theme.black};
        }
    }
`;
const CreateProductButton = styled(Button).attrs((props) => ({
    type: props.type || "button",
}))`
    /* border: none; */
    cursor: pointer;
    margin-bottom: 40px;
    /* svg {
        path {
            stroke: ${theme.black};
        }
    } */
`;
const Table = styled.table`
    /* position: relative; */
    border-collapse: collapse;
    /* margin: 0 1em 2em 1em; */
    font-size: 0.9em;

    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    thead > tr > th {
        position: sticky;
        top: 0;
        background-color: ${(props) => props.theme.black};
        :first-of-type {
            border-radius: 15px 0 0 0;
        }
        :last-of-type {
            border-radius: 0 15px 0 0;
        }
    }
    th,
    td {
        padding: 12px 15px;
        :nth-of-type(1) {
            min-width: 50px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(2) {
            min-width: 130px;
        }
        :nth-of-type(3) {
            min-width: 250px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(4) {
            min-width: 110px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        }
        :nth-of-type(5) {
            min-width: 110px;
        }
        /* :nth-of-type(6) {
            min-width: 190px;
            @media screen and (max-width: 600px) {
                display: none;
            }
        } */
    }
`;

const Headers = styled.tr`
    h2 {
        color: #f3f6ff;
        text-align: left;
        margin-bottom: 0;
        text-transform: uppercase;
        font-size: 0.8em;
        /* letter-spacing: 0.03em; */
    }
`;

const BodyRows = styled.tr`
    border-bottom: thin solid #dddddd;
    cursor: pointer;
    p {
        color: ${theme.black};
        margin-bottom: 0;
    }
    :hover {
        background-color: ${theme.blueHover};
    }
    :nth-of-type(even) {
        background-color: ${theme.lightBlue};
        :hover {
            background-color: ${theme.blueHover};
        }
    }
    :nth-of-type(odd) {
        background-color: ${theme.blue};
        :hover {
            background-color: ${theme.blueHover};
        }
    }

    :last-of-type {
        border-bottom: 3px solid ${theme.lightPurple};
    }
`;
