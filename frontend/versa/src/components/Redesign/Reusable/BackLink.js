import styled from "styled-components";
import { Link } from "react-router-dom";
import GradientMove from "./Animations";

const BackLink = styled(Link)`
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-transform: uppercase;
    font-weight: 700;
    color: ${(props) => props.theme.blue};
    letter-spacing: 0.05em;
    animation: ${GradientMove} 6s ease infinite;
    transition: all 0.3s linear;
    border-radius: 15px;
    font-family: "Inter", sans-serif;
    margin: 0;
    max-width: fit-content;
    outline: none;
    cursor: pointer;
    color: ${(props) => props.theme.purple};
    padding: 10px 20px;
    background: transparent;
    position: relative;
    border-bottom: 3px solid transparent;
    svg {
        margin-right: 8px;
        path {
            stroke: ${(props) => props.theme.purple};
            fill: ${(props) => props.theme.purple};
        }
    }

    :hover {
        color: ${(props) => props.theme.purple};
        svg {
            margin-right: 8px;
            path {
                stroke: ${(props) => props.theme.purple};
                fill: ${(props) => props.theme.purple};
            }
        }

        background: none;
    }
    ::after {
        transition: opacity 0.3s ease;
        content: "";
        position: absolute;
        width: 0%;
        transform: translate(-15%, 500%);
        height: 4px;
        border-radius: 50px;
        opacity: 0;
        background: ${(props) => props.theme.holo};
        box-shadow: ${(props) => props.theme.shadow};
    }
    &:hover::after {
        width: 100%;
        opacity: 100%;
    }
`;

export default BackLink;
