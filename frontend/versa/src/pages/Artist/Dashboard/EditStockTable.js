import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const EditStockTable = ({ tempColour, tempSize }) => {
    const [stock, setStock] = useState([]);
    const { id } = useParams();

    // const tempIncoming = {
    //     product_id: id,
    //     color: tempColour[0].label,
    //     size: tempSize[0].label,
    //     quantity: 1,
    // }

    useEffect(() => {
        const getProductStock = async () => {
            const res = await axios.get("/stock/get/" + id);
            setStock(res.data);
        };
        getProductStock();
    }, []);

    // useEffect(() => {
    //     const updateStock = () => {
    //         setStock(...[tempIncoming]);
    //     };
    //     updateStock();
    // }, []);

    console.log(stock);
    // console.log(tempColour);
    // console.log(tempSize);
    // console.log(tempIncoming);
    // console.log(tempIncoming);

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
            stock
            <TableStyle>
                <tr>
                    <th>color </th>
                    <th>size </th>
                    <th>quantity </th>
                </tr>
                {mapTable(stock)}
            </TableStyle>
            <button
                onClick={() => {
                    axios.put("/stock/put", {
                        stock,
                    });
                }}>
                edit
            </button>
        </div>
    );
};
const TableStyle = styled.table`
    min-width: 655px;
    text-align: left;
    padding: 1%;
    margin-top: 10%;
    width: 100%;
    /* border: 1px solid black; */
    border-collapse: collapse;
    tr:nth-child(odd) {
        background: beige;
    }
    th {
        padding: 1%;
    }
    td {
        padding: 1%;
        border-collapse: collapse;
    }
`;
export default EditStockTable;
