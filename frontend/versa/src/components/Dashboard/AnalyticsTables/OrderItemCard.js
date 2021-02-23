import React from "react";
import styled from "styled-components";

const OrderItemCard = ({ order }) => {
    const { title, color, quantity, size } = order;

    return (
        <Details>
            <h4>{title}</h4>
            <RowContainer>
                <Size>{size === "O" ? "One Size" : size}</Size>

                <p>{color === "O" ? "One Colour" : color}</p>
            </RowContainer>
            <QuantityStatus>
                <Quantity>
                    <p>{quantity}</p>
                </Quantity>
            </QuantityStatus>
        </Details>
    );
};

export default OrderItemCard;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    margin-bottom: 8px;
`;

const Size = styled.p`
    :after {
        content: ", ";
    }
`;
const Quantity = styled.p`
    font-size: 2em;
    :after {
        content: none;
    }
`;

const QuantityStatus = styled(RowContainer)`
    justify-content: space-between;
    width: 100%;
`;

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px 20px 20px;
`;
const ItemDetails = styled.div`
    h3 {
        font-weight: 700;
        margin-bottom: 0.8em;
    }
`;

const Variation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    :first-of-type {
        margin-bottom: 0.3em;
    }

    h4 {
        margin-right: 8px;
        font-weight: 700;
    }
    p {
        margin: 0;
        line-height: 0;
    }
`;
