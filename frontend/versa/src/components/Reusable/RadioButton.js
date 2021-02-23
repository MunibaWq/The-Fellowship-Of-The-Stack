import React from "react";
import styled from "styled-components";
import { SendIcon } from "../../images/icons";
import Button from "../Redesign/Reusable/Button";
import TextArea from "./TextArea";

const RadioButton = ({
    preference,
    setPreference,
    instructions,
    setInstructions,
}) => {
    function selectActive() {
        if (preference === "pickup") {
            return (
                <>
                    Your order will be processed by the artist and you will be
                    notified by email with pickup information.
                    <TextArea setter={setInstructions} getter={instructions} />
                </>
            );
        } else if (preference === "delivery") {
            return (
                <>
                    Your order will be processed by the artist and delivered in
                    24-48 hours
                    <TextArea setter={setInstructions} getter={instructions} />
                </>
            );
        }
    }
    return (
        <>
            <ChoiceContainer>
                <Choice>
                    <DeliveryButton chosen={preference === 'pickup'} secondarySmall onClick={(e) => setPreference("pickup")} >Pickup</DeliveryButton>
                </Choice>
                <Choice>
                    <DeliveryButton chosen={preference === 'delivery'} secondarySmall onClick={(e) => setPreference("delivery")} >Delivery</DeliveryButton>
                </Choice>
            </ChoiceContainer>
            {selectActive()}
        </>
    );
};

export default RadioButton;
const ChoiceContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`;
const DeliveryButton = styled(Button)`
    background-color: ${props=>props.chosen ? props.theme.purple : props.theme.black};
    margin-right: 16px;
`
const Choice = styled.div`
    display: flex;
    align-items: baseline;
    input {
        margin: 5px;
    }
`;
