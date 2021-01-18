import React from "react";

const InputText = ({ name, type, label }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                type={type ? type : "text"}
                onChange={(e) => {
                    console.log("name: ", name);
                    console.log("the value is ", e.target.value);
                }}
            />
        </div>
    );
};

export default InputText;
