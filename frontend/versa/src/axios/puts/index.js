import Axios from "axios";
import { response } from "express";
import { addImage } from "../posts";

export const editProduct = async (productInfo, images, id, thumbImg) => {
    await Axios.put("/api/products/edit/" + id, {
        data: productInfo,
    });
    let productID = +id;
    images.forEach(async (image, index) => {
        if (index === thumbImg) {
            image.size = "thumb";
        }

        if (image.imageFile === "update") {
            let { label, size, filename } = image;
            let res = await updateImage(label, size, id, filename);
            if (!res) {
                alert("failed to update thumbnail choice");
            }
        } else if (image.imageFile === "delete") {
            let { filename } = image;
            //let res = await deleteImage(filename)
            //if (!res) {
            //    alert(`Failed to delete image ${index}`)
            //}
        } else {
            let { imageFile, label, size } = image;
            let res = await addImage(imageFile, label, size, productID);
            if (!res)
                alert(
                    JSON.stringify(imageFile) +
                        " failed to upload, go to edit product to try to add picture again"
                );
        }
    });
    return productID;
};
export const updateImage = async (label, imageSize, productID, filename) => {
    try {
        const response = await Axios.put("/api/images/update", {
            imageSize,
            productID,
            label,
            filename,
        });
        if (response.status === 201) {
            return true;
        }

        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};
// created a put request for editStock part of product form and passed stock prop from productForm to submitData to sendProductData to here
export const editStock = async (id, quant) => {
    try {
        const response = await Axios.put("/api/stock/update", {
            quant,
            id,
        });

        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

//update order status when artist changes its status within dashboard order page

export const updateOrderStatus = async (orderStatus, id) => {
    try {
        const response = await Axios.put("/api/orders/edit/" + id, {
            orderStatus: orderStatus,
        });

        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const updateOrderShipDate = async (orderStatus, shipDate, id) => {
    try {
        const response = await Axios.put("/api/orders/edit/" + id, {
            orderStatus: orderStatus,
            shipDate: shipDate,
        });

        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

//update event status

export const updateEventStatus = async (status, id) => {
    try {
        const response = await Axios.put("/api/events/edit/" + id, {
            data: { status },
        });

        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const editEvent = async (event) => {
    try {
        const response = await Axios.put("/api/events/edit/" + event.id, {
            data: event,
        });

        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};
export const modifyCart = (cartProduct, colour, size, quantity, session) => {
    Axios.put("/api/cart/edit", {
        cartProduct,
        colour,
        size,
        quantity,
        session,
    });
};

export const updateDeliveryStatus = async (id, status) => {
    Axios.patch("/api/delivery/update-status", {
        order_id: id,
        status: status,
    });
};

export const getCurrentDelivery = async () => {
    try {
        const response = await Axios.get("/api/delivery/current-order");

        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};
