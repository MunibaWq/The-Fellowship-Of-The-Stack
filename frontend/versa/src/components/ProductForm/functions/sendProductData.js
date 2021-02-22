import { addProduct, addStock } from "../../../axios/posts";
import { editProduct, editStock } from "../../../axios/puts";
import { setFormErrors } from "../../../redux/actions/Errors";
import { setRedirect } from "../../../redux/actions/Redirects";
import { thumbImg } from "../maps/mapImages";

export async function sendProductData(
    images,
    dispatch,
    props,
    productInfo,
    id,
    quant
) {
    if (images.length === 0) {
        dispatch(setFormErrors("product", "Please add at least 1 image"));
    } else if (!quant) {
        dispatch(
            setFormErrors(
                "product",
                "Please choose some initial stock values for your products"
            )
        );
    } else {
        if (props.type === "Add") {
            const test = async () => {
                const id = await addProduct(productInfo, images, thumbImg);
                await addStock(id, quant);
            };
            test();
        } else {
            editStock(id, quant);
            editProduct(productInfo, images, id, thumbImg);
        }

        dispatch(setRedirect("productForm", "/dashboard/artist/inventory"));
    }
}
