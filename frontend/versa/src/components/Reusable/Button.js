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
    border-bottom: 4px solid ${colors.secondary};
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
            fill: ${colors.primary};
        }
    }

    :hover,
    :active,
    :focus {
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
            border: 4px solid ${colors.primary};
            color: ${colors.primary};
            border-radius: 50px;
            :hover,
            :active,
            :focus {
            outline: none;
            transition: 0.1s ease;
            color: ${colors.primaryHover};
            border: 4px solid ${colors.primaryHover};
            transform: scale(1.02);
            padding: 5px 15px 5px 8px;
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
            border: 4px solid ${colors.primary};
            padding: 10px 20px;
            border-radius: 50px;
            color: ${colors.secondary};
            svg {
                path {
                    fill: ${colors.secondary};
                }
            }

            :hover,
            :active,
            :focus {
                outline: none;
                background-color: ${colors.primaryHover};
                border: 4px solid ${colors.primaryHover};
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

export default Button;
