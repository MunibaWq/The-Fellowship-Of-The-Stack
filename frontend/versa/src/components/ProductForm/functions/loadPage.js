import { getImagesByPID, getProductByID } from "../../../axios/gets";
import { clearFormInputs, setFormInputs } from "../../../redux/actions/Forms";
import { setImages } from "../../../redux/actions/Images";

export function loadPage(id, dispatch, type) {
    const getProductData = async () => {
        let data = await getProductByID(id);
        let pictures = await getImagesByPID(id);
        dispatch(setFormInputs("product", "title", data.title));
        dispatch(setFormInputs("product", "price", data.price));
        dispatch(setFormInputs("product", "desc", data.description));
        dispatch(setFormInputs("product", "materials", data.materials));
        dispatch(setFormInputs("product", "colours", data.colours));
        dispatch(setFormInputs("product", "sizes", data.sizes));
        dispatch(
            setImages(
                "productForm",
                pictures.map((picture) => {
                    return {
                        image: `https://versabucket.s3.us-east-2.amazonaws.com/images/${picture.filename}.jpeg`,
                        label: picture.label,
                        imageFile: "update",
                        size: "full",
                        filename: picture.filename,
                    };
                })
            )
        );
    };
    if (type === "Edit") {
        getProductData();
    } else {
        dispatch(clearFormInputs("product"));
        dispatch(setImages("productForm", []));
    }
}
