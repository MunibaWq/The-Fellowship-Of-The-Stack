// import React, { useState } from "react";
// import { deleteImage } from "../../../axios/delete";
// import removeImage from "./deletehelper";

// const ImageDelete = () => {
//     const [images, setImages] = useState([]);

//     function encodeImageFileAsURL(element) {
//         console.log(element);
//         var file = element.target.files[0];
//         var reader = new FileReader();
//         reader.onloadend = () => {
//             setImages([...images, reader.result]); //this converts the image to a long string
//             /* here you need to put code to send this to your server and then just save it in mongo like you would some other data.  then when you get it back out, you can just use it by putting the string into the src of an image tag */
//         };

//         reader.readAsDataURL(file);
//     }
//     return (
//         <>
//             <input
//                 onChange={(e) => {
//                     deleteImage(e.target.files[0], "test", "full", 1);
//                 }}
//                 type={"file"}
//                 accept={"image/png, image/jpeg"}
//             ></input>

//             {/* {images.map((image) => {
//                 return (
//                     <>
//                         <img style={{ width: "200px" }} src={image} />
//                     </>
//                 );
//             })} */}
//             <button
//                 onClick={async () => {
//                     let res = await removeImage(
//                         "http://localhost:5000/images/delete",
//                         images[0]
//                     );
//                     console.log(res);
//                     let imageArray = [];
//                     for (let i of res.data) {
//                         imageArray.push(i.image);
//                     }
//                     setImages([...images, ...imageArray]);
//                 }}
//             >
//                 Send
//             </button>
//         </>
//     );
// };

// export default ImageDelete;
