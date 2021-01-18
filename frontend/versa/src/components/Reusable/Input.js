import styled from "styled-components";

export const ColorInput = styled.input.attrs((props) => ({
    type: "color",
}))`
    border-radius: 100%;
    height: 60px;
    width: 60px;
    border: none;
    outline: none;
    -webkit-appearance: none;
`;
