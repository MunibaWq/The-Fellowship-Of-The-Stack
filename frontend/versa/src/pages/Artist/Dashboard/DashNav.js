import React, { useState } from "react";
import {
    CarIcon,
    Package,
    Calender,
    Chartbar,
    Archive,
    ArchiveBox,
    MapPin,
} from "../../../images/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const white = "#F3F6FF";
const newPurp = "#6B45FF";
const lightPurp = "#E0B8FF";
const green = "#B4FFC6";
const black = "#1C1C1C";

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
    {
        label: "ANALYTICS",
        item: <Chartbar />,
        to: "/dashboard/artist/analytics",
    },
    {
        label: "MANAGE EVENTS",
        item: <Calender />,
        to: "/dashboard/artist/manage-events",
    },
];
let driver = [
    {
        label: "MANAGE ORDERS",
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

const Label = styled.h4`
    color: ${white};
    margin-right: 30px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;
const DashLink = styled(Link)`
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
    svg {
        stroke: ${white};
    }
    &:hover {
        svg {
            stroke: ${green};
        }
        ${Label} {
            color: ${green};
        }
    }
`;

function mapLabel(k) {
    let result = [];
    for (const group of k) {
        let label;
        let item;
        let to;
        for (const prop in group) {
            if (prop === "label") {
                label = group[prop];
            }
            if (prop === "item") {
                item = group[prop];
            }
            if (prop === "to") {
                to = group[prop];
            }
        }
        result.push(
            <DashLink to={to}>
                <Label>{label}</Label>
                {item}
            </DashLink>
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
    return <LinkContainer>{matchType()}</LinkContainer>;
};

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 20px;
`;
export default DashNav;
