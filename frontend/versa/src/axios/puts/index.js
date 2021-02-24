import Axios from "axios";
import { addEventImage, addImage } from "../posts";

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
            let res = await updateProductImage(label, size, id, filename);
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
export const updateProductImage = async (
    label,
    imageSize,
    productID,
    filename
) => {
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
export const updateInventoryStatus = async (result, status) => {
    result.status = status;
    await Axios.put("/api/products/edit/" + result.id, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        data: result,
    });
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

export const addToDeliveries = async (id) => {
    try {
        const response = await Axios.put(
            "/api/dashboard/ready-to-deliver" + id,
            {
                orderStatus: "Driver Assigned",
            }
        );

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

export const driverUpdateStatus = async (orderStatus, orderid) => {
    try {
        await Axios.put("/api/dashboard/driver/deliveries/update/" + orderid, {
            status: orderStatus,
        });
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

export const editEvent = async (event, images, id, thumbImg) => {
    try {
        const response = await Axios.put("/api/events/edit/" + id, {
            data: event,
        });
        let eventID = id;
        images.forEach(async (image, index) => {
            if (index === thumbImg) {
                image.size = "thumb";
            }

            if (image.imageFile === "update") {
                let { label, size, filename } = image;
                let res = await updateEventImage(label, size, id, filename);
                if (!res) {
                    alert("failed to update thumbnail choice");
                }
            } else {
                let { imageFile, label, size } = image;
                let res = await addEventImage(imageFile, label, size, eventID);
                if (!res)
                    alert(
                        JSON.stringify(imageFile) +
                            " failed to upload, go to edit event to try to add picture again"
                    );
            }
        });
        window.location = "/dashboard";

        return eventID;

        // if (response.status === 201) {
        //     return true;
        // }
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const updateEventImage = async (label, imageSize, eventID, filename) => {
    try {
        const response = await Axios.put("/api/eventImages/update", {
            imageSize,
            eventID,
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

export const modifyCart = async (
    cartProduct,
    colour,
    size,
    quantity,
    session
) => {
    const modCartResponse = await Axios.put("/api/cart/edit", {
        cartProduct,
        colour,
        size,
        quantity,
        session,
    });
    return modCartResponse.data;
};

export const addDriverID = (orderid) => {
    try {
        let response = Axios.put(
            `/api/dashboard/driver/order-to-fulfill/add/${orderid}`
        );
        return response.status;
    } catch (err) {
        console.log(err);
        return false;
    }
};
export const removeDriverID = (orderid) => {
    try {
        let response = Axios.put(
            `/api/dashboard/driver/order-to-fulfill/remove/${orderid}`
        );
        return response.status;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const setProductAsPicked = async (status, single_id) => {
    try {
        const response = await Axios.put(
            "/api/dashboard/driver/assigned-pickups/",
            {
                driverStatus: status,
                singleID: single_id,
            }
        );

        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};
