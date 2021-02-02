import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    LineCloseIcon,
    Notification,
    Message,
    Setting,
    Dashboard,
    Orders,
    Products,
    EventsIcon,
    ShopHome,
    DownIcon,
    RightIcon,
    HamburgerIcon,
} from "../../../images/icons";
import theme from "../../../components/Reusable/Colors";
import Pill from "../../../components/Reusable/Pill";

const SideNav = () => {
    const [visiblePSub, setVisiblePSub] = useState(false);
    const [visibleASub, setVisibleASub] = useState(false);
    const [expanded, setExpanded] = useState(true);

    return (
        <Container>
            {!expanded && (
                <Toggle onClick={() => setExpanded(!expanded)}>
                    <HamburgerIcon stroke={theme.secondary} />
                </Toggle>
            )}
            {expanded && (
                <NavBar>
                    <Header>
                        <UserInfo>
                            <Name>Fudge Doe</Name>
                            <UserType>Artist</UserType>
                        </UserInfo>
                        <Close onClick={() => setExpanded(!expanded)}>
                            {/**<LineCloseIcon
                                stroke={theme.primary}
                                width="40"
                                height="40"
                            />**/}
                        </Close>
                    </Header>

                    <ToolBar>
                        <Menu>
                            <Link to="/dashboard/notifications">
                                <li>
                                    <MenuLink>
                                        <NotiCount>
                                            <p>9</p>
                                        </NotiCount>
                                        <Notification stroke={theme.primary} />
                                    </MenuLink>
                                </li>
                            </Link>
                            <Link to="/dashboard/messages">
                                <li>
                                    <MenuLink>
                                        <NotiCount>
                                            <p>3</p>
                                        </NotiCount>
                                        <Message stroke={theme.primary} />
                                    </MenuLink>
                                </li>
                            </Link>
                            <Link to="/dashboard/Settings">
                                <li>
                                    <MenuLink>
                                        <Setting stroke={theme.primary} />
                                    </MenuLink>
                                </li>
                            </Link>
                        </Menu>
                    </ToolBar>
                    <Menu>
                        <Link to="/dashboard">
                            <li>
                                <MenuLink>
                                    <ShopHome />
                                    <h3>Dashboard</h3>
                                    <RightIcon stroke={theme.primary} />
                                </MenuLink>
                            </li>
                        </Link>
                        <Link to="/dashboard/orders">
                            <li>
                                <MenuLink>
                                    <Orders />
                                    <NotiCount>
                                        <p>3</p>
                                    </NotiCount>
                                    <h3>Orders</h3>

                                    <RightIcon stroke={theme.primary} />
                                </MenuLink>
                            </li>
                        </Link>
                        <li>
                            <MenuLink
                                onClick={() => setVisiblePSub(!visiblePSub)}
                            >
                                <Products />
                                <h3>Products</h3>
                                <DownIcon stroke={theme.primary} />
                            </MenuLink>
                        </li>
                        {visiblePSub && (
                            <SubMenu>
                                <Link to="/dashboard/inventory">
                                    <li>
                                        <SubMenuLink>
                                            <h4>Inventory</h4>
                                            <RightIcon stroke={theme.primary} />
                                        </SubMenuLink>
                                    </li>
                                </Link>
                                <Link to="/dashboard/categories">
                                    <li>
                                        <SubMenuLink>
                                            <h4>Categories</h4>
                                            <RightIcon stroke={theme.primary} />
                                        </SubMenuLink>
                                    </li>
                                </Link>
                            </SubMenu>
                        )}

                        <li>
                            <MenuLink
                                onClick={() => setVisibleASub(!visibleASub)}
                            >
                                <Dashboard />
                                <h3>Analytics</h3>
                                <DownIcon stroke={theme.primary} />
                            </MenuLink>
                        </li>

                        {visibleASub && (
                            <SubMenu>
                                <Link to="/dashboard/total-sales">
                                    <li>
                                        <SubMenuLink>
                                            <h4>Total Sales</h4>
                                            <RightIcon stroke={theme.primary} />
                                        </SubMenuLink>
                                    </li>
                                </Link>
                                <Link to="/dashboard/total-orders">
                                    <li>
                                        <SubMenuLink>
                                            <h4>Total Orders</h4>
                                            <RightIcon stroke={theme.primary} />
                                        </SubMenuLink>
                                    </li>
                                </Link>
                                <Link to="/dashboard/avg-order-value">
                                    <li>
                                        <SubMenuLink>
                                            <h4>Average Order Value</h4>
                                            <RightIcon stroke={theme.primary} />
                                        </SubMenuLink>
                                    </li>
                                </Link>
                                <Link to="/dashboard/sales-by-product">
                                    <li>
                                        <SubMenuLink>
                                            <h4>Sales by Product</h4>
                                            <RightIcon stroke={theme.primary} />
                                        </SubMenuLink>
                                    </li>
                                </Link>
                            </SubMenu>
                        )}
                        <Link to="/dashboard/events">
                            <li>
                                <MenuLink>
                                    <NotiCount>
                                        <p>3</p>
                                    </NotiCount>
                                    <EventsIcon />
                                    <h3>Events</h3>
                                    <RightIcon stroke={theme.primary} />
                                </MenuLink>
                            </li>
                        </Link>
                    </Menu>
                </NavBar>
            )}
        </Container>
    );
};

export default SideNav;

const NotiCount = styled(Pill)`
    position: absolute;
    transform: translate(20px, -10px);
`;

const Container = styled.div`
    margin: 20px;
    background: none;
    max-width: 300px;
    height: calc(100vh - 60px);
    @media (max-width: 700px) {
        max-width: 100px;
    }
`;

const Toggle = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background-color: ${theme.primary};
    padding: 10px 10px 6px 10px;
    width: 46px;
    border-radius: 15px;
    cursor: pointer;
    position: absolute;
    margin: 10px;
`;

const NavBar = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    left: -300px;
    background: white;
    position: sticky;
    @media (max-width: 700px) {
        width: 100px;
    }
`;

const Close = styled.div`
    :hover {
        transform: scale(1.05);
    }
    cursor: pointer;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
`;
const UserInfo = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
`;

const Name = styled.h2`
    margin: 0 0 8px 0;
`;
const UserType = styled.p`
    margin: 0 0 10px 0;
`;
const Menu = styled.ul`
    list-style: none;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
`;
const MenuLink = styled.button`
    border: none;
    background-color: white;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    border-radius: 15px;
    :hover,
    :focus,
    :active {
        background-color: #d0dfff;
        outline: none;
        h3 {
            font-weight: 700;
        }
    }

    h3 {
        font-size: 1em;
    }
    @media (max-width: 700px) {
        h3 {
            display: none;
        }
        img {
            display: none;
        }
    }
`;
const SubMenu = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
`;
const SubMenuLink = styled.button`
    border: none;
    background-color: white;
    width: 100%;
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 10px;
    :hover,
    :focus,
    :active {
        background-color: #d0dfff;

        outline: none;
        h4 {
            font-weight: bold;
        }
    }
    h4 {
        font-size: 0.8em;
    }
`;
const ToolBar = styled.div`
    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
`;
