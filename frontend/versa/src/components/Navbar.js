import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import logo from "../../images/logo.svg";
import styled from "styled-components";
// import Icon from "../Reusable/Icons";

import Cookies from "universal-cookie";

import {
    EventsIcon,
    AccountIcon,
    WishListIcon,
    CartIcon,
    Magnifying,
    ShapesLogo,
    Dashboard,
    ShoppingBag,
    HomeIcon,
    GearSix,
    SignOut,
} from "../images/icons";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/actions";
import { getUser, getUserByToken } from "../axios/gets/index";
import { toPlainObject } from "lodash";
import theme from "./Redesign/Reusable/Theme";
const cookies = new Cookies();
const themeChoice = window.localStorage.getItem("theme") || "light";

const Navbar = () => {
    const dispatch = useDispatch();
    const loggedIn = cookies.get("token");
    const [nav, setNav] = useState("#F3F6FF");
    const [home, setHome] = useState("#1C1C1C");
    const [shop, setShop] = useState("#1C1C1C");
    const [events, setEvents] = useState("#1C1C1C");
    const [dashboard, setDashboard] = useState("#1C1C1C");
    const [account, setAccount] = useState("#1C1C1C");
    const [cart, setCart] = useState("#1C1C1C");
    const [rightModal, setRightModal] = useState("#F3F6FF");
    const [leftModal, setLeftModal] = useState("#F3F6FF");
    const [leftText, setLeftText] = useState("#F3F6FF");
    const [rightText, setRightText] = useState("#F3F6FF");
    const [stroke, setStroke] = useState("#F3F6FF");
    const [regular, setRegular] = useState("#1C1C1C");
    const [onHover, setOnHover] = useState("#6B45FF");
    const [username, setUsername] = useState("");
    const [modal, setModal] = useState(false);
    const [altColor, setAltColor] = useState(false);
    const [stroke2, setStroke2] = useState("#F3F6FF");
    useEffect(() => {
        dispatch(login);
    }, [loggedIn, dispatch]);

    useEffect(() => {
        const findUser = async () => {
            const response = await getUserByToken();
            try {
                setUsername(response.name.split(" ")[0]);
            } catch {
                setUsername("Account");
            }
        };
        findUser();
    }, []);
    useEffect(() => {
        function getScrollHeight() {
            if (window.scrollY > 100) {
                setNav("scrolled");

                setOnHover("scrolled");
            }
            if (window.scrollY < 100) {
                setNav("top");

                setOnHover("top");
            }
        }

        window.addEventListener("scroll", getScrollHeight);

        return function cleanup() {
            window.removeEventListener("scroll", getScrollHeight);
        };
    }, []);

    return (
        <>
            <Nav colors={nav}>
                <NavLink color={(props) => props.theme.lightBlue} to="/">
                    <Versa colors={nav} hover={onHover}>
                        Versa
                    </Versa>
                </NavLink>
                <NavMenu>
                    <NavLink
                        color={(props) => props.theme.lightBlue}
                        hover={onHover}
                        to="/">
                        <HomeIcon stroke={
                                nav === "scrolled"
                                    ? theme[themeChoice].lightBlue
                                    : theme[themeChoice].black
                            } />
                        <WordLink color={nav} hover={onHover}>
                            Home
                        </WordLink>
                    </NavLink>
                    <NavLink
                        color={(props) => props.theme.lightBlue}
                        hover={onHover}
                        to="/">
                        <ShoppingBag stroke={
                                nav === "scrolled"
                                    ? theme[themeChoice].lightBlue
                                    : theme[themeChoice].black
                            } />
                        <WordLink color={nav} hover={onHover}>
                            Shop
                        </WordLink>
                    </NavLink>
                    <NavLink
                        color={(props) => props.theme.lightBlue}
                        hover={onHover}
                        to="/events">
                        <EventsIcon stroke={
                                nav === "scrolled"
                                    ? theme[themeChoice].lightBlue
                                    : theme[themeChoice].black
                            } />
                        <WordLink color={nav} hover={onHover}>
                            Events
                        </WordLink>
                    </NavLink>
                    {loggedIn && (
                        <NavLink
                            color={(props) => props.theme.lightBlue}
                            to="/dashboard/artist"
                            hover={onHover}>
                            <Dashboard stroke={
                                nav === "scrolled"
                                    ? theme[themeChoice].lightBlue
                                    : theme[themeChoice].black
                            } />
                            <WordLink color={nav} hover={onHover}>
                                Dashboard
                            </WordLink>
                        </NavLink>
                    )}
                    <NavLink
                        to="/account"
                        onClick={() => {
                            setModal(!modal);
                        }}
                        onMouseEnter={() => {
                            setModal(true);
                        }}
                       >
                        <AccountIcon
                            stroke={
                                nav === "scrolled"
                                    ? theme[themeChoice].lightBlue
                                    : theme[themeChoice].black
                            }
                        />
                        <WordLink color={nav} hover={onHover}>
                            {username}
                        </WordLink>
                    </NavLink>
                    <NavLink
                        color={(props) => props.theme.lightBlue}
                        to="/shopping-cart"
                        hover={onHover}>
                        <CartIcon stroke={
                                nav === "scrolled"
                                    ? theme[themeChoice].lightBlue
                                    : theme[themeChoice].black
                            } />
                    </NavLink>
                </NavMenu>
            </Nav>
            {modal ? (
                <AccountMenu
                    colors={nav}
                    onMouseLeave={() => {
                        setModal(false);
                    }}>
                    <SubMenu>
                        <SubContainer
                            to="/settings"
                            hoverText={onHover}
                            modal={gradient}
                            onMouseEnter={() => {
                                setStroke("#6B45FF");
                            }}
                            onMouseLeave={() => {
                                setStroke("#F3F6FF");
                            }}>
                            <SubIcon
                                className="leftModal"
                                background={nav}
                                to="/edit">
                                <GearSix
                                    className="strokeColor"
                                    strokeColor={stroke}
                                    stroke={
                                nav === "scrolled"
                                    ? theme[themeChoice].black
                                    : theme[themeChoice].lightBlue
                            }
                                    alt="setting"
                                />
                            </SubIcon>
                            <SubText
                                colors={nav}
                                className="testing">
                                settings
                            </SubText>
                        </SubContainer>
                        <SubContainer
                            to="/log-out"
                            hoverText={onHover}
                            modal={gradient}
                            onMouseEnter={() => {
                                setStroke2("#6B45FF");
                            }}
                            onMouseLeave={() => {
                                setStroke2("#F3F6FF");
                            }}>
                            <SubIcon
                                className="rightModal"
                                background={nav}
                                to="/logout">
                                <SignOut
                                    className="strokeColor"
                                    strokeColor={stroke2}
                                    stroke={
                                nav === "scrolled"
                                    ? theme[themeChoice].black
                                    : theme[themeChoice].lightBlue
                            }
                                    alt="sign-out"
                                />
                            </SubIcon>
                            <SubText
                                className="testing"
                                colors={nav}>
                                logout
                            </SubText>
                        </SubContainer>
                    </SubMenu>
                </AccountMenu>
            ) : (
                ""
            )}
        </>
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
    background: ${(props) =>
        props.colors === "top" ? "none" : props.theme.black};
    display: flex;
    justify-content: space-between;
    padding: 10px 40px;
    z-index: 10;
    transition: all 0.3s ease;
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    align-self: flex-start;
    overflow: hidden;
    @media (max-width: 600px) {
        padding: 5px;
    }
    transition: background 0.5s ease-out;
`;

const NavLink = styled(Link)`
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    padding: 0 10px;
    text-transform: uppercase;
    svg {
        width: 18px;
        height: 18px;
    }
    &:hover::after {
        content: "";
        position: absolute;
        top: 32px;
        position: absolute;
        left: 12%;
        width: 80%;
        height: 4px;
        border-radius: 50px;
        background: ${(props) => props.theme.holo};
        animation: expand 0.4s forwards;
    }
    @keyframes expand {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 100;
        }
    }

    @media (max-width: 600px) {
        padding: 5px;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
`;

const WordLink = styled.h2`
    display: visible;
    text-transform: uppercase;

    letter-spacing: 0.08em;
    margin: 0 0 0 8px;
    font-size: 18px;
    color: ${(props) =>
        props.color === "top" ? props.theme.black : props.theme.lightBlue};
    &:hover {
        color: ${(props) =>
            props.hover === "top" ? props.theme.green : props.theme.green};
    }

    @media (max-width: 600px) {
        display: none;
    }
`;

const Versa = styled.h1`
    text-transform: uppercase;
    color: ${(props) =>
        props.colors === "top" ? props.theme.black : props.theme.lightBlue};
    font-weight: 700;
    letter-spacing: 0.08em;
    margin: 2px 0 0 8px;
    font-size: 24px;
    &:hover {
        color: ${(props) =>
            props.hover === "top" ? props.theme.purple : props.theme.green};
    }
`;

const AccountMenu = styled.div`
    position: fixed;
    z-index: 10;

    background: ${(props) =>
        props.colors === "top" ? "none" : props.theme.black};
    right: 0;
    border-radius: 0 0 15px 15px;
    padding: 10px;
`;
const SubMenu = styled.div`
    display: flex;
    justify-content: space-between;
`;
const SubContainer = styled(Link)`
    width: 91px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
        .testing {
            color: ${(props) => props.hoverText};
        }
        .rightModal {
            background: ${(props) => props.modal};
        }
        .leftModal {
            background: ${(props) => props.modal};
        }
        .strokeColor {
            stroke: ${(props) => props.strokeColor};
        }
    }
`;
const SubIcon = styled.div`
    background: ${(props) => props.background === 'top' ? props.theme.black : props.theme.lightBlue};
    border-radius: 8px;
    padding: 10px 10px 4px 10px;
`;

const SubText = styled.p`
    margin-top: 8px;
    font-size: 14px;
    color: ${(props) => props.colors === 'top' ? props.theme.black : props.theme.lightBlue};
    padding: 10px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
`;

const gradient = `linear-gradient(
    123.35deg,
    #ebf3d0 0%,
    rgba(235, 243, 208, 0) 18.4%
),
radial-gradient(
    29.9% 70.94% at 44.25% 86.96%,
    #dc8ddc 0%,
    rgba(220, 141, 220, 0) 100%
),
radial-gradient(
    63.18% 75.75% at 35.87% 100%,
    #dc8ddc 0%,
    rgba(220, 141, 220, 0) 100%
),
radial-gradient(
    42.66% 49.72% at 45.56% 44.65%,
    #cbadeb 0%,
    rgba(194, 166, 241, 0) 100%
),
radial-gradient(
    44.37% 103.98% at 75.16% 33.54%,
    #fffdb1 0%,
    #fee4bf 46.6%,
    #f0bdd0 69.5%,
    rgba(255, 129, 38, 0) 100%
),
linear-gradient(
    86.83deg,
    #cdf9e8 26.09%,
    rgba(205, 249, 232, 0) 42.6%
),
linear-gradient(
    216.44deg,
    rgba(192, 169, 240, 0) -16.52%,
    #c0a9f0 -1.04%,
    rgba(192, 169, 240, 0) 16.99%
),
linear-gradient(
    128.53deg,
    rgba(192, 169, 240, 0) 28.63%,
    #c0a9f0 38.5%,
    rgba(192, 169, 240, 0) 50.26%
),
#c2a6f1`;
