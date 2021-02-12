import React from "react";
import Button from "../Reusable/Button";
import { Modal, ModalTitle } from "../Reusable/Modal";
import axios from "axios";
import styled from "styled-components";

const deleteItem = async (id) => {
    let url = `/api/products/delete/${id}`;
    const resp = await axios.delete(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    console.log(resp);
};

export function DeleteProductModal({ display, value, setter, id }) {
    return (
        <ModalCenter disp={display}>
            <Modal>
                <ModalTitle>
                    Are you SURE you want to delete this product?
                </ModalTitle>
                <Button
                    onClick={() => {
                        if (value) {
                            setter(false);
                        } else {
                            setter(true);
                        }
                    }}>
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
                    }}>
                    Accept
                </Button>
            </Modal>
        </ModalCenter>
    );
}

let ModalCenter = styled.div`
    display: ${(props) => props.disp};
    top: 50%;
    position: fixed;
    width: "max-content";
`;
