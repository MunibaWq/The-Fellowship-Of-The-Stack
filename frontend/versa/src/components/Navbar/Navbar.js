import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import logo from "../../images/logo.svg";
import { ShoppingCart, WishListIcon } from "../../images/icons";
import styled from "styled-components";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <Logo src={logo} alt="logo" />
                </NavLink>

                <NavMenu>
                    <NavLink to="/shop">SHOP</NavLink>
                    <NavLink to="/events">EVENTS</NavLink>
                    <NavLink to="/account">ACCOUNT</NavLink>
                    <NavLink to="/wishlist">
                        <WishListIcon />
                    </NavLink>
                    <NavLink to="/shopping-cart">
                        <ShoppingCart />
                    </NavLink>
                    {/* <NavLink to="/product-item">PRODUCT ITEM</NavLink> */}
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;

const Logo = styled.img`
    padding: 0;
    margin: 0;
    height: 100px;
    width: 100px;
`;
