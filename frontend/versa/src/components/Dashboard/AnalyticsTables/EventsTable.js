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
        "Start",
        "End",
        "Attendees",
        "Status",
        "Edit",
        "Delete",
    ];

    const showModal = (id) => {
        setVisible(!visible);
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
                            <BodyRows key={event.title + index}>
                                <td>
                                    <p>{event.title}</p>
                                </td>
                                <td>
                                    <p>{event.start_time}</p>
                                </td>
                                <td>
                                    <p>{event.end_time}</p>
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
                                            "/dashboard/artist/events/edit/" +
                                            event.id
                                        }>
                                        <p>
                                            <EditIcon />
                                        </p>
                                    </Link>
                                </td>
                                <td>
                                    <DeleteButton
                                        onClick={() => showModal(event.id)}>
                                        <DeleteIcon  />
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 40px;
    svg {
        path {
            stroke: ${props=>props.theme.purple};
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
    background-color: ${props=>props.theme.purple};

    h2 {
        color: ${props=>props.theme.blue};
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
