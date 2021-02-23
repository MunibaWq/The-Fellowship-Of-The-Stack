import React from "react";
import styled from "styled-components";

const OrderItemCard = ({ order }) => {
    const { title, color, quantity, size } = order;

    return (
        <Details>
            <h4>{title}</h4>
            <RowContainer>
                <Size>{order.size === "O" ? "One Size" : order.size}</Size>
                <p>{order.color === "O" ? "One Colour" : order.color}</p>
            </RowContainer>
            <QuantityStatus>
                <Quantity>
                    <p>{quantity}</p>
                </Quantity>
            </QuantityStatus>
            {/* <ItemDetails>
                <h3>{title}</h3>
                <Variation>
                    <h4>Colour:</h4>

                    <p>{color}</p>
                </Variation>
                <Variation>
                    <h4>Size:</h4>

                    <p>{size}</p>
                </Variation>
            </ItemDetails> */}
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

// const Card = styled.article`

//     border-radius: 15px;
//     padding: 1em;
//     height: fit-content;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     background: #fff;
//     box-shadow: 3px 3px 10px rgba(27, 49, 66, 0.13);
//     border-radius: 15px;
//     :hover {
//         box-shadow: 7px 7px 30px rgba(27, 49, 66, 0.13);
//     }

//     transition: 0.3s;
// `;

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

// const Quantity = styled.div`
//     padding: 1em;
//     p {
//         font-size: 60px;
//     }
// `;

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
