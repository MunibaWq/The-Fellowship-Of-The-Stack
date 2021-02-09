import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Reusable/Button";
import { AddIcon } from "../../../images/icons";
import axios from "axios";
import { getAllArtistEvents } from "../../../axios/gets";

const DashboardEvents = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getArtistEvents = async () => {
            let data = await getAllArtistEvents(22);
            setResults(data);
        };
        getArtistEvents();
    }, []);
    console.log(results);
    return (
        <div>
            Dashboard Events
            <Link to="/dashboard/events/create">
                <Button>
                    <AddIcon />
                    Create Event
                </Button>
            </Link>
        </div>
    );
};

export default DashboardEvents;
