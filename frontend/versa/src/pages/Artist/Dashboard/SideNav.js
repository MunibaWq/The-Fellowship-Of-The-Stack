import React, { useState, useEffect } from "react";
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
    PaperPlaneTilt,
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

const white = "#F3F6FF";
const newPurp = "#6B45FF";
const lightPurp = "#E0B8FF";
const green = "#B4FFC6";
const black = "#1C1C1C";

const SideNav = ({ navWidth, setNavWidth }) => {
    const [visiblePSub, setVisiblePSub] = useState(false);
    const [visibleASub, setVisibleASub] = useState(false);
    const [visibleSDSub, setVisibleSDSub] = useState(false);
    const [visibleADSub, setVisibleADSub] = useState(false);
    const [visibleDDSub, setVisibleDDSub] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [links, setLinks] = useState("artist");
    const [toggleIconStroke, setToggleIconStroke] = useState(white);
    const [toggleIconFill, setToggleIconFill] = useState(newPurp);
    const [shrinkStroke, setShrinkStroke] = useState(black);
    const [shrinkFill, setShrinkFill] = useState(white);
    const [active, setActive] = useState(0);
    const [artistFill, setArtistFill] = useState(null);
    const [artistColor, setArtistColor] = useState(null);
    const [buyerFill, setBuyerFill] = useState(null);
    const [buyerColor, setBuyerColor] = useState(null);
    const [driverColor, setDriverColor] = useState(null);
    const [driverFill, setDriverFill] = useState(null);

    useEffect(() => {
        if (!expanded) {
            setToggleIconStroke(white);
        }
    }, [expanded]);

    useEffect(() => {
        if (active === 0) {
            setArtistColor(lightPurp);
            setArtistFill(holo);
            setBuyerColor(null);
            setBuyerFill(null);
            setDriverColor(null);
            setDriverFill(null);
        } else if (active === 1) {
            setBuyerColor(lightPurp);
            setBuyerFill(holo);
            setArtistColor(null);
            setArtistFill(null);
            setDriverColor(null);
            setDriverFill(null);
        } else if (active === 2) {
            setDriverColor(lightPurp);
            setDriverFill(holo);
            setArtistColor(null);
            setArtistFill(null);
            setBuyerColor(null);
            setBuyerFill(null);
        }
    }, [active]);

    return (
        <Container navWidth={navWidth}>
            {!expanded && (
                <Toggle>
                    <CaretBorder
                        onClick={() => {
                            setNavWidth(300);
                            setExpanded(true);
                        }}
                        onMouseEnter={() => {
                            setToggleIconFill("none");
                            setToggleIconStroke(black);
                        }}
                        onMouseLeave={() => {
                            setToggleIconFill(newPurp);
                            setToggleIconStroke(white);
                        }}>
                        <CaretDoubleLeft
                            stroke={toggleIconStroke}
                            fill={toggleIconFill}
                        />
                    </CaretBorder>
                    <ClosedTitle>MENU</ClosedTitle>
                </Toggle>
            )}
            {expanded && (
                <NavBar>
                    <Header>
                        <OpenTitle>DASHBOARD MENU</OpenTitle>
                        <CaretBorderAlt
                            onClick={() => {
                                setNavWidth(0);
                                setExpanded(false);
                            }}
                            onMouseEnter={() => {
                                setShrinkFill("none");
                                setShrinkStroke(black);
                            }}
                            onMouseLeave={() => {
                                setShrinkFill(white);
                                setShrinkStroke(black);
                            }}>
                            <CaretDoubleLeft
                                stroke={shrinkStroke}
                                fill={shrinkFill}
                            />
                        </CaretBorderAlt>
                    </Header>
                    <BodyContainer>
                        {/* icon row */}
                        <IconRow>
                            <Link to="/dashboard/artist">
                                <IconDiv
                                    onClick={(e) => {
                                        setLinks("artist");
                                        setActive(0);
                                    }}
                                    onMouseEnter={() => {
                                        if (active !== 0) {
                                            setArtistColor(green);
                                            setArtistFill(green);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (active !== 0) {
                                            setArtistColor(null);
                                            setArtistFill(null);
                                        }
                                    }}
                                    color={artistColor}
                                    fill={artistFill}>
                                    <IconBorder>
                                        <PaintBrushIcon
                                            width="24"
                                            height="24"
                                        />
                                    </IconBorder>

                                    <IconLabel>ARTIST</IconLabel>
                                </IconDiv>
                            </Link>
                            <Link to="/dashboard/shopper">
                                <IconDiv
                                    onClick={() => {
                                        setLinks("buyer");
                                        setActive(1);
                                    }}
                                    onMouseEnter={() => {
                                        if (active !== 1) {
                                            setBuyerColor(green);
                                            setBuyerFill(green);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (active !== 1) {
                                            setBuyerColor(null);
                                            setBuyerFill(null);
                                        }
                                    }}
                                    color={buyerColor}
                                    fill={buyerFill}>
                                    <IconBorder>
                                        <Products width="24" height="24" />
                                    </IconBorder>

                                    <IconLabel>SHOPPER</IconLabel>
                                </IconDiv>
                            </Link>
                            <Link to="/dashboard/driver">
                                <IconDiv
                                    onClick={() => {
                                        setLinks("driver");
                                        setActive(2);
                                    }}
                                    onMouseEnter={() => {
                                        if (active !== 2) {
                                            setDriverColor(green);
                                            setDriverFill(green);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (active !== 2) {
                                            setDriverColor(null);
                                            setDriverFill(null);
                                        }
                                    }}
                                    color={driverColor}
                                    fill={driverFill}>
                                    <IconBorder>
                                        <CarIcon width="24" height="24" />
                                    </IconBorder>

                                    <IconLabel>DRIVER</IconLabel>
                                </IconDiv>
                            </Link>
                        </IconRow>
                        {/* message row */}
                        <MessageRow>
                            <MessageDiv to="/dashboard/messages">
                                <PaperPlaneTilt />
                                <ButtonLabel>MESSAGES</ButtonLabel>
                            </MessageDiv>
                        </MessageRow>
                        {/* map rows here */}
                        <DashNav type={links} />
                    </BodyContainer>
                </NavBar>
            )}
        </Container>
    );
};

export default SideNav;

const holo = `linear-gradient(
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

const Container = styled.div`
    background: white;
    /* height: fit-content; */
    border-radius: 0 15px 15px 0;
`;
const CaretBorder = styled.div`
    background: ${newPurp};
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background: ${holo};
        transform: scale(1.1);
        SVG {
            stroke: ${(props) => props.stroke};
            fill: ${(props) => props.fill};
            fill-opacity: 0;
        }
    }
    height: 40px;
    SVG {
        stroke: ${(props) => props.stroke};
        fill: ${(props) => props.fill};
    }
`;

const CaretBorderAlt = styled.div`
    background: ${white};
    padding: 8px;
    border-radius: 8px;
    height: 40px;
    cursor: pointer;
    &:hover {
        background: ${holo};
        transform: scale(1.1);
        SVG {
            stroke: ${(props) => props.stroke};
            fill: ${(props) => props.fill};
            fill-opacity: 0;
        }
    }
    SVG {
        transform: rotate(180deg);
        stroke: ${(props) => props.stroke};
        fill: ${(props) => props.fill};
    }
`;
const ClosedTitle = styled.div`
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${white};
    transform: rotatez(180deg);
    /* margin: 20px; */
`;
const OpenTitle = styled.p`
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${white};
`;
const Toggle = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background-color: ${black};
    padding: 6px 10px;
    width: 82px;
    height: 248px;
    top: 60px;
    border-radius: 0 15px 15px 0;
    position: absolute;
    display: flex;
    justify-content: space-around;
    writing-mode: tb-rl;
    align-items: center;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: 1px solid ${lightPurp};
    border-left: none;
`;

const NavBar = styled.div`
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background: ${black};
    position: sticky;
    width: 405px;
    left: -300px;
    padding: 40px;
    border-radius: 0 15px 15px 0;
    border: 2px solid ${lightPurp};
    border-left: none;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
`;

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const MessageRow = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    &:hover {
        transform: scale(1.1);
    }
`;
const IconRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 20px;
    justify-content: space-between;
    background: ${black};
`;
const ButtonLabel = styled.h2`
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 17px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${black};
`;
const MessageDiv = styled(Link)`
    width: 250px;
    height: 50px;
    border-radius: 8px;
    background: ${white};
    display: flex;
    flex-direction: row;
    padding: 20px 50px;
    /* width: 60%; */
    justify-content: space-evenly;
    align-items: center;
    svg {
        stroke: ${black};
    }
    &:hover {
        background: ${green};
    }
`;
const IconDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        h3 {
            color: ${(props) => props.color};
        }
        div {
            background: ${(props) => props.fill};
        }
    }
    h3 {
        color: ${(props) => props.color};
    }
    div {
        background: ${(props) => props.fill};
    }
    margin: 0 5px;
`;
const IconLabel = styled.h3`
    color: ${white};
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;
const IconBorder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${white};
    border-radius: 8px;
    height: 44px;
    width: 44px;
    margin-bottom: 10px;
`;
