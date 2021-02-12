import React from "react";
import Button from "../Reusable/Button";
import { Modal, ModalTitle } from "../Reusable/Modal";

import styled from "styled-components";
import { deleteArtistEvent } from "../../axios/deletes";

export function DeleteEventModal({ display, value, setter, id }) {
    return (
        <ModalCenter disp={display}>
            <Modal>
                <ModalTitle>
                    Are you SURE you want to delete this Event?
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
                        deleteArtistEvent(id);
                        window.location.reload(false)
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
