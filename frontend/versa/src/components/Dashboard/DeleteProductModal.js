import React, { useState } from "react";
import Button from "../Reusable/Button";
import { Modal, ModalTitle } from "../Reusable/Modal";
import { setVisible } from "../../redux/actions/Modals";
import axios from "axios";
const deleteItem = async (id) => {
    let url = `/products/delete/${id}`;
    const resp = await axios.delete(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    console.log(resp);
};

export function DeleteProductModal({ display, value, setter, id }) {
    return (
        <Modal width="fit-content" style={{ display: `${display}` }}>
            <ModalTitle>
                Are you SURE you want to delete this product?
            </ModalTitle>
            <Button
                onClick={() => {
                    {
                        value ? setter(false) : setter(true);
                    }
                }}
            >
                Cancel
            </Button>
            <Button
                onClick={() => {
                    if (value) {
                        setter(false);
                    } else {
                        setter(true);
                    }
                    deleteItem(id);
                }}
            >
                Accept
            </Button>
        </Modal>
    );
}
