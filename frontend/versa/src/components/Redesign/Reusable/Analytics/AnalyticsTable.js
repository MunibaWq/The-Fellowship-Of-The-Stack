import React from "react";
import styled from "styled-components";
import { TableContainer } from "./AnalyticsContainers";

const SBPTable = styled.table`
    width: 100%;

    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    padding-top: 5px;

    padding: 6px;
    border-collapse: collapse;
    border-spacing: 0;

    /* thead {
        border-bottom: 2px solid #9a9a9a;
        td {
            font-weight: 700;
        }
        text-align: left;
        th {
            cursor: pointer;
            text-decoration: underline;
        }
    } */
    tr:nth-child(even) {
        background-color: ${(props) => props.theme.blue};
    }
    td {
        font-weight: 500;
        padding: 6px;
        font-size: 18px;
        padding: 20px 40px;
        border: none;
    }
`;
export const AnalyticsTable = ({
    avg,
    sorters,
    decimal,
    tableData,
    sortBy,
}) => {
    return (
        <TableContainer>
            <SBPTable>
                <tbody>
                    {tableData.sort(sorters[sortBy]).map((sales, index) => (
                        <tr key={sales.sum + index}>
                            <td>{`${sales.day}/${sales.month}/${sales.year}`}</td>
                            <td style={{ textAlign: "right" }}>
                                $
                                {avg
                                    ? (+sales.average).toFixed(2)
                                    : (+sales.sum).toFixed(decimal ? 2 : 0)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </SBPTable>
        </TableContainer>
    );
};
