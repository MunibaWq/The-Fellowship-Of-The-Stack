import React from "react";
import { Link } from "react-router-dom";
// import logo from "../../images/logo.svg";
import styled from "styled-components";
// import Icon from "../Reusable/Icons";
import colors from "./Reusable/Colors";

import {
    EventsIcon,
    AccountIcon,
    WishListIcon,
    CartIcon,
    Magnifying,
    VersaIcon,
    Dashboard,
} from "../images/icons";
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    return (
        <Nav colors={colors}>
            <NavLink color={colors.secondary} to="/">
                {/* <Logo src={logo} alt="logo" /> */}
                <VersaIcon
                    width="40px"
                    height="40px"
                    triangleFill={colors.logoTriangle}
                    circleFill={colors.logoCircle}
                    rectFill={colors.logoRect}
                    textFill={colors.logoText}
                    triangleStroke="none"
                    circleStroke="none"
                    rectStroke="none"
                    textStroke={colors.logoText}
                />
            </NavLink>

            <NavMenu>
                <NavLink color={colors.secondary} to="/shop">
                    <Magnifying stroke={colors.secondary} />
                    <WordLink>Shop</WordLink>
                </NavLink>
                {/* <NavLink color={colors.secondary} to="/products/create">
                    Create
                </NavLink> */}
                {/* <NavLink color={colors.secondary} to="/products/edit/1">
                    Edit
                </NavLink> */}
                <NavLink color={colors.secondary} to="/events">
                    <EventsIcon stroke={colors.secondary} />
                    <WordLink>Events</WordLink>
                </NavLink>
                <NavLink color={colors.secondary} to="/account">
                    <AccountIcon stroke={colors.secondary} />
                    <WordLink>Account</WordLink>
                </NavLink>
                <NavLink color={colors.secondary} to="/wishlist">
                    <WishListIcon stroke={colors.secondary} />
                </NavLink>
                <NavLink color={colors.secondary} to="/shopping-cart">
                    <CartIcon stroke={colors.secondary} />
                </NavLink>
                {user && (
                    <NavLink
                        color={colors.secondary}
                        to={"/dashboard/" + user.id}
                    >
                        <Dashboard stroke={colors.secondary} />
                    </NavLink>
                )}

                {/* <NavLink colors={colors} to="/product-item">PRODUCT ITEM</NavLink> */}
            </NavMenu>
        </Nav>
    );
};

export default Navbar;

// const Logo = styled.img`
//     padding: 0;
//     margin: 0;
//     height: 50px;
//     width: 50px;
// `;

export const Nav = styled.nav`
    background: ${(props) => props.colors.primary};
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    z-index: 10;
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    align-self: flex-start;
    overflow: hidden;
`;

const NavLink = styled(Link)`
    color: ${(props) => props.color || "#444"};
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    padding: 0 10px 0 10px;
    text-transform: uppercase;

    &.active {
        color: #038db2;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
`;

const WordLink = styled.h2`
    display: visible;
    text-transform: uppercase;
    color: ${colors.secondary};
    letter-spacing: 0.08em;
    margin: 0 0 0 8px;
    font-size: 0.8em;
    @media (max-width: 700px) {
        display: none;
    }
`;
