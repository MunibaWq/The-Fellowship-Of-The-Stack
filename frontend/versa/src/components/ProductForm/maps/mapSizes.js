import React from "react";
import { LineCloseIcon } from "../../../images/icons";
import {
    RemoveIcon,

    NewSize,
    NewSizePrice
} from "../styledComponents";
import { deleteItem } from "../functions/deleteItem";

export function mapSizes(sizes) {
    return sizes.map((size, index) => {
        return (
            <NewSize>
                <p>{size.label}</p>

                <NewSizePrice>
                    $ {size.price}
                </NewSizePrice>
                <RemoveIcon
                    onClick={() => {
                        deleteItem(
                            index,
                            sizes,
                            "sizes"
                        );
                    }}
                >
                    <LineCloseIcon stroke="white" />
                </RemoveIcon>
            </NewSize>
        );
    });
}
