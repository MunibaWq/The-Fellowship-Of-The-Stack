import styled from "styled-components";
import { useState } from "react";
export const TextField = ({ multi, label, tests = [] }) => {
    const [showError, setShowError] = useState([]);
    return (
        <>
            <Label>{label}</Label>
            <br />
            {multi ? (
                <TextArea
                    onChange={(e) => {
                        let error = "";
                        for (let test of tests) {
                            console.log(test);
                            if (test.test(e.target.value)) {
                                error = test.error;
                            }
                        }
                        if (error) {
                            setShowError(error);
                        } else {
                            setShowError(false);
                        }
                    }}
                ></TextArea>
            ) : (
                <Input
                    onChange={(e) => {
                        let error = "";
                        for (let test of tests) {
                            console.log(test);
                            if (test.test(e.target.value)) {
                                error = test.error;
                            }
                        }
                        if (error) setShowError(error);
                    }}
                ></Input>
            )}
            <br />
            <Error>{showError}</Error>
        </>
    );
};
export const TextArea = styled.textarea`
    resize: none;
    border-radius: 5px;
    border-style: none;
    height: 100px;
    margin-bottom: 30px;

    background-color: rgba(80, 80, 80, 15%);
    @media screen and (max-width: 450px) {
        width: 100%;
    }
`;
export const Label = styled.label``;
export const Error = styled.p`
    color: red;
`;

export const Input = styled.input`
    border-radius: 5px;
    border-style: none;
    height: 35px;
    margin-bottom: 30px;

    background-color: rgba(80, 80, 80, 15%);
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
