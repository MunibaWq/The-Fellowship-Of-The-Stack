import styled, { css } from "styled-components";

const Button = styled.button`
    box-sizing: border-box;
    border-radius: 50px;
    background: #fff3f3;
    border: 3px solid #ff5c00;
    padding: 10px 20px;
    font-weight: 700;
    letter-spacing: 5%;
    margin-right: 20px;
    transition: 0.5s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }

    ${(props) =>
        props.primary &&
        css`
            background: #038db2;
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

        ${(props) =>
        props.cancel &&
        css`
            background: #ffb649;
            border: 3px solid #ffb649;
            color: #444444;
            transform: scale(1.2);
            padding: 10px 20px;
            max-width: 100px;
            align-self: end;
            margin: 20px;
        `}

        ${(props) =>
        props.submit &&
        css`
            background: #038db2;
            color: white;
            border: 3px solid #038db2;
            padding: 10px 20px;
            transform: scale(1.2);
            &:hover {
                transform: scale(1.4);
            }
        `}
`;

export default Button;
