import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DashNav from "./DashNav";
import {
    LineCloseIcon,
    Dashboard,
    Orders,
    Products,
    EventsIcon,
    ShopHome,
    DownIcon,
    RightIcon,
    HamburgerIcon,
    PaintBrushIcon,
    HomeIcon,
    CarIcon,
    AccountIcon,
    InventoryIcon,
    MessageIcon,
    DriverReceived,
    CaretDoubleLeft,
} from "../../../images/icons";
import theme from "../../../components/Reusable/Colors";
// import Pill from "../../../components/Reusable/Pill";
import Cookies from "universal-cookie";
// import Inventory from "./Inventory";
const cookies = new Cookies();
const isDriver = cookies.get("isDriver") === "true";
const isArtist = cookies.get("isArtist") === "true";
const userTypes = [];
if (isArtist) {
    userTypes.push("Artist");
}
if (isDriver) {
    userTypes.push("Driver");
}
const SideNav = ({ navWidth, setNavWidth }) => {
    const [visiblePSub, setVisiblePSub] = useState(false);
    const [visibleASub, setVisibleASub] = useState(false);
    const [visibleSDSub, setVisibleSDSub] = useState(false);
    const [visibleADSub, setVisibleADSub] = useState(false);
    const [visibleDDSub, setVisibleDDSub] = useState(false);
    const [expanded, setExpanded] = useState(false);

    return (
        <Container navWidth={navWidth}>
            {!expanded && (
                <Toggle
                    onClick={() => {
                        setNavWidth(300);
                        setExpanded(true);
                    }}>
                    <CaretBorder>
                        <CaretDoubleLeft stroke={theme.secondary} />
                    </CaretBorder>
                    <h4>MENU</h4>
                </Toggle>
            )}
            {expanded && (
                <NavBar>
                    <Header>
                        <UserInfo>
                            <h4>DASHBOARD MENU</h4>
                        </UserInfo>
                        <Close
                            onClick={() => {
                                setNavWidth(0);
                                setExpanded(false);
                            }}>
                            <CaretBorder>
                                <CaretDoubleLeft stroke={theme.secondary} />
                            </CaretBorder>
                        </Close>
                    </Header>
                    <BodyContainer>
                        {/* icon row */}
                        <IconRow>
                            <IconDiv>
                                <PaintBrushIcon />
                                <h4>ARTIST</h4>
                            </IconDiv>
                            <IconDiv>
                                <Products />
                                <h4>SHOPPER</h4>
                            </IconDiv>
                            <IconDiv>
                                <CarIcon />
                                <h4>DRIVER</h4>
                            </IconDiv>
                        </IconRow>
                        {/* message row */}
                        <MessageRow>
                            <MessageDiv>
                                <MessageIcon />
                                <h4>MESSAGES</h4>
                            </MessageDiv>
                        </MessageRow>
                        {/* map rows here */}
                        <DashNav type={"artist"} />
                    </BodyContainer>

                    <Menu>
                        <Link to="/dashboard">
                            <li>
                                <MenuLink>
                                    <HomeIcon />
                                    <h4>Home</h4>
                                    <RightIcon stroke={theme.primary} />
                                </MenuLink>
                            </li>
                        </Link>
                        <Link to="/dashboard/messages">
                            <li>
                                <MenuLink>
                                    <MessageIcon />
                                    <h4>Messages</h4>
                                    <RightIcon stroke={theme.primary} />
                                </MenuLink>
                            </li>
                        </Link>
                        {isArtist && (
                            <>
                                <li>
                                    <MenuLink
                                        onClick={() =>
                                            setVisibleADSub((curr) => !curr)
                                        }>
                                        <PaintBrushIcon
                                            stroke={theme.tertiary}
                                        />
                                        <h4>Artist Dashboard</h4>
                                        <DownIcon stroke={theme.primary} />
                                    </MenuLink>
                                </li>
                                {visibleADSub && (
                                    <SubMenu>
                                        <Link to="/dashboard/artist">
                                            <li>
                                                <MenuLink>
                                                    <ShopHome />
                                                    <h3>Overview</h3>
                                                    <RightIcon
                                                        stroke={theme.primary}
                                                    />
                                                </MenuLink>
                                            </li>
                                        </Link>
                                        <Link to="/dashboard/artist/recent-orders/">
                                            <li>
                                                <MenuLink>
                                                    <Orders />
                                                    {/*<NotiCount>
                                                        <p>3</p>
                                                    </NotiCount>*/}
                                                    <h3>Orders</h3>

                                                    <RightIcon
                                                        stroke={theme.primary}
                                                    />
                                                </MenuLink>
                                            </li>
                                        </Link>
                                        <Link to="/dashboard/artist/inventory">
                                            <li>
                                                <MenuLink>
                                                    <InventoryIcon />
                                                    <h3>Inventory</h3>
                                                    <RightIcon
                                                        stroke={theme.primary}
                                                    />
                                                </MenuLink>
                                            </li>
                                        </Link>
                                        <li>
                                            <MenuLink
                                                onClick={() =>
                                                    setVisibleASub(!visibleASub)
                                                }>
                                                <Dashboard />
                                                <h3>Analytics</h3>
                                                <DownIcon
                                                    stroke={theme.primary}
                                                />
                                            </MenuLink>
                                        </li>

                                        {visibleASub && (
                                            <SubMenu>
                                                <Link to="/dashboard/artist/total-sales/">
                                                    <li>
                                                        <SubMenuLink>
                                                            <h4>Total Sales</h4>
                                                            <RightIcon
                                                                stroke={
                                                                    theme.primary
                                                                }
                                                            />
                                                        </SubMenuLink>
                                                    </li>
                                                </Link>
                                                <Link to="/dashboard/artist/total-orders/">
                                                    <li>
                                                        <SubMenuLink>
                                                            <h4>
                                                                Total Orders
                                                            </h4>
                                                            <RightIcon
                                                                stroke={
                                                                    theme.primary
                                                                }
                                                            />
                                                        </SubMenuLink>
                                                    </li>
                                                </Link>
                                                <Link to="/dashboard/artist/average-order-value/">
                                                    <li>
                                                        <SubMenuLink>
                                                            <h4>
                                                                Average Order
                                                                Value
                                                            </h4>
                                                            <RightIcon
                                                                stroke={
                                                                    theme.primary
                                                                }
                                                            />
                                                        </SubMenuLink>
                                                    </li>
                                                </Link>
                                                <Link to="/dashboard/artist/sales-by-products/">
                                                    <li>
                                                        <SubMenuLink>
                                                            <h4>
                                                                Sales by Product
                                                            </h4>
                                                            <RightIcon
                                                                stroke={
                                                                    theme.primary
                                                                }
                                                            />
                                                        </SubMenuLink>
                                                    </li>
                                                </Link>
                                            </SubMenu>
                                        )}
                                        <Link to="/dashboard/artist/manage-events">
                                            <li>
                                                <MenuLink>
                                                    {/*<NotiCount>
                                                        <p>3</p>
                                                    </NotiCount>*/}
                                                    <EventsIcon />
                                                    <h3>Events</h3>
                                                    <RightIcon
                                                        stroke={theme.primary}
                                                    />
                                                </MenuLink>
                                            </li>
                                        </Link>
                                    </SubMenu>
                                )}
                            </>
                        )}
                        <li>
                            <MenuLink
                                onClick={() =>
                                    setVisibleSDSub((curr) => !curr)
                                }>
                                <Products />
                                <h4>Shopper Dashboard</h4>
                                <DownIcon stroke={theme.primary} />
                            </MenuLink>
                        </li>
                        {visibleSDSub && (
                            <SubMenu>
                                <Link to="/dashboard/shopper/order-tracking/">
                                    <li>
                                        <MenuLink>
                                            <Orders />
                                            {/*<NotiCount>
                                                <p>3</p>
                                            </NotiCount>*/}
                                            <h3>Orders</h3>

                                            <RightIcon stroke={theme.primary} />
                                        </MenuLink>
                                    </li>
                                </Link>
                                <Link to="/dashboard/shopper/">
                                    <li>
                                        <MenuLink>
                                            <HomeIcon />
                                            {/*<NotiCount>
                                                <p>3</p>
                                            </NotiCount>*/}
                                            <h3>Overview</h3>

                                            <RightIcon stroke={theme.primary} />
                                        </MenuLink>
                                    </li>
                                </Link>

                                <Link to="/dashboard/shopper/events-attending">
                                    <li>
                                        <MenuLink>
                                            {/*<NotiCount>
                                                <p>3</p>
                                            </NotiCount>*/}
                                            <EventsIcon />
                                            <h3>Events</h3>
                                            <RightIcon stroke={theme.primary} />
                                        </MenuLink>
                                    </li>
                                </Link>
                            </SubMenu>
                        )}
                        {isDriver && (
                            <>
                                <li>
                                    <MenuLink
                                        onClick={() =>
                                            setVisibleDDSub((curr) => !curr)
                                        }>
                                        <CarIcon stroke={theme.tertiary} />
                                        <h4>Driver Dashboard</h4>
                                        <DownIcon stroke={theme.primary} />
                                    </MenuLink>
                                </li>
                                {visibleDDSub && (
                                    <SubMenu>
                                        <Link to="/dashboard/driver">
                                            <li>
                                                <MenuLink>
                                                    <AccountIcon />

                                                    <h3>Overview</h3>
                                                    <RightIcon
                                                        stroke={theme.primary}
                                                    />
                                                </MenuLink>
                                            </li>
                                        </Link>

                                        <li>
                                            <MenuLink
                                                onClick={() =>
                                                    setVisiblePSub(!visiblePSub)
                                                }>
                                                <Products />
                                                <h3>Orders</h3>
                                                <DownIcon
                                                    stroke={theme.primary}
                                                />
                                            </MenuLink>
                                        </li>
                                        {visiblePSub && (
                                            <SubMenu>
                                                <Link to="/dashboard/driver/orders">
                                                    <li>
                                                        <SubMenuLink>
                                                            <h4>
                                                                Orders to
                                                                fulfill
                                                            </h4>
                                                            <RightIcon
                                                                stroke={
                                                                    theme.primary
                                                                }
                                                            />
                                                        </SubMenuLink>
                                                    </li>
                                                </Link>
                                                <Link to="/dashboard/driver/delivery-history">
                                                    <li>
                                                        <SubMenuLink>
                                                            <h4>
                                                                Delivery History
                                                            </h4>
                                                            <RightIcon
                                                                stroke={
                                                                    theme.primary
                                                                }
                                                            />
                                                        </SubMenuLink>
                                                    </li>
                                                </Link>
                                            </SubMenu>
                                        )}
                                        <Link to="/dashboard/driver/assigned-pickups/">
                                            <li>
                                                <MenuLink>
                                                    <DriverReceived stroke="#444" />
                                                    {/*<NotiCount>
                                                    <p>3</p>
                                                </NotiCount>*/}
                                                    <h3>Pickups</h3>

                                                    <RightIcon
                                                        stroke={theme.primary}
                                                    />
                                                </MenuLink>
                                            </li>
                                        </Link>
                                        <Link to="/dashboard/driver/deliveries/">
                                            <li>
                                                <MenuLink>
                                                    <Orders />
                                                    {/*<NotiCount>
                                                    <p>3</p>
                                                </NotiCount>*/}
                                                    <h3>Deliveries</h3>

                                                    <RightIcon
                                                        stroke={theme.primary}
                                                    />
                                                </MenuLink>
                                            </li>
                                        </Link>
                                    </SubMenu>
                                )}
                            </>
                        )}
                    </Menu>
                </NavBar>
            )}
        </Container>
    );
};

