import React from "react";
import styled from "styled-components";

const Dashboard = () => {
    return (
        <div style={{ padding: "2%" }}>
            <table style={{ width: "100%" }}>
                <tr>
                    <th>title</th>
                    <th>status</th>
                    <th>inventory</th>
                    <th>update</th>
                    <th>delete</th>
                </tr>
            </table>
        </div>
    );
};

export default Dashboard;
