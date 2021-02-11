import React, { useState } from "react";
import Button from "../Reusable/Button";
import { Modal, ModalTitle } from "../Reusable/Modal";
import { setVisible } from "../../redux/actions/Modals";

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
                        {
                            value ? setter(false) : setter(true);
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
