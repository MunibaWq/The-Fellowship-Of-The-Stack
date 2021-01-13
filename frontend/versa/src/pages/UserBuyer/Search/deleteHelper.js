// import Axios from "axios";
// let removeImage = async (address, image) => {
//     let pieces = Math.ceil(image.length / 100000);
//     let size = Math.floor(image.length / pieces);
//     pieces++;

//     let res;
//     for (let index = 0; index < pieces; index++) {
//         res = await Axios.delete(address, {
//             part: image.substring(index * size, index * size + size),
//             lastString: index + 1 === pieces,
//             product_id: 1,
//             label: "image test",
//             img_size: "thumb",
//         });
//     }
//     return res;
// };
// export default removeImage;
