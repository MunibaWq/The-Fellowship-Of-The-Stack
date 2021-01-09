import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    {/* <img src={} alt='logo' /> */}
                    <h1>Logo</h1>
                </NavLink>

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
                        Wishlist - icon
                        {/* <img src={} alt='heart' /> */}
                    </NavLink>
                    <NavLink to="/shopping-cart" activeStyle>
                        Shopping Cart - icon
                        {/* <img src={} alt='cart' /> */}
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;