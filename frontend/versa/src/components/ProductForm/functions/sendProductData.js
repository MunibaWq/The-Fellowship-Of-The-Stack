import { addProduct } from "../../../axios/posts";
import { editProduct, editStock } from "../../../axios/puts";
import { setFormErrors } from "../../../redux/actions/Errors";
import { setRedirect } from "../../../redux/actions/Redirects";
import { thumbImg } from "../maps/mapImages";

export async function sendProductData(
    stock,
    images,
    dispatch,
    props,
    productInfo,
    id,
    quant,
    input
) {
    console.log("sendProductData happened");
    if (images.length === 0) {
        dispatch(setFormErrors("product", "Please add at least 1 image"));
    } else {
        if (props.type === "Add") {
            addProduct(productInfo, images, thumbImg);
        } else {
            editStock(id, quant);
            editProduct(productInfo, images, id, thumbImg);
        }

        dispatch(setRedirect("productForm", "/dashboard/inventory"));
    }
}
