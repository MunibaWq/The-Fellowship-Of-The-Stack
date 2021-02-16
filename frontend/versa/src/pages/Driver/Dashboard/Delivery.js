import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getOneOrder, getProductByID } from "../../../axios/gets";
import OrdersTable from "../../../components/Dashboard/AnalyticsTables/OrdersTable";
import OrderContainer from "../../Artist/Dashboard/Orders";

const Delivery = (props) => {
    let id;
    let person;
    let email;
    let address;
    if (props.location.state) {
        id = props.location.state.id;
        person = props.location.state.person;
        email = props.location.state.email;
        address = props.location.state.address;
    }
    const [results, setResults] = useState([]);
    const [modal, setModal] = useState(false);
    useEffect(() => {
        const getOrderItems = async (serial) => {
            const res = await getOneOrder(serial);
            setResults(res);
        };
        if (id !== undefined) {
            getOrderItems(id);
            console.log(id);
        }
    }, [id]);

    function showModal() {}

    function mapOrderItems() {
        if (results.length > 0) {
            return results.map((result) => {
                console.log(result);
                return (
                    <tr>
                        <td>{result.title}</td>
                        <td>{result.color}</td>
                        <td>{result.size}</td>
                        <td>{result.quantity}</td>

                        <td
                            onClick={() => {
                                setModal(!modal);
                            }}>
                            <div
                                style={{
                                    width: "600px",
                                    height: "300px",
                                    background: "#FFFFFF",
                                    zIndex: "999",
                                    position: "absolute",
                                    display: `${modal ? "block" : "none"}`,
                                    top: "15%",
                                    right: "30%",

                                    boxShadow: "1px 1rem 1rem black",
                                    borderRadius: "20px",
                                }}>
                                <p>{result.name}</p>
                                <p>{result.shipping_address}</p>
                                <p>{result.email}</p>
                                <p>{result.phone}</p>
                                <p>click to shrink screen*</p>
                            </div>
                            details
                        </td>
                    </tr>
                );
            });
        }
    }
    return (
        <div>
            <table>
                <tr>
                    <th>Product</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Quantity</th>

                    <th>Details</th>
                </tr>
                {mapOrderItems()}
            </table>
            <button>Start delivery?</button>
        </div>
    );
};

export default Delivery;
