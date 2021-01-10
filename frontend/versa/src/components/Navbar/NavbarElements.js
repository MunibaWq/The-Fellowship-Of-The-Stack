import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #ffb649;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;

    /* @media screen and (max-width: 768px) {
        padding: auto;
    } */
`;

export const NavLink = styled(Link)`
    color: #444444;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #038db2;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -210px;
    /* float: right; */
    /* white-space: wrap; */

    /* @media screen and (max-width: 768px) {
        margin: auto;
    } */
`;

export const LogoContainer = styled.div`
    svg {
        /* padding-right: -5px; */
        height: 1rem;
        width: 1rem;
    }
`;
