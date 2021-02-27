import React from "react";
import styled from "styled-components";
import { TableContainer } from "../../../components/Redesign/Reusable/Analytics/AnalyticsContainers";

const AnalyticsTableSBP = ({ sorters, tableData, sortBy }) => {
    console.log('table', tableData, sorters, sortBy)
    return (
        <TableContainer>
            <SBPTable>
                <tbody>
                    {tableData &&
                        [...tableData]
                            .sort(sorters[sortBy])
                            .map((product, index) => (
                                    <tr key={product.title + index}>
                                        <td>{product.title}</td>
                                        <td>
                                            {product.color === "O"
                                                ? "One Size"
                                                : product.color}
                                        </td>
                                        <td>
                                            {product.size === "O"
                                                ? "One Size"
                                                : product.size}
                                        </td>
                                        <td>
                                            {(+product.sale_price).toFixed(2)}
                                        </td>
                                        <td>{product.quantity}</td>
                                        <td>{(+product.sum).toFixed(2)}</td>
                                    </tr>
                                )
                            )}
                </tbody>
            </SBPTable>
        </TableContainer>
    );
}

export default AnalyticsTableSBP

const SBPTable = styled.table`
    margin: 5px;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    padding-top: 5px;
    td {
        font-weight: 500;
        padding: 6px;
        font-size: 18px;
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
        text-align: left;
        th {
            cursor: pointer;
            text-decoration: underline;
        }
    }
`;