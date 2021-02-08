import { setFormErrors } from "../../redux/actions/Errors";
import { sendProductData } from "./functions/sendProductData";

export function submitData(stock, input, images, dispatch, props, id, quant) {
    console.log("submitData happened");
    const productInfo = {
        title: input.title,
        price: input.price,
        description: input.desc,
        colours: input.colours,
        artist_id: "1",
        sizes: input.sizes,
        materials: input.materials,
    };

    if (input.title && input.desc && input.price) {
        let error = document.getElementById("error");
        if (!error) {
            sendProductData(
                stock,
                images,
                dispatch,
                props,
                productInfo,
                id,
                quant,
                input
            );
        } else {
            dispatch(
                setFormErrors("product", "Please check all input is valid.")
            );
        }
    } else {
        dispatch(
            setFormErrors("product", "Please fill out all required fields")
        );
    }
}
