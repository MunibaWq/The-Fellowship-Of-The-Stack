import React from "react";
import styled from "styled-components";
import Icons from "../Reusable/Icons";

const VariationsList = (props, colors) => {
    switch (props.type) {
        case "colour":
            return (
                <NewColourContainer>
                    {colors.length > 0 &&
                        colors.map((label, index) => {
                            return (
                                <CurrentColour>
                                    <ColourPreview colour={label.value} />
                                    <p>{label.label}</p>
                                    <div
                                        onClick={() =>
                                            deleteItem(index, colors)
                                        }
                                    >
                                        <Icons lineClose />
                                    </div>
                                </CurrentColour>
                            );
                        })}
                </NewColourContainer>
            );
    }
};

export default VariationsList;

const NewColourContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0px;
`;

const CurrentColour = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: #c5c3ff;
    margin: 8px;
    p {
        margin-right: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
`;

const ColourPreview = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.colour};
`;
