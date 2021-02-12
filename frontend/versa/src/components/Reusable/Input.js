import styled from "styled-components";
import theme from "./Colors";
import { useDispatch, useSelector } from "react-redux";
import { setFormInputs } from "../../redux/actions/Forms";
import { setInputErrors } from "../../redux/actions/Errors";

export const TextField = ({
    required,
    password,
    form,
    name,
    multi,
    label,
    tests = [],
}) => {
    const dispatch = useDispatch();
    const input = useSelector((state) => state.formInputs[form][name]);
    const error = useSelector((state) => state.formErrors[form][name]);
    return (
        <div>
            <FieldContainer>
                <Label>
                    {label} {required && "*"}
                </Label>
                {multi ? (
                    <TextArea
                        type={password ? "password" : "text"}
                        onChange={(e) => {
                            let error = "";
                            for (let test of tests) {
                                if (test.test(e.target.value)) {
                                    error = test.error;
                                }
                            }
                            if (error) {
                                dispatch(setInputErrors(form, name, error));
                                // setShowError(error);
                            } else {
                                dispatch(setInputErrors(form, name, false));
                            }
                            dispatch(setFormInputs(form, name, e.target.value));
                        }}
                        value={input || ""}></TextArea>
                ) : (
                    <Input
                        value={input || ""}
                        type={password ? "password" : "text"}
                        onChange={(e) => {
                            let error = "";
                            for (let test of tests) {
                                if (test.test(e.target.value)) {
                                    error = test.error;
                                }
                            }
                            if (error) {
                                dispatch(setInputErrors(form, name, error));
                                // setShowError(error);
                            } else {
                                dispatch(setInputErrors(form, name, false));
                            }
                            dispatch(setFormInputs(form, name, e.target.value));
                        }}></Input>
                )}
                <Error id={error && "error"}>{error}</Error>
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
    font-family: Inter;
    background-color: rgba(80, 80, 80, 15%);

    &:focus {
        outline: none !important;
        border: 3px solid ${theme.primary};
        box-shadow: 0 0 10px ${theme.primary};
    }
`;
export const Label = styled.label`
    margin-left: 3px;
    margin-bottom: 8px;
    text-align: left;
    font-family: Inter;
`;

export const Error = styled.p`
    color: red;
    margin-left: 3px;
    margin-bottom: 1.5em;
    height: 10px;
    font-family: Inter;
`;

export const Input = styled.input`
    width: 100%;
    border-radius: 5px;
    border: 3px solid ${theme.secondary};
    height: 35px;
    font-family: Inter;
    background-color: rgba(80, 80, 80, 15%);

    &:focus {
        outline: none !important;
        border: 3px solid ${theme.primary};
        box-shadow: 0 0 10px ${theme.primary};
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
