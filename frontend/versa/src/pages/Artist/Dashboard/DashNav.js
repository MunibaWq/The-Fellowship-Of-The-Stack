import React from "react";
import { CarIcon } from "../../../images/icons";

let artist = [
    { ORDERS: <CarIcon /> },
    { INVENTORY: <CarIcon /> },
    { ANALYTICS: <CarIcon /> },
    { "MANAGE EVENTS": <CarIcon /> },
];
let driver = [
    { "MANAGE-ORDERS": <CarIcon /> },
    { PICKUPS: <CarIcon /> },
    { DELIVERIES: <CarIcon /> },
];

let buyer = [{ ORDERS: <CarIcon /> }, { EVENTS: <CarIcon /> }];

function mapLabel(k) {
    let result = [];
    for (const group of k) {
        for (const prop in group) {
            result.push(
                <div>
                    {prop}
                    {group[prop]}
                </div>
            );
        }
    }
    return result;
}
let driverLinks = mapLabel(driver);
let artistLinks = mapLabel(artist);
let buyerLinks = mapLabel(buyer);

const DashNav = ({ type }) => {
    function matchType() {
        if (type === "driver") {
            return driverLinks;
        } else if (type === "artist") {
            return artistLinks;
        } else if (type === "buyer") {
            return buyerLinks;
        } else {
            return <div></div>;
        }
    }
    return <div>{matchType()}</div>;
};

export default DashNav;
