import React from "react";
import styled from "styled-components";

const data = {
    headers: ["#", "Status", "Date", "Total"],
    values: [
        [8, "Received", "8/1/21", "$123.20"],
        [9, "Shipped", "8/3/21", "$126.90"],
        [10, "Processing", "8/4/21", "$23.20"],
        [11, "Confirmed", "8/5/21", "$3.20"],
        [12, "Paid", "8/6/21", "$12.20"],
    ],
};

const Table = ({ data }) => {
    return (
        <div>
            <table>
                <thead>
                    {data.table.headers.map((header) => (
                        <td>{header}</td>
                    ))}
                </thead>
                {data.table.values.map((row, index) => (
                    <tr>
                        {row.map((data) => (
                            <td>{data}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
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
