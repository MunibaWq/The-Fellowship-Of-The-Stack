import React from "react";
import styled from "styled-components";
import { SBPTable, sorters } from "../../../pages/Artist/Dashboard/TotalSales";

export const AnalyticsTable = ({ headers, setSortBy, tableData, sortBy }) => {
    return <TableContainer>
        <SBPTable>
            <thead>
                {headers.map((header, index) => (
                    <th
                        onClick={() => {
                            setSortBy(header);
                        }}
                        key={header + index}>
                        {header}
                    </th>
                ))}
            </thead>
            <tbody>
                {tableData
                    .sort(sorters[sortBy])
                    .map((sales, index) => (
                        <tr key={sales.sum + index}>
                            <td>{`${sales.day}/${sales.month}/${sales.year}`}</td>
                            <td>${(+sales.sum).toFixed(2)}</td>
                        </tr>
                    ))}
            </tbody>
        </SBPTable>
    </TableContainer>;
};


const Container = styled.div``;
const TableContainer = styled(Container)`


`