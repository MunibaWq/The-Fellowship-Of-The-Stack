import React from "react";
import styled from "styled-components";

const Table = ({ productData, headers }) => {
    return (
        <table>
            <thead>
                {headers.map((header) => (
                    <td>{header}</td>
                ))}
            </thead>
            {productData.map((product, index) => (
                <tr key={product.product_name + index}>
                    <td>{product.product_name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.sale_price}</td>
                    <td>{product.total}</td>
                </tr>
            ))}
        </table>
    );
};

export default Table;

const table = styled.div`
    margin: 5px;
    display: flex;
    justify-content: center;
    padding-top: 5px;
    td {
        font-weight: 300;
        padding: 6px;
        font-size: 10px;
    }
    table,
    th,
    thead {
        padding: 6px;

        border-collapse: collapse;
    }
    thead {
        border-bottom: 2px solid #9a9a9a;
        td {
            font-weight: 700;
        }
    }
`;
