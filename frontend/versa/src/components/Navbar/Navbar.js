import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import Logo from "../../images/logo.svg";
<<<<<<< HEAD
import WishListIcon from "../../images/Heart.svg";
import Cart from "../../images/Cart.svg";
import Shop from "../../images/ShopSearch.svg";
import Events from "../../images/Events.svg";
import Home from "../../images/Home.svg";
=======
import { ShoppingCart, WishListIcon } from "../../images/icons";
>>>>>>> 7e5d6e2a170ed2438bb741c097e84fce2c5996bb

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img src={Logo} alt="logo" />
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
<<<<<<< HEAD
                        <img src={WishListIcon} alt="heart" />
=======
                        <WishListIcon />
                        {/* <img src={} alt='heart' /> */}
>>>>>>> 7e5d6e2a170ed2438bb741c097e84fce2c5996bb
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
