import React from "react";
import styled from "styled-components";
import { TableContainer } from "./AnalyticsContainers";
const sorters = {
    "Date": (one, two) => {
        return (
            new Date(`${one.month}/${one.day}/${one.year}`) -
            new Date(`${two.month}/${two.day}/${two.year}`)
        );
    },
    "Total Sales": (one, two) => {
        return one.sum - two.sum;
    },
};
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
        background-color: ${props => props.theme.blue};
    }
    td {
        font-weight: 500;
        padding: 6px;
        font-size: 18px;
        padding: 20px 20px;
        border: none;
    }
`;
export const AnalyticsTable = ({ headers, setSortBy, tableData, sortBy }) => {
    return (
        <TableContainer>
            <SBPTable>
                {/* <thead>
                {headers.map((header, index) => (
                    <th
                        onClick={() => {
                            setSortBy(header);
                        }}
                        key={header + index}>
                        {header}
                    </th>
                ))}
            </thead> */}
                {/* <tbody> */}
                {tableData.sort(sorters[sortBy]).map((sales, index) => (
                    <tr key={sales.sum + index}>
                        <td>{`${sales.day}/${sales.month}/${sales.year}`}</td>
                        <td style={{ textAlign: "right" }}>
                            ${(+sales.sum).toFixed(2)}
                        </td>
                    </tr>
                ))}
                {/* </tbody> */}
            </SBPTable>
        </TableContainer>
    );
};
