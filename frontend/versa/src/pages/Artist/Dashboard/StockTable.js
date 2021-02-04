import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableStyle } from "./Inventory";
import { getAllArtistProducts } from "../../../axios/gets";
const StockTable = ({ formType }) => {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        const getProductStock = async () => {
            const res = await axios.get("/products/test");
            setStock(res.data);
        };
        getProductStock();
    }, []);
    console.log(stock);

    function mapTable(arr, arr2) {
        if (arr.length > 0) {
            return arr.map((item) => {
                return (
                    <tr>
                        <td>{item.color}</td>
                        <td>{item.size}</td>

                        <td>
                            <input type="number" placeholder={item.quantity} />
                        </td>
                    </tr>
                );
            });
        } else {
            return <tr></tr>;
        }
    }

    return (
        <div>
            stock
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(e);
                }}>
                <TableStyle>
                    <tr>
                        <th>color </th>
                        <th>size </th>
                        <th>quantity </th>
                    </tr>
                    {mapTable(stock)}
                </TableStyle>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default StockTable;
