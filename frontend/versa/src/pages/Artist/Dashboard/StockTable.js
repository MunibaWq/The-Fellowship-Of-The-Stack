import React, { useState, useEffect } from "react";
// import { TableStyle } from "./Inventory";
import styled from "styled-components";
const StockTable = ({ item, setter }) => {
    let [stock, setStock] = useState([]);

    function mapOverColorAndSize(stock) {
        if (item.colours && item.sizes) {
            let result = [];
            for (let color of item.colours) {
                for (let size of item.sizes) {
                    let temp = {
                        color: color.label,
                        size: size.label,
                        price: size.price,
                        quantity: 0,
                        cost: size.cost,
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

    useEffect(() => {
        setTimeout(() => {
            mapOverColorAndSize(stock);
        }, 1000);
    }, [item, stock.length]);

    function calcMargin(base, price, cost) {
        if (cost && price && base) {
            return parseFloat(base) + parseFloat(price) - cost;
        }
        return "N/A";
    }
    function mapTable(arr) {
        if (arr.length > 0) {
            return arr.map((unit) => {
                return (
                    <tr>
                        <td>{unit.color}</td>
                        <td>{unit.size}</td>

                        <td>
                            <input
                                type="number"
                                value={unit.quantity}
                                onChange={(e) => {
                                    unit.quantity = e.target.value;
                                    setStock([...stock]);
                                    setter(stock);
                                }}
                            />
                        </td>
                        <td>{unit.cost}</td>
                        <td>{calcMargin(item.price, unit.price, unit.cost)}</td>
                    </tr>
                );
            });
        } else {
            return <tr></tr>;
        }
    }

    return (
        <div>
            <h2>Stock Levels</h2>
            <TableStyle>
                <tr>
                    <th>Color </th>
                    <th>Size </th>
                    <th>Quantity </th>
                    <th>Cost </th>
                    <th>Margin </th>
                </tr>
                {mapTable(stock)}
            </TableStyle>
        </div>
    );
};
const TableStyle = styled.table`
    width: 100%;
    text-align: left;
    padding: 1%;
    margin-top: 10%;
    margin-bottom: 10%;
    width: 100%;
    /* border: 1px solid black; */
    border-collapse: collapse;
    tr:nth-child(odd) {
        background: #6495ed55;
    }
    th {
        padding: 1%;
        border-bottom: #6495ed55 solid 1px;
    }
    td {
        padding: 1%;
        border-collapse: collapse;
    }
    input {
        width: 100%;
    }
`;

export default StockTable;
