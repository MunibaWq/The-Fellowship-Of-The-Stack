import React from "react";
import Button from "../Reusable/Button";
import { Input } from "../Reusable/Input";
import { Modal, ModalTitle } from "../Reusable/Modal";
import { setVisible } from "../../redux/actions/Modals";

export function SizeModal({ modalToggle, dispatch, setSizeValue }) {
    return modalToggle.sizes && (
        <Modal width="fit-content">
            <ModalTitle>Add A Size Option</ModalTitle>
            <select
                onChange={(e) => {
                    if (e.target.value === "N") {
                        dispatch(
                            setVisible(
                                "productForm",
                                "numericalSize",
                                true
                            )
                        );
                    } else {
                        dispatch(
                            setVisible(
                                "productForm",
                                "numericalSize",
                                false
                            )
                        );
                    }
                }}
                name="sizes"
                id="sizeDropDown"
            >
                <option value="XS">Extra Small</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
                <option value="XXL">Extra Extra Large</option>
                <option value="N">Numeric Size</option>
            </select>
            {modalToggle.numericalSize ? (
                <>
                    <label>Enter a numerical size:</label>
                    <Input
                        type="number"
                        id="sizeLabelToAdd"
                        min="1"
                        max="100" />
                </>
            ) : (
                    ""
                )}
            <label>Additional cost for size</label>
            <Input label="Size Label" id="priceToAdd" />
            <Button
                onClick={() => {
                    dispatch(
                        setVisible(
                            "productForm",
                            "sizes",
                            false
                        )
                    );
                    dispatch(
                        setVisible(
                            "productForm",
                            "numericalSize",
                            false
                        )
                    );
                }}
            >
                Cancel
            </Button>
            <Button
                primary
                onClick={() => {
                    setSizeValue();
                    dispatch(
                        setVisible(
                            "productForm",
                            "sizes",
                            false
                        )
                    );
                    dispatch(
                        setVisible(
                            "productForm",
                            "numericalSize",
                            false
                        )
                    );
                }}
            >
                Add Option
            </Button>
        </Modal>
    );
}