export default SideNav;

// const NotiCount = styled(Pill)`
//     position: absolute;
//     transform: translate(20px, -10px);
// `;

const Container = styled.div`
    background: white;
    height: fit-content;
`;

const Toggle = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background-color: ${theme.primary};
    padding: 6px 10px;
    width: auto;
    color: ${theme.secondary};
    top: 200px;
    border-radius: 0 15px 15px 0;
    position: absolute;

    :hover {
        transform: scale(1.05);
    }
    cursor: pointer;
    display: flex;
    writing-mode: tb-rl;
    align-items: center;

    :last-child {
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;
const CaretBorder = styled.div`
    background: white;
    padding: 8px;
    border-radius: 8px;
`;
const NavBar = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background: white;
    position: sticky;
    width: 405px;
    left: -300px;
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
    margin: 5px 15px;
`;

const Name = styled.h2`
    margin: 0 0 8px 0;
`;
const UserType = styled.p`
    margin: 0 0 8px 0;
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
    margin: 2px 0;
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
    }
    h3 {
        font-size: 0.9em;
    }
    h4 {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.8em;
    }
`;
const SubMenu = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background: ${theme.secondary};
    min-width: 300px;
    li {
        display: flex;
        align-items: center;
        padding-left: 30px;
        /* ::before {
            content: "-";
            place-content: center;
        } */
    }
`;
const SubMenuLink = styled.button`
    border: none;
    margin: 3px 0;
    background-color: white;
    width: 100%;
    padding: 8px 8px 8px 10px;

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
const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
`;
const MessageRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background: red;
    justify-content: center;
`;
const IconRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 50px;
    justify-content: space-between;
    background: green;
`;
const MessageDiv = styled.div`
    width: 238px;
    height: 46px;
    border-radius: 8px;
    background: blue;
    display: flex;
    fled-direction: row;
    padding: 0 40px;
    justify-content: space-around;
    align-items: center;
`;
const IconDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
