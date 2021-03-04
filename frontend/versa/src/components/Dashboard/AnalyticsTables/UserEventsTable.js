import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";
import { DeleteIcon } from "../../../images/icons";
import Button from "../../Reusable/Button";
import { deleteUserFromEventByID } from "../../../axios/deletes";

const UserEventsTable = ({ eventsData }) => {
    const [events, setEvents] = useState(eventsData);
    let headers = [
        // "Event ID",
        "Event Name",
        "Hosted By",
        "Location",
        "Start",
        "End",
        "Attendees",
        "Remove",
    ];

    useEffect(() => {
        setEvents(eventsData);
    }, [eventsData]);
    return (
        <TableContainer>
            {!events ? (
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

                    {events &&
                        events.map((event, index) => (
                            <BodyRows key={event.title + index}>
                                <td data-title="Event Name">
                                    <p>{event.title}</p>
                                </td>
                                <td data-title="Hosted By">
                                    <p>{event.host_name}</p>
                                </td>
                                <td data-title="Location">
                                    <p>{event.location}</p>
                                </td>
                                <td data-title="Start Time">
                                    <p>
                                        {new Date(
                                            event.start_time
                                        ).toLocaleString()}
                                    </p>
                                </td>
                                <td data-title="End Time">
                                    <p>
                                        {new Date(
                                            event.end_time
                                        ).toLocaleString()}
                                    </p>
                                </td>
                                <td data-title="Number of Attendees">
                                    <p>{event.num_attendees}</p>
                                </td>

                                <td data-title="Remove">
                                    <DeleteButton
                                        onClick={() => {
                                            let newEvents = eventsData.filter(
                                                (event, ind) => {
                                                    return ind !== index;
                                                }
                                            );
                                            setEvents(newEvents);
                                            deleteUserFromEventByID(event.id);
                                        }}>
                                        <DeleteIcon stroke={theme.primary} />
                                    </DeleteButton>
                                </td>
                            </BodyRows>
                        ))}
                </Table>
            )}
        </TableContainer>
    );
};

export default UserEventsTable;

const TableContainer = styled.div`
    justify-self: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 40px;
    svg {
        path {
            stroke: ${(props) => props.theme.purple};
        }
    }
    @media only screen and (max-width: 1000px) {
        table,
        thead,
        tbody,
        th,
        td,
        tr {
            display: block;
            border: 1;
        }

        /* Hide table headers (but not display: none;, for accessibility) */
        thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
        }

        tr {
            border: 2px solid #ccc;
            margin-bottom: 8px;
        }

        td {
            /* Behave  like a "row" */
            height: 4rem;
            border: none;
            border-bottom: 1px solid #eee;
            position: relative;
            padding-left: 50%;
            white-space: normal;
            text-align: left;
        }

        td:before {
            /* Now like a table header */
            position: absolute;
            /* Top/left values mimic padding */
            /* top: 6px; */

            left: 6px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            text-align: left;
            font-weight: bold;
        }

        /*
	Label the data
	*/
        td:before {
            content: attr(data-title);
        }
        p,
        button {
            margin-top: 30px;
        }
        table {
            width: 70vw;
            min-width: unset;
        }
        tr {
            :hover {
                background-color: unset;
            }
            :nth-of-type(even) {
                background-color: unset;
                :hover {
                    background-color: unset;
                }
            }
        }
    }
`;

const Table = styled.table`
    /* position: relative; */
    border-collapse: collapse;
    /* margin: 0 1em 2em 1em; */
    font-size: 0.9em;
    width: 100%;

    box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
    thead > tr > th {
        position: sticky;
        top: 0;
        background-color: ${(props) => props.theme.black};
        :first-of-type {
            border-radius: 15px 0 0 0;
        }
        :last-of-type {
            border-radius: 0 15px 0 0;
        }
    }
    th,
    td {
        min-width: 150px;
        padding: 12px 15px;
        :nth-last-child(-n + 2) {
            min-width: 80px;
        }
    }
`;
const Headers = styled.tr`
    background-color: ${(props) => props.theme.purple};

    h2 {
        color: ${(props) => props.theme.blue};
        text-align: left;
        margin-bottom: 0;
        text-transform: uppercase;
        font-size: 0.8em;
    }
`;
const BodyRows = styled.tr`
    border-bottom: thin solid #dddddd;
    p {
        color: ${props=>props.theme.black};
        margin-bottom: 0;
    }
    :hover {
        background-color: ${props=>props.theme.blueHover};
    }
    :nth-of-type(even) {
        background-color: ${props=>props.theme.lightBlue};
        :hover {
            background-color: ${props=>props.theme.blueHover};
        }
    }
    :nth-of-type(odd) {
        background-color: ${props=>props.theme.blue};
        :hover {
            background-color: ${props=>props.theme.blueHover};
        }
    }

    :last-of-type {
        border-bottom: 3px solid ${props=>props.theme.lightPurple};
    }
`;

const DeleteButton = styled(Button)`
    background: none;
    border: none;
`;
