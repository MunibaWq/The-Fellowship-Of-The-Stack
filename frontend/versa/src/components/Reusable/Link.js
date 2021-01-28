import {css} from 'styled-components';
import colors from "./Colors";

export const LinkCSS = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${colors.primary};
    border: none;
    background-color: ${colors.secondary};
    border-bottom: 3px solid ${colors.secondary};
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
            fill: ${colors.primary};
        }
    }
    :focus{
    outline: none;
    }

    :hover, :active {
        outline: none;
        transition: 0.1s ease;
        color: ${colors.primaryHover};
        svg {
            path {
                fill: ${colors.primaryHover};
            }
        }
        
        
    }

    ${(props) =>
        props.secondary &&
        css`
            background: ${colors.secondary};
            border: 3px solid ${colors.primary};
            color: ${colors.primary};
            border-radius: 15px;
            :hover, :active{
                outline: none;
            transition: 0.1s ease;
            color: ${colors.primaryHover};
            border: 3px solid ${colors.primaryHover};
            transform: scale(1.02);

            :focus{
            outline: none;
            }
            svg{
                path{
                    fill: ${colors.primaryHover};
                }
            }
            
           
        `}
    ${(props) =>
        props.primary &&
        css`
            background: ${colors.primary};
            border: 3px solid ${colors.primary};
            padding: 5px 20px;
            border-radius: 15px;
            color: ${colors.secondary};
            :focus{
            outline: none;
            }
            svg {
                path {
                    fill: ${colors.secondary};
                }
            }

            :hover, :active {
                background-color: ${colors.primaryHover};
                border: 3px solid ${colors.primaryHover};
                color: ${colors.secondary};
                transform: scale(1.02);
                svg {
                    path {
                        fill: ${colors.secondary};
                    }
                }
            }
            
            
        `}
`;