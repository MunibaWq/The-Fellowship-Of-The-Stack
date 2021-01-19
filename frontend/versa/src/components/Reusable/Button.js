import styled, { css } from "styled-components";

const Button = styled.button`
    display: flex;
    align-items: center;
    color: #6495ed;
    border: none;
    background-color: #fff;
    border-bottom: 3px solid #ffffff;
    padding: 20px 40px;
    font-weight: 700;
    letter-spacing: 5%;
    margin-right: 20px;
    transition: 0.5s ease;
    cursor: pointer;

    svg {
        width: 32px;
        height: 32px;
        margin-left: 8px;
        path{
            fill: #6495ed;
        }
        }
    }

    &:hover {
        border-bottom: 3px solid #6495ed;
    }

    ${(props) =>
        props.primary &&
        css`
            background: #6495ed;
            color: white;
            border: 3px solid #038db2;
            padding: 10px 20px;
            &:hover {
                transform: scale(1.2);
            }
        `}
    ${(props) =>
        props.secondary &&
        css`
            background: #ffb649;
            border: none;
            padding: 10px 20px;
            max-width: 100px;
            align-self: end;
            margin: 20px;
        `}
`;

export default Button;
