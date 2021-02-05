import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Reusable/Button";
import { AddIcon } from "../../../images/icons";

const DashboardEvents = () => {
  
    return <div>Dashboard Events
    <Link to= '/dashboard/events/create'><Button><AddIcon/>Create Event </Button></Link> 
    </div>;
};

export default DashboardEvents;
