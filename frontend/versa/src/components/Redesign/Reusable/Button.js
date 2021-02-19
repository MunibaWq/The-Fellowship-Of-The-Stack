import styled, { css } from "styled-components";
import GradientMove from "./Animations";

const Button = styled.button.attrs((props) => ({
    type: props.type || "button",
}))`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 40px;
    text-transform: uppercase;
    font-weight: 700;
    color: #f3f6ff;
    letter-spacing: 0.05em;
    border: none;
    animation: ${GradientMove} 6s ease infinite;
    transition: background 0.3s linear;
    background: #6b45ff;
    border-radius: 15px;
    font-family: "Inter", sans-serif;
    margin: 0;
    max-width: fit-content;
    cursor: pointer;
    :hover {
        background: linear-gradient(
                177deg,
                rgba(235, 243, 208, 0.6) 0%,
                rgba(235, 243, 208, 0) 18.4%
            ),
            radial-gradient(
                29.9% 70.94% at 44.25% 86.96%,
                rgba(220, 141, 220, 0.6) 0%,
                rgba(220, 141, 220, 0) 100%
            ),
            radial-gradient(
                42.66% 49.72% at 45.56% 44.65%,
                rgba(203, 173, 235, 0.6) 0%,
                rgba(194, 166, 241, 0) 100%
            ),
            radial-gradient(
                44.37% 103.98% at 75.16% 33.54%,
                rgba(255, 253, 177, 0.6) 0%,
                rgba(254, 228, 191, 0.6) 46.6%,
                rgba(240, 189, 208, 0.6) 69.5%,
                rgba(255, 129, 38, 0) 100%
            ),
            linear-gradient(
                86.83deg,
                rgba(180, 255, 198, 0.6) 26.09%,
                rgba(205, 249, 232, 0) 42.6%
            );
        color: #1c1c1c;
    }
    ${(props) =>
        props.primarySmall &&
        css`
            border-radius: 8px;
            padding: 10px 20px;
        `}
    ${(props) =>
        props.secondary &&
        css`
            background: #1c1c1c;
            padding: 20px 40px;
        `}
    ${(props) =>
        props.secondarySmall &&
        css`
            background: #1c1c1c;
            border-radius: 8px;
            padding: 10px 20px;
            :hover {
                background: #1c1c1c;
            }
        `}
    ${(props) =>
        props.tertiary &&
        css`
            color: #6b45ff;
            padding: 10px 20px;
            background: none;
            border-bottom: 3px solid transparent;
            svg {
                margin-right: 8px;
                path {
                    stroke: #6b45ff;
                    fill: #6b45ff;
                }
            }

            :hover {
                color: #1c1c1c;
                svg {
                    margin-right: 8px;
                    path {
                        stroke: #1c1c1c;
                        fill: #1c1c1c;
                    }
                }
                border-bottom: 3px solid;
                background: none;
                border-image: linear-gradient(
                        177deg,
                        rgba(235, 243, 208, 0.6) 0%,
                        rgba(235, 243, 208, 0) 18.4%
                    )
                    1;
            }
        `}
`;

export default Button;
