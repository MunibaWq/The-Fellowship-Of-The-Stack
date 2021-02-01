import React from "react";
import { LineCloseIcon } from "../../../images/icons";
import {
    ColorOption,
    ColorPreview,
    RemoveIcon
} from "../styledComponents";
import { deleteItem } from "../functions/deleteItem";

export function mapColors(colours) {
    return colours.map((color, index) => {
        return (
            <ColorOption>
                <ColorPreview color={color.value} />
                {color.label}
                <RemoveIcon
                    onClick={() => {
                        deleteItem(
                            index,
                            colours,
                            "colours"
                        );
                    }}
                >
                    <LineCloseIcon stroke="black" />
                </RemoveIcon>
            </ColorOption>
        );
    });
}
