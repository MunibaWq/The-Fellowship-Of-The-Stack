import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Delivery = (props) => {
    const { id, person, email } = props.location.state;
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getOrderItems = async () => {
            const res = await axios.get("/api/orders/getOrderItems/" + id);
            setResults(res.data);
        };
        getOrderItems();
    }, []);

    function mapOrderItems() {
        if (results.length > 0) {
            return results.map((result) => {
                console.log(id, person, email);
                return (
                    <tr>
                        <td>Product</td>
                        <td>{result.color}</td>
                        <td>{result.size}</td>
                        <td>{result.quantity}</td>
                        <td>address</td>
                        <td>details</td>
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
                    <th>address</th>
                    <th>Details</th>
                </tr>
                {mapOrderItems()}
            </table>
        </div>
    );
};

export default Delivery;
