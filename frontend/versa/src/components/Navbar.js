import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import logo from "../../images/logo.svg";
import styled from "styled-components";
// import Icon from "../Reusable/Icons";
import theme from "./Reusable/Colors";
import Cookies from "universal-cookie";
import SignOut from "../images/SignOut.svg";
import GearSix from "../images/GearSix.svg";
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
} from "../images/icons";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/actions";
import { getUser, getUserByToken } from "../axios/gets/index";
const cookies = new Cookies();
const Navbar = () => {
    const dispatch = useDispatch();
    const loggedIn = cookies.get("token");
    const [nav, setNav] = useState("#FBFCFF");
    const [home, setHome] = useState("#1C1C1C");
    const [shop, setShop] = useState("#1C1C1C");
    const [events, setEvents] = useState("#1C1C1C");
    const [dashboard, setDashboard] = useState("#1C1C1C");
    const [account, setAccount] = useState("#1C1C1C");
    const [rightModal, setRightModal] = useState("#FBFCFF");
    const [leftModal, setLeftModal] = useState("#FBFCFF");
    const [leftText, setLeftText] = useState("#FBFCFF");
    const [rightText, setRightText] = useState("#FBFCFF");
    const [regular, setRegular] = useState("#1C1C1C");
    const [onHover, setOnHover] = useState("#E0B8FF");
    const [username, setUsername] = useState("");
    const [modal, setModal] = useState(false);
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
                setNav("#1C1C1C");
                setHome("#FBFCFF");
                setShop("#FBFCFF");
                setAccount("#FBFCFF");
                setDashboard("#FBFCFF");
                setEvents("#FBFCFF");
                setRegular("#FBFCFF");
                setOnHover("#B4FFC6");
            }
            if (window.scrollY < 100) {
                setNav("#FBFCFF");
                setHome("#1C1C1C");
                setShop("#1C1C1C");
                setAccount("#1C1C1C");
                setDashboard("#1C1C1C");
                setEvents("#1C1C1C");
                setRegular("#1C1C1C");
                setOnHover("#6B45FF");
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
                <NavLink color={theme.secondary} to="/">
                    <Versa colors={regular} hover={onHover}>
                        Versa
                    </Versa>
                </NavLink>
                <NavMenu>
                    <NavLink
                        color={theme.secondary}
                        to="/"
                        onMouseEnter={() => {
                            setHome(onHover);
                        }}
                        onMouseLeave={() => {
                            setHome(regular);
                        }}>
                        <HomeIcon stroke={home} />
                        <WordLink color={home} hover={onHover}>
                            Home
                        </WordLink>
                    </NavLink>
                    <NavLink
                        color={theme.secondary}
                        to="/"
                        onMouseEnter={() => {
                            setShop(onHover);
                        }}
                        onMouseLeave={() => {
                            setShop(regular);
                        }}>
                        <ShoppingBag stroke={shop} />
                        <WordLink color={shop} hover={onHover}>
                            Shop
                        </WordLink>
                    </NavLink>
                    <NavLink
                        color={theme.secondary}
                        to="/events"
                        onMouseEnter={() => {
                            setEvents(onHover);
                        }}
                        onMouseLeave={() => {
                            setEvents(regular);
                        }}>
                        <EventsIcon stroke={events} />
                        <WordLink color={events} hover={onHover}>
                            Events
                        </WordLink>
                    </NavLink>
                    {loggedIn && (
                        <NavLink
                            color={theme.secondary}
                            to="/dashboard"
                            onMouseEnter={() => {
                                setDashboard(onHover);
                            }}
                            onMouseLeave={() => {
                                setDashboard(regular);
                            }}>
                            <Dashboard stroke={dashboard} />
                            <WordLink color={dashboard} hover={onHover}>
                                Dashboard
                            </WordLink>
                        </NavLink>
                    )}
                    <NavLink
                        color={theme.secondary}
                        to="/account"
                        onMouseEnter={() => {
                            setAccount(onHover);
                            setModal(true);
                        }}
                        onMouseLeave={() => {
                            setAccount(regular);
                        }}>
                        <AccountIcon stroke={account} />
                        <WordLink color={account} hover={onHover}>
                            {username}
                        </WordLink>
                    </NavLink>
                    <NavLink
                        color={theme.secondary}
                        to="/shopping-cart"
                        onMouseEnter={() => {
                            setHome(onHover);
                        }}
                        onMouseLeave={() => {
                            setHome(regular);
                        }}>
                        <CartIcon stroke={home} />
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
                            onMouseEnter={() => {
                                setLeftModal(gradient);
                                setLeftText("#E0B8FF");
                            }}
                            onMouseLeave={() => {
                                setLeftModal("#FBFCFF");
                                setLeftText("#FBFCFF");
                            }}>
                            <SubIcon background={leftModal} to="/edit">
                                <img src={SignOut} alt="sign-out" />
                            </SubIcon>
                            <SubText colors={leftText}>settings</SubText>
                        </SubContainer>
                        <SubContainer
                            to="/log-out"
                            onMouseEnter={() => {
                                setRightModal(gradient);
                                setRightText("#E0B8FF");
                            }}
                            onMouseLeave={() => {
                                setRightModal("#FBFCFF");
                                setRightText("#FBFCFF");
                            }}>
                            <SubIcon background={rightModal} to="/logout">
                                <img src={GearSix} alt="setting" />
                            </SubIcon>
                            <SubText colors={rightText}>logout</SubText>
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
        props.colors === "#FBFCFF" ? "none" : props.colors};
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
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
    color: ${(props) => props.color || "#444"};
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
    color: ${(props) => props.color};
    &:hover {
        ${(props) => props.hover};
    }

    @media (max-width: 600px) {
        display: none;
    }
`;

const Versa = styled.h1`
    text-transform: uppercase;
    color: ${(props) => props.colors};
    font-weight: 700;
    letter-spacing: 0.08em;
    margin: 2px 0 0 8px;
    font-size: 24px;
    &:hover {
        color: ${(props) => props.hover};
    }
`;

const AccountMenu = styled.div`
    position: fixed;
    z-index: 10;
    // width: 234px;
    // height: 125px;
    background: ${(props) =>
        props.colors === "#FBFCFF" ? "none" : props.colors};
    right: 0;
    border-radius: 0 0 15px 15px;
    padding: 10px;
`;
const SubMenu = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const SubContainer = styled(Link)`
    height: 100%;
    width: 91px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`;
const SubIcon = styled.div`
    background: ${(props) => props.background};
    border-radius: 8px;
    padding: 5px 10px;
    img {
        width: 18px;
        height: 18px;
    }
`;
const SubText = styled.p`
    margin-top: 8px;
    font-size: 14px;
    color: ${(props) => props.colors};
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
