import styled from "styled-components";
import { useState } from "react";
import colors from "./Colors";

export const TextField = ({ multi, label, tests = [] }) => {
    const [showError, setShowError] = useState([]);
    return (
        <div>
            <FieldContainer>
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
                            if (error) {
                                setShowError(error);
                            } else {
                                setShowError(false);
                            }
                        }}
                    ></Input>
                )}
                <br />
                <Error>{showError}</Error>
            </FieldContainer>
        </div>
    );
};
export const TextArea = styled.textarea`
    resize: none;
    box-sizing: border-box;
    border-radius: 5px;
    border-style: none;
    height: 100px;
    background-color: rgba(80, 80, 80, 15%);
    

   
    &:focus {
        outline: none !important;
        border: 3px solid ${colors.primary};
        box-shadow: 0 0 10px ${colors.primary};
    }
`;
export const Label = styled.label``;
export const Error = styled.p`
    color: red;
height:10px;
`;

export const Input = styled.input`
    border-radius: 5px;
    border-style: none;
    height: 35px;
    
    background-color: rgba(80, 80, 80, 15%);

    &:focus {
        outline: none !important;
        border: 3px solid ${colors.primary};
        box-shadow: 0 0 10px ${colors.primary};
    }
  
`;
export const FieldContainer = styled.div`
   
`;
export const ColorInput = styled.input.attrs((props) => ({
    type: "color",
}))`
    border-radius: 100%;
    height: 35px;
    width: auto;
  
    border: none;
    outline: none;
    -webkit-appearance: none;
`;
