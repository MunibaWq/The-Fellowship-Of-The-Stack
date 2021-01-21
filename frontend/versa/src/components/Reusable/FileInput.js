import React from "react";
import styled from "styled-components";

const FileInput = () => {
    return (
        <div>
            <LabelWrapper htmlFor="file-input">
                <InputWrapper name="file-input" type="file"></InputWrapper>
            </LabelWrapper>
        </div>
    );
};

const LabelWrapper = styled.label`
    width: 100px;
    height: 100px;
    background: red;
    display: block;
`;
const InputWrapper = styled.input``;
export default FileInput;
