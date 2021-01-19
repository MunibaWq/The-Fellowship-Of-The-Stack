import styled from "styled-components";
export const TextField = ({ label, error }) => {
    return (
        <>
            <Label></Label>
            <Input></Input>
            <Error></Error>
        </>
    );
};
export const Label = styled.p``;
export const Error = styled.p``;

export const Input = styled.input`
    border-radius: 5px;
    border-style: none;
    height: 35px;
    background-color: rgba(80, 80, 80, 15%);
`;

export const TextArea = styled.textarea`
    border-radius: 5px;
    background-color: rgba(80, 80, 80, 75%);
`;
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
