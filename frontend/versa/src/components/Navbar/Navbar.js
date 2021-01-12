import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import styled from "styled-components";

const Navbar = () => {
    return (
        <Nav>
            <NavLink to="/">
                <Logo src={logo} alt="logo" />
            </NavLink>

            <NavMenu>
                <NavLink to="/shop">SHOP</NavLink>
                {/* <NavLink to="/events">EVENTS</NavLink>
                <NavLink to="/account">ACCOUNT</NavLink>
                <NavLink to="/wishlist">
                    <WishListIcon />
                </NavLink>
                <NavLink to="/shopping-cart">
                    <ShoppingCart />
                </NavLink> */}
                {/* <NavLink to="/product-item">PRODUCT ITEM</NavLink> */}
            </NavMenu>
        </Nav>
    );
};

export default Navbar;

const Logo = styled.img`
    padding: 0;
    margin: 0;
    height: 50px;
    width: 50px;
`;

export const Nav = styled.nav`
    background: #c5c3ff;
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    z-index: 10;
    width: 100%;
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    align-self: flex-start;
`;

const NavLink = styled(Link)`
    color: #444444;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 2px;

    &.active {
        color: #038db2;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
`;
