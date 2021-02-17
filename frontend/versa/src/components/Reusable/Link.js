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
    padding: 5px 15px 5px 8px;
    border-bottom: 4px solid ${theme.secondary};
    font-weight: 700;
    letter-spacing: 5%;
    margin: 5px;
    min-width: fit-content;
    cursor: pointer;
    max-width: fit-content;

    svg {
        width: 28px;
        height: 28px;

        path {
            stroke: ${theme.primary};
        }
    }


    :hover,
    :focus,
    :active {
        outline: none;
        transition: 0.1s ease;
        color: ${theme.primaryHover};
        svg {
            path {
                stroke: ${theme.primaryHover};
            }
        }
    }

    ${(props) =>
        props.secondary &&
        css`
            background: ${theme.secondary};
            border: 4px solid ${theme.primary};
            color: ${theme.primary};
            border-radius: 10px;
            :hover, :focus, :active{
                outline: none;
            transition: 0.1s ease;
            color: ${theme.primaryHover};
            border: 4px solid ${theme.primaryHover};
            transform: scale(1.02);
            padding: 5px 15px 5px 8px;
                
            
           
            
           
        `}
    ${(props) =>
        props.primary &&
        css`
            background: ${theme.primary};
            border: 4px solid ${theme.primary};
            padding: 10px 20px;
            border-radius: 10px;
            color: ${theme.secondary};
            
            svg {
                margin: 0 4px;
                path {
                    fill: ${theme.secondary};
                }
            }

            :hover,
            :focus,
            :active {
                outline: none;
                background-color: ${theme.primaryHover};
                border: 4px solid ${theme.primaryHover};
                color: ${theme.secondary};
                transform: scale(1.02);
                svg {
                    path {
                        fill: ${theme.secondary};
                    }
                }
            }
            :active {
                box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
                transition: all 0.2s;
            }
        `}
`;
