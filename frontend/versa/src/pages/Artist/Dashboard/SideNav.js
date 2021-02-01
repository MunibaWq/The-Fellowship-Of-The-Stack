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
    ShopHome
} from "../../../images/icons";
import theme from "../../../components/Reusable/Colors";
import Pill from "../../../components/Reusable/Pill";

const SideNav = () => {
    return (
        <NavBar>
            <Toggle>OnOFF</Toggle>
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
                <MenuLink><ShopHome />Dashboard</MenuLink>
				<MenuLink>
                <Orders />
                <Pill>
                        <p>3</p>
                </Pill>
                    Orders
                </MenuLink>
                <MenuLink><Products />Products</MenuLink>
                <SubMenu>
                    <SubMenuLink>Inventory</SubMenuLink>
                </SubMenu>

                <MenuLink><Dashboard />Analytics</MenuLink>
                <SubMenu>
                    <SubMenuLink>Total Sales</SubMenuLink>
                    <SubMenuLink>Total Orders</SubMenuLink>
                    <SubMenuLink>Order Value</SubMenuLink>
                    <SubMenuLink>Sales by Product</SubMenuLink>
                </SubMenu>
                <MenuLink><EventsIcon />Events
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
    margin: 10px;
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
        const SubMenu = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
`;
const SubMenuLink = styled.li`
    
    padding: 5px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    :hover{
        background-color: #EFF3FE;
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
