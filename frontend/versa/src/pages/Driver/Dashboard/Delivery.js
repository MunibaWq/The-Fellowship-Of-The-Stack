import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Delivery = () => {
    const { slug } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getOrderItems = async () => {
            const res = await axios.get("/api/orders/getOrderItems/" + slug);
            setResults(res.data);
        };
        getOrderItems();
    }, []);

    function mapOrderItems() {
        if (results.length > 0) {
            return results.map((result) => {
                return JSON.stringify(result);
            });
        }
    }
    return (
        <div>
            <div>THis is the delivery page</div>
            <div>{mapOrderItems()}</div>
        </div>
    );
};

export default Delivery;
