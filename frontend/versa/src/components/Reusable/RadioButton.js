import React, { useState } from "react";
import styled from "styled-components";
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
                    <h3>
                        Your order will be processed by the artist and you will
                        be notified by email with pickup information.
                    </h3>
                    <TextArea setter={setInstructions} getter={instructions} />
                </>
            );
        } else if (preference === "delivery") {
            return (
                <>
                    <h3>
                        Your order will be processed by the artist and delivered
                        in 24-48 hours
                    </h3>
                    <TextArea setter={setInstructions} getter={instructions} />
                </>
            );
        }
    }
    return (
        <>
            <ChoiceContainer>
                <Choice>
                    <input
                        id="pickup"
                        name="orderPref"
                        type="radio"
                        value="pickup"
                        onChange={(e) => setPreference(e.target.value)}
                    />
                    <label htmlFor="pickup">Pickup</label>
                </Choice>
                <Choice>
                    <input
                        checked={preference === "pickup" ? false : true}
                        id="delivery"
                        name="orderPref"
                        type="radio"
                        value="delivery"
                        onChange={(e) => setPreference(e.target.value)}
                    />
                    <label htmlFor="delivery">Delivery</label>
                </Choice>
            </ChoiceContainer>
            {selectActive()}
        </>
    );
};

export default RadioButton;
const ChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const Choice = styled.div`
    display: flex;
    align-items: baseline;
    input{
        margin:5px;
    }
`;
