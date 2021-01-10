import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import Logo from "../../images/logo.svg";
import WishListIcon from "../../images/Heart.svg";
import Cart from "../../images/Cart.svg";
import Shop from "../../images/ShopSearch.svg";
import Events from "../../images/Events.svg";
import Home from "../../images/Home.svg";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img src={Logo} alt="logo" />
                    {/* <h1>Logo</h1> */}
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
                        <img src={WishListIcon} alt="heart" />
                    </NavLink>
                    <NavLink to="/shopping-cart" activeStyle>
                        ShoppingCart
                        {/* <img src={} alt='cart' /> */}
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
