import styled from "styled-components";
import { useState } from "react";
import colors from "./Colors";
// import { useDispatch } from "react-redux";

export const TextField = ({ password, value, setValue, multi, label, tests = [] }) => {
    // const dispatch = useDispatch()
    const [showError, setShowError] = useState(false);
    return (
        <div>
            <FieldContainer>
                <Label>{label}</Label>
                {multi ? (
                    <TextArea
                        type={password?"password":"text"}
                        value={value}
                        onChange={(e) => {
                            let error = "";
                            for (let test of tests) {
                                if (test.test(e.target.value)) {
                                    error = test.error;
                                }
                            }
                            if (error) {
                                setShowError(error);
                            } else {
                                setShowError(false);
                            }
                            setValue(e.target.value)
                        }}
                    ></TextArea>
                ) : (
                        <Input
                            type={password?"password":"text"}
                            value={value}
                        onChange={(e) => {
                            let error = "";
                            for (let test of tests) {
                                if (test.test(e.target.value)) {
                                    error = test.error;
                                }
                            }
                            if (error) {
                                setShowError(error);
                            } else {
                                setShowError(false);
                                }
                                setValue(e.target.value)
                        }}
                    ></Input>
                )}
                <Error id={showError && "error"}>{showError}</Error>
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
export const Label = styled.label`
margin-left: 3px;
margin-bottom: 8px;`;
export const Error = styled.p`
    color: red;
    margin-left: 3px;
    margin-bottom: 1.5em;
height:10px;
`;

export const Input = styled.input`
    border-radius: 5px;
    border: 3px solid ${colors.secondary};
    height: 35px;
    
    background-color: rgba(80, 80, 80, 15%);

    &:focus {
        outline: none !important;
        border: 3px solid ${colors.primary};
        box-shadow: 0 0 10px ${colors.primary};
    }
  
`;
export const FieldContainer = styled.div`
   display: flex;
    flex-direction: column;
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
