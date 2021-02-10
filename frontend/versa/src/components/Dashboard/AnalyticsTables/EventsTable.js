import React from "react";
import styled from "styled-components";
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";
import { Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "../../../images/icons";
import DropDown from "./EventsDropDown";

const EventsTable = ({ eventsData }) => {
    let headers = [
        // "Event ID",
        "Event Name",
        "Start Date/Time",
        "End Date/Time",
        "Attendees",
        "Status",
        "Edit",
        "Delete",
    ];
    console.log(eventsData);
    // console.log(new Date(eventsData[0].start_time));
    return (
        <TableContainer>
            {!eventsData ? (
                <Loading />
            ) : (
                <Table>
                    <thead>
                        <Headers>
                            {headers.map((header) => (
                                <th>
                                    <h2>{header}</h2>
                                </th>
                            ))}
                        </Headers>
                    </thead>

                    {eventsData &&
                        eventsData.map((event, index) => (
                            <BodyRows key={event.name + index}>
                                <td>
                                    <p>{event.name}</p>
                                </td>
                                <td>
                                    <p>{event.start_time}</p>
                                </td>
                                <td>
                                    <p>{event.end_time}</p>
                                </td>
                                <td>{event.num_attendees}</td>
                                <td>
                                    <DropDown eventStatus={event.status} />
                                </td>

                                <td>
                                    {/* <Link
                                        to={
                                           
                                        }> */}
                                    <p>
                                        <EditIcon stroke={theme.primary} />
                                    </p>
                                    {/* </Link> */}
                                </td>
                                <td>
                                    <p>
                                        <DeleteIcon stroke={theme.primary} />
                                    </p>
                                </td>
                            </BodyRows>
                        ))}
                </Table>
            )}
        </TableContainer>
    );
};

export default EventsTable;

const TableContainer = styled.div`
    justify-self: center;
`;

const Table = styled.table`
    position: relative;
    border-collapse: collapse;
    margin: 0 1em 2em 1em;
    font-size: 0.9em;
    min-width: 400px;
    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    border-radius: 15px 15px 0px 0px;
    th {
        position: sticky;
        top: 0;
    }
    th,
    td {
        padding: 12px 15px;
    }
`;
const Headers = styled.tr`
    background-color: ${theme.primary};

    h2 {
        color: ${theme.secondary};
        text-align: left;
        margin-bottom: 0;
        text-transform: uppercase;
        font-size: 0.8em;
        /* letter-spacing: 0.03em; */
    }
`;
const BodyRows = styled.tr`
    border-bottom: thin solid #dddddd;
    p {
        color: ${theme.tertiary};
        margin-bottom: 0;
    }
    :hover {
        background-color: ${theme.primary + "40"};
    }
    :nth-of-type(even) {
        background-color: #eff3fe60;
        :hover {
            background-color: ${theme.primary + "40"};
        }
    }

    :last-of-type {
        border-bottom: 2px solid ${theme.primary};
    }
`;
