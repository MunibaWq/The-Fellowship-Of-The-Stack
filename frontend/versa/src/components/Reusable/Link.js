import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import theme from "./Colors";

export const StyledLink = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${theme.primary};
    border: none;
    background-color: ${theme.secondary};
    border-bottom: 3px solid ${theme.secondary};
    padding: 5px 15px 5px 8px;
    font-weight: 700;
    letter-spacing: 5%;
    margin: 5px;
    min-width: fit-content;
    cursor: pointer;
    max-width: fit-content;

    svg {
        width: 24px;
        height: 24px;

        path {
            fill: ${theme.primary};
        }
    }
    :focus {
        outline: none;
    }

    :hover,
    :active {
        outline: none;
        transition: 0.1s ease;
        color: ${theme.primaryHover};
        svg {
            path {
                fill: ${theme.primaryHover};
            }
        }
    }

    ${(props) =>
        props.secondary &&
        css`
            background: ${theme.secondary};
            border: 3px solid ${theme.primary};
            color: ${theme.primary};
            border-radius: 15px;
            :hover, :active{
                outline: none;
            transition: 0.1s ease;
            color: ${theme.primaryHover};
            border: 3px solid ${theme.primaryHover};
            transform: scale(1.02);

            :focus{
            outline: none;
            }
            svg{
                path{
                    fill: ${theme.primaryHover};
                }
            }
            
           
        `}
    ${(props) =>
        props.primary &&
        css`
            background: ${theme.primary};
            border: 3px solid ${theme.primary};
            padding: 5px 20px;
            border-radius: 15px;
            color: ${theme.secondary};
            :focus {
                outline: none;
            }
            svg {
                path {
                    fill: ${theme.secondary};
                }
            }

            :hover,
            :active {
                background-color: ${theme.primaryHover};
                border: 3px solid ${theme.primaryHover};
                color: ${theme.secondary};
                transform: scale(1.02);
                svg {
                    path {
                        fill: ${theme.secondary};
                    }
                }
            }
        `}
`;
