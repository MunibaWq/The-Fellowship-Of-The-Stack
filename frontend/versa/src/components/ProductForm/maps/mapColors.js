import React from "react";
import { LineCloseIcon } from "../../../images/icons";
import {
    ColorOption,
    ColorPreview,
    RemoveIcon
} from "../styledComponents";
import { deleteItem } from "../functions/deleteItem";
import { setFormInputs } from "../../../redux/actions/Forms";

export function mapColors(colours,dispatch) {
   
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
                            setFormInputs,
                            dispatch,
                            'colours'
                        );
                    }}
                >
                    <LineCloseIcon stroke="black" />
                </RemoveIcon>
            </ColorOption>
        );
    });
}
