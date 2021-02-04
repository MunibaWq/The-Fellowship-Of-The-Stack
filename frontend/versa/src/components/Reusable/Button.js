import styled, { css } from "styled-components";
import theme from "./Colors";

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
    color: ${theme.primary};
    border: none;
    background-color: ${theme.secondary};
    border-bottom: 4px solid ${theme.secondary};
    padding: 5px 15px 5px 8px;
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
    :active,
    :focus {
        outline: none;
        transition: 0.1s ease;
        color: ${theme.primaryHover};
        svg {
            path {
                stroke: ${theme.primaryHover};
                fill: ${theme.primaryHover};
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
            :hover,
            :active,
            :focus {
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
                path {
                    stroke: ${theme.primaryHover};
                    fill: ${theme.primaryHover};
                }
            }

            :hover,
            :active,
            :focus {
                outline: none;
                background-color: ${theme.primaryHover};
                border: 4px solid ${theme.primaryHover};
                color: ${theme.secondary};
                transform: scale(1.02);
                svg {
                    path {
                        stroke: ${theme.secondary};
                        fill: ${theme.secondary};
                    }
                }
            }
        `}
`;

export default Button;
