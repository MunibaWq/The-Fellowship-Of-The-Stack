import styled from "styled-components";

export const Modal = styled.div`
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    position: absolute;
    width: ${(props) => props.width || "90vw"};
    /* height: 40vh; */
    z-index: 3;
    background-color: white;
    box-shadow: 5px 5px 20px 5px rgba(0, 0, 0, 35%);
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    button {
        align-self: flex-end;
    }
`;

export const ModalTitle = styled.h1`
    margin-bottom: 30px;
    font-size: 25px;
`;
