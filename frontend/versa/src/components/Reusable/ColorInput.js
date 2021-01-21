import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorInput = () => {
    const [color, setColor] = useState("#ffffff");
    return (
        <div>
            {/* <label htmlFor="color-label">Color picker</label> */}
            <SketchPicker
                color={color}
                onChangeComplete={(color) => {
                    setColor(color.hex);
                }}
            />
            <div
                style={{
                    backgroundColor: color,
                    height: "20px",
                    width: "20px",
                    transition: "ease all 500ms",
                }}
            >
                {" "}
            </div>
        </div>
    );
};

export default ColorInput;
