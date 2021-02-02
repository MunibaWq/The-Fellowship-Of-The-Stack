import { addProduct } from "../../../axios/posts";
import { editProduct } from "../../../axios/puts";
import { setFormErrors } from "../../../redux/actions/Errors";
import { setRedirect } from "../../../redux/actions/Redirects";
import { thumbImg } from "../maps/mapImages";

export async function sendProductData(
    images,
    dispatch,
    props,
    productInfo,
    id
) {
    console.log("sendProductData happened");
    if (images.length === 0) {
        dispatch(setFormErrors("product", "Please add at least 1 image"));
    } else {
        let res;
        if (props.type === "Add") {
            res = await addProduct(productInfo, images, thumbImg);
        } else {
            res = await editProduct(productInfo, images, id, thumbImg);
        }
        let productID = res;
        dispatch(setRedirect("productForm", "/product-item/" + productID));
    }
}
