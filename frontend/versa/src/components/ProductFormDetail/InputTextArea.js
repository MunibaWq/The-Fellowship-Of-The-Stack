import React from "react";

const InputTextArea = ({ name, label }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <textarea
                name={name}
                onChange={(e) => {
                    console.log("the name, label : ", name, label);
                    console.log("the value ", e.target.value);
                }}
            />
        </>
    );
};

export default InputTextArea;
