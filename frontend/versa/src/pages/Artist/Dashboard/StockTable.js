import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableStyle } from "./Inventory";

const StockTable = ({ item, setter }) => {
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
                    for (let el of stock) {
                        if (
                            el.color === color.label &&
                            el.size === size.label
                        ) {
                            temp.quantity = el.quantity;
                        }
                    }
                    result.push(temp);
                }
            }
            setter(result);
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
                            <input
                                type="number"
                                placeholder={item.quantity}
                                onChange={(e) => {
                                    item.quantity = e.target.value;
                                    setStock([...stock]);
                                }}
                            />
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
