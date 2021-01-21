import styled, { css } from "styled-components";
import colors from "./Colors";

// The style is TERTIARY. Add primary or secondary as props if you'd like those styles
//eg <Button primary>Click me</Button>

// The type is "button". If you need it to submit, add type="submit"
//eg <Button type="submit">Submit Form</Button>

const Button = styled.button.attrs((props) => ({
    type: props.type || "button",
}))`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${colors.primary};
    border: none;
    background-color: ${colors.secondary};
    border-bottom: 3px solid ${colors.secondary};
    padding: 5px 10px;
    font-weight: 700;
    letter-spacing: 5%;
    margin: 5px;
    transition: 0.3s ease;
    min-width: fit-content;
    cursor: pointer;
    max-width: fit-content;

    svg {
        width: 28px;
        height: 28px;
        margin-left: 16px;

        path {
            transition: 0.3s ease;
            fill: ${colors.primary};
        }
    }

    &:hover {
        color: ${colors.primaryHover};
        svg {
            path {
                fill: ${colors.primaryHover};
            }
        }
    }

    &:focus {
        outline: none;
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
            border: 6px solid ${colors.primary};
            color: ${colors.primary};
            border-radius: 50px;
            &:hover {
            color: ${colors.primaryHover};
            border: 6px solid ${colors.primaryHover};
            svg{
                path{
                    fill: ${colors.primaryHover};
                }
            }
            &:focus{
                outline: none;
                color: ${colors.primaryHover};
            border: 6px solid ${colors.primaryHover};
            svg{
                path{
                    fill: ${colors.secondaryOther};
                }
            }
        `}
    ${(props) =>
        props.primary &&
        css`
            background: ${colors.primary};
            border: 6px solid ${colors.primary};
            padding: 10px 20px;
            border-radius: 50px;
            color: ${colors.secondary};
            svg {
                path {
                    fill: ${colors.secondary};
                }
            }
            &:hover {
                background-color: ${colors.primaryHover};
                border: 6px solid ${colors.primaryHover};
                color: ${colors.secondary};
                svg {
                    path {
                        fill: ${colors.secondary};
                    }
                }
            }

            &:focus {
                outline: none;
                background-color: ${colors.primaryHover};
                color: ${colors.secondary};
                svg {
                    path {
                        fill: ${colors.secondary};
                    }
                }
            }
        `}
`;

export default Button;
