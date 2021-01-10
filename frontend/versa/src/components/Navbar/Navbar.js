import React from "react";
import { Nav, NavLink, NavMenu, LogoContainer } from "./NavbarElements";
import Logo from "../../images/logo.svg";
import { ShoppingCart, WishListIcon } from "../../images/icons";

const Navbar = () => {
    return (
        <>
            <Nav>
                <LogoContainer>
                    <NavLink to="/">
                        <img src={Logo} alt="logo" />
                    </NavLink>
                </LogoContainer>

                <NavMenu>
                    <NavLink to="/shop" activeStyle>
                        SHOP
                    </NavLink>
                    <NavLink to="/events" activeStyle>
                        EVENTS
                    </NavLink>
                    <NavLink to="/account" activeStyle>
                        ACCOUNT
                    </NavLink>
                    <NavLink to="/wishlist" activeStyle>
                        <WishListIcon />
                        {/* <img src={} alt='heart' /> */}
                    </NavLink>
                    <NavLink to="/shopping-cart" activeStyle>
                        <ShoppingCart />
                        {/* <img src={} alt='cart' /> */}
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
