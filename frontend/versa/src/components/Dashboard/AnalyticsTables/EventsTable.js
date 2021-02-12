import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../Reusable/Colors";
import Loading from "../../Reusable/Loading";
import { Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "../../../images/icons";
import DropDown from "./EventsDropDown";
import { DeleteEventModal } from "../DeleteEventModal";
import Button from "../../Reusable/Button";

const EventsTable = ({ eventsData }) => {
    const [visible, setVisible] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    let headers = [
        // "Event ID",
        "Event Name",
        "Start Date",
        "End Date/Time",
        "Attendees",
        "Status",
        "Edit",
        "Delete",
    ];
    console.log(eventsData);

    const showModal = (id) => {
        setVisible(!visible);
        console.log(`showing screen x`, window.innerWidth);
        setCurrentId(id);
    };

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
                                    <p>
                                        {new Date(
                                            event.start_time
                                        ).toLocaleString()}
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        {new Date(
                                            event.end_time
                                        ).toLocaleString()}
                                    </p>
                                </td>
                                <td>{event.num_attendees}</td>
                                <td style={{ width: "17%" }}>
                                    <DropDown
                                        eventStatus={event.status}
                                        eventID={event.id}
                                    />
                                </td>

                                <td>
                                    <Link
                                        to={
                                            "/dashboard/events/edit/" + event.id
                                        }>
                                        <p>
                                            <EditIcon stroke={theme.primary} />
                                        </p>
                                    </Link>
                                </td>
                                <td>
                                    <DeleteButton
                                        onClick={() => showModal(event.id)}>
                                        <DeleteIcon stroke={theme.primary} />
                                    </DeleteButton>
                                </td>
                            </BodyRows>
                        ))}
                </Table>
            )}
            {visible ? (
                <DeleteEventModal
                    value={visible}
                    setter={setVisible}
                    id={currentId}
                    display="flex"
                />
            ) : (
                <DeleteEventModal
                    value={visible}
                    setter={setVisible}
                    id={currentId}
                    display="none"
                />
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

const DeleteButton = styled(Button)`
    background: none;
    border: none;
`;
