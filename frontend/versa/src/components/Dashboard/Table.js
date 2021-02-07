import React from "react";
import styled from "styled-components";

const data = {
    headers: ["Name", "# Sold", "Colour", "Size", "Total Revenue"],
    values: [
        ["Totem Candle", 264, "Plum", "XS", "$11,298"],
        ["Goober Candle", 235, "8/3/21", "$9,221"],
        ["Doodle Crayon", 198, "8/4/21", "$7,321"],
        ["Plant Pedestal", 176, "8/5/21", "$6,345"],
        ["Match Striker", 123, "8/6/21", "$4,123"],
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
