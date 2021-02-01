// import React, { useState } from "react";
// import { SketchPicker } from "react-color";
// import styled from "styled-components";

// export const Color = styled.div`
//     width: 36px;
//     height: 14px;
//     border-radius: 2px;
//       background: ${(props) => (props.color ? props.color : "black")};
// `;

// // background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,

// export const Swatch = styled.div`
//     padding: 5px;
//     background: #fff;
//     border-radius: 1px;
//     box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
//     display: inline-block;
//     cursor: pointer;
// `;

// export const Popover = styled.div`
//     position: absolute;
//     z-index: 2;
// `;

// export const Cover = styled.div`
//     position: fixed;
//     top: 0px;
//     right: 0px;
//     bottom: 0px;
//     left: 0px;
// `;

// const ColorInput = () => {
//     const [color, setColor] = useState("#ffffff");
//     const [displayColorPicker, setDisplayColorPicker] = useState(false);

//     const handleClick = () => {
//         setDisplayColorPicker(!displayColorPicker);
//     };

//     const handleClose = () => {
//         setDisplayColorPicker(false);
//     };

//     const handleChange = (color) => {
//         setColor(color.rgb);
//     };

//     return (
//         <div>
//             <Swatch onClick={handleClick}>
//                 <Color />
//             </Swatch>
//             {displayColorPicker ? (
//                 <Popover>
//                     <Cover onClick={handleClose} />
//                     <SketchPicker color={color} onChange={handleChange} />
//                 </Popover>
//             ) : null}
//         </div>
//     );
// };

// export default ColorInput;

// // const ColorInput = () => {
// //     const [color, setColor] = useState("#ffffff");
// //     return (
// //         <div>
// //             {/* <label htmlFor="color-label">Color picker</label> */}
// //             <SketchPicker
// //                 color={color}
// //                 onChangeComplete={(color) => {
// //                     setColor(color.hex);
// //                 }}
// //             />
// //             <div
// //                 style={{
// //                     backgroundColor: color,
// //                     height: "20px",
// //                     width: "20px",
// //                     transition: "ease all 500ms",
// //                 }}
// //             >
// //                 {" "}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ColorInput;
