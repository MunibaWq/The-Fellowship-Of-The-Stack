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
        if (props.type === "Add") {
            addProduct(productInfo, images, thumbImg);
        } else {
            editProduct(productInfo, images, id, thumbImg);
        }

        dispatch(setRedirect("productForm", "/dashboard/inventory"));
    }
}
