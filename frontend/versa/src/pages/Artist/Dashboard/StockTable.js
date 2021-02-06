import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableStyle } from "./Inventory";

const StockTable = ({ item }) => {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        mapOverColorAndSize();
    }, [item]);

    function mapOverColorAndSize() {
        if (item.colours !== undefined && item.sizes !== undefined) {
            let result = [];
            for (let color of item.colours) {
                for (let size of item.sizes) {
                    let temp = {
                        color: color.label,
                        size: size.label,
                        price: size.price,
                        quantity: 0,
                    };
                    result.push(temp);
                }
            }
            setStock(result);
        }
    }

    function mapTable(arr) {
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
            <TableStyle>
                <tr>
                    <th>color </th>
                    <th>size </th>
                    <th>quantity </th>
                </tr>
                {mapTable(stock)}
            </TableStyle>
        </div>
    );
};

export default StockTable;
