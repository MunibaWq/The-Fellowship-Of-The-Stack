import styled from "styled-components";

import colors from "./Colors";

export const Modal = styled.div`
    text-align: center;
    top: 0;
    position: absolute;
    width: ${(props) => props.width || "90vw"};
    /* height: 40vh; */
    z-index: 3;
    background-color: ${colors.secondary};
    box-shadow: 5px 5px 20px 5px rgba(0, 0, 0, 35%);
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    button {
        align-self: center;
    }
`;

export const ModalTitle = styled.h1`
    margin-bottom: 30px;
    font-size: 25px;
`;
