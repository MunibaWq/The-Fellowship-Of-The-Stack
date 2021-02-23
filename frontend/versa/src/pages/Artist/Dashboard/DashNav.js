import React from "react";
import {
    CarIcon,
    Package,
    Calender,
    Chartbar,
    Archive,
    ArchiveBox,
    MapPin,
} from "../../../images/icons";

let artist = [
    {
        label: "ORDERS",
        item: <Package />,
        to: "/dashboard/artist/recent-orders/",
    },
    {
        label: "INVENTORY",
        item: <Archive />,
        to: "/dashboard/artist/inventory",
    },
    { label: "ANALYTICS", item: <Chartbar />, to: "/" },
    {
        label: "MANAGE EVENTS",
        item: <Calender />,
        to: "/dashboard/artist/manage-events",
    },
];
let driver = [
    {
        label: "MANAGE-ORDERS",
        item: <Package />,
        to: "/dashboard/driver/orders",
    },
    {
        label: "PICKUPS",
        item: <ArchiveBox />,
        to: "/dashboard/driver/assigned-pickups/",
    },
    {
        label: "DELIVERIES",
        item: <MapPin />,
        to: "/dashboard/driver/delivery-history",
    },
];

let buyer = [
    {
        label: "ORDERS",
        item: <Package />,
        to: "/dashboard/shopper/order-tracking/",
    },
    {
        label: "EVENTS",
        item: <Calender />,
        to: "/dashboard/shopper/events-attending",
    },
];

function mapLabel(k) {
    let result = [];
    for (const group of k) {
        let label;
        let item;
        for (const prop in group) {
            if (prop === "label") {
                label = group[prop];
            }
            if (prop === "item") {
                item = group[prop];
            }
        }
        result.push(
            <div>
                {label}
                {item}
            </div>
        );
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
