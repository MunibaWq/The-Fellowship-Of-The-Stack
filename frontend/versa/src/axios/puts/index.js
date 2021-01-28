import Axios from 'axios'

export const updateImage = async (label, imageSize, productID, filename) => {
    try {
        
            const response = await Axios.put("/images/update", {
                imageSize,
                productID,
                label,
                filename
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