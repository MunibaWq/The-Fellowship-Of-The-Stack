import React from "react";
import { LineCloseIcon } from "../../../images/icons";
import { RemoveIcon, NewSize, NewSizePrice } from "../styledComponents";
import { deleteItem } from "../functions/deleteItem";
import { setFormInputs } from "../../../redux/actions/Forms";

export function mapSizes(sizes, dispatch) {
    return sizes.map((size, index) => {
        return (
            <NewSize>
                <p>{size.label}</p>

                <NewSizePrice>$ {size.price}</NewSizePrice>
                <NewSizePrice>$ {size.cost || "??"}</NewSizePrice>
                <RemoveIcon
                    onClick={() => {
                        deleteItem(
                            index,
                            sizes,
                            setFormInputs,
                            dispatch,
                            "sizes"
                        );
                    }}>
                    <LineCloseIcon stroke="white" />
                </RemoveIcon>
            </NewSize>
        );
    });
}
