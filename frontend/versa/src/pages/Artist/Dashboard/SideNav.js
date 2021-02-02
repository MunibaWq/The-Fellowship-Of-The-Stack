import React from "react";
import styled from "styled-components";
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
import Button from "../../../components/Reusable/Button.js";
import theme from "../../../components/Reusable/Colors";
import Pill from "../../../components/Reusable/Pill";

const SideNav = () => {
    return (
        <NavBar>
            <Toggle>
                <HamburgerIcon stroke={theme.secondary} />
            </Toggle>
            <TitleToggle>
                <Title>Dashboard</Title>
                <LineCloseIcon stroke={theme.primary} />
            </TitleToggle>
            <UserInfo>
                <Name>Fudge Doe</Name>
                <UserType>Artist</UserType>
            </UserInfo>
            <ToolBar>
                <Menu>
                    <MenuLink>
                        <Notification stroke={theme.primary} />
                    </MenuLink>
                    <MenuLink>
                        <Message stroke={theme.primary} />
                    </MenuLink>
                    <MenuLink>
                        <Setting stroke={theme.primary} />
                    </MenuLink>
                </Menu>
            </ToolBar>
            <Menu>
                <MenuLink>
                    <ShopHome />
                    Dashboard
                    <RightIcon stroke={theme.primary} />
                </MenuLink>
                <MenuLink>
                    <Orders />
                    <Pill>
                        <p>3</p>
                    </Pill>
                    Orders
                    <RightIcon stroke={theme.primary} />
                </MenuLink>
                <MenuLink>
                    <Products />
                    Products
                    <DownIcon stroke={theme.primary} />
                </MenuLink>
                <SubMenu>
                    <SubMenuLink>
                        Inventory
                        <RightIcon stroke={theme.primary} />
                    </SubMenuLink>
                    <SubMenuLink>
                        Categories
                        <RightIcon stroke={theme.primary} />
                    </SubMenuLink>
                </SubMenu>

                <MenuLink>
                    <Dashboard />
                    Analytics
                    <DownIcon stroke={theme.primary} />
                </MenuLink>
                <SubMenu>
                    <SubMenuLink>
                        Total Sales
                        <RightIcon stroke={theme.primary} />
                    </SubMenuLink>
                    <SubMenuLink>
                        Total Orders
                        <RightIcon stroke={theme.primary} />
                    </SubMenuLink>
                    <SubMenuLink>
                        Average Order Value
                        <RightIcon stroke={theme.primary} />
                    </SubMenuLink>
                    <SubMenuLink>
                        Sales by Product
                        <RightIcon stroke={theme.primary} />
                    </SubMenuLink>
                </SubMenu>
                <MenuLink>
                    <EventsIcon />
                    Events
                    <RightIcon stroke={theme.primary} />
                </MenuLink>
            </Menu>
        </NavBar>
    );
};

export default SideNav;

const NavBar = styled.div`
    margin: 20px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
`;
const Toggle = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background-color: ${theme.primary};
    padding: 10px;
    width: 50px;
`;
const TitleToggle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
const Title = styled.h1`
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 10px 0;
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
const MenuLink = styled.li`
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
    :hover {
        background-color: #d0dfff;
    }
`;
const SubMenu = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
`;
const SubMenuLink = styled.li`
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
    :hover {
        background-color: #d0dfff;
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

const HoverIcon = styled.svg`
    stroke: ${theme.secondary};
    fill: ${theme.secondary};
    width: 26px;
    height: 26px;
    :hover {
        stroke: ${theme.primary};
        fill: ${theme.primary};
    }
`;
