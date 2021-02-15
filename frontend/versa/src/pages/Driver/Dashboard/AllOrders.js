import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const dat = await axios.get("/api/orders/getOrders");
            setOrders(dat.data);
        };
        getOrders();
    }, []);

    function mapOrders() {
        if (orders.length > 0) {
            return orders.map((order) => {
                return (
                    <tr style={{ display: "flex" }}>
                        <Link
                            to={{
                                pathname: `/driver-dashboard/delivery`,
                                state: {
                                    id: order.id,
                                    person: order.name,
                                    email: order.email,
                                },
                            }}>
                            <td
                                style={{
                                    alignSelf: "center",
                                    width: "100px",
                                    height: "30px",
                                    background: "#468670",
                                }}></td>
                        </Link>
                        <td>{order.date}</td>
                        <td>{order.pickup ? "pickup" : "delivery"}</td>
                        <td>{order.shipping_address}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.phone}</td>
                        <td>{order.delivery_notes}</td>
                    </tr>
                );
            });
        }
    }
    return (
        <div>
            <h1>All current orders Page</h1>
            <table>{mapOrders()}</table>
        </div>
    );
};
export default AllOrders;
