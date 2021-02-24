import styled from "styled-components";

import React from "react";

const Table = ({ headers, data }) => {
    return (
        <ActualTable>
            <thead>
                <Headers>
                    {data.table.headers.map((header, index) => (
                        <th key={header + index}>
                            <h2>{header}</h2>
                        </th>
                    ))}
                </Headers>
            </thead>
            <tbody>
                {data.table.values.map((row, index) => (
                    <BodyRows key={`data${index}`}>
                        {row.map((data, index) => (
                            <td key={index}>
                                <p>{data}</p>
                            </td>
                        ))}
                    </BodyRows>
                ))}
                {data.length === 0 && (
                    <BodyRows key="no row">
                        <td key="No results">No Deliveries Found.</td>
                    </BodyRows>
                )}
            </tbody>
        </ActualTable>
    );
};

export default Table;

const ActualTable = styled.table`
    width: 100%;
    position: relative;
    border-collapse: collapse;
    margin: 1em;
    font-size: 0.9em;
    /* min-width: 955px; */
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px 15px 0px 0px;
    thead > tr > th {
        position: sticky;
        top: 0;
        background-color: ${(props) => props.theme.orange};
        :first-of-type {
            border-radius: 16px 0 0 0;
        }
        :last-of-type {
            border-radius: 0 16px 0 0;
        }
    }
    th,
    td {
        padding: 8px 12px;
        :nth-of-type(1) {
           
        }
        :nth-of-type(2) {
        }
        :nth-of-type(3) {
            
        }
        :nth-of-type(4) {
            
        }
    button {
        svg {
            :hover {
                path {
                    fill: ${(props) => props.theme.blue};
                    stroke: ${(props) => props.theme.blue};
                }
                path {
                    fill: ${(props) => props.theme.blue};
                }
            }
        }
    }
`;
const Headers = styled.tr`
    h2 {
        color: ${(props) => props.theme.black};
        text-align: left;
        margin-bottom: 0;
        text-transform: uppercase;
        font-size: 0.8em;
        /* letter-spacing: 0.03em; */
    }
`;
const BodyRows = styled.tr`
    border-bottom: thin solid ${(props) => props.theme.lightPurple + 60};
    transition: all 0.2s ease;
    p {
        color: ${(props) => props.theme.black};
        margin-bottom: 0;
    }
    :hover {
        background-color: ${(props) => props.theme.blueHover};
    }
    :nth-of-type(even) {
        background-color: ${(props) => props.theme.blue};
        :hover {
            background-color: ${(props) => props.theme.blueHover};
        }
    }

    :last-of-type {
        border-bottom: 2px solid ${(props) => props.theme.lightPurple};
    }
`;
