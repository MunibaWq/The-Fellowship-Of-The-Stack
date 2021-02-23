import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCart, getProductByID } from "../axios/gets";
import CheckoutButton from "../components/Cart/checkoutButton";
import { Error } from "../components/Reusable/Input";
import { updateCart } from "../redux/actions/Cart";
import { setFormErrors } from "../redux/actions/Errors";
import { AddIcon, MinusIcon } from "../images/icons";
import RadioButton from "../components/Reusable/RadioButton";
import FreeDelivery from "../components/Cart/FreeDelivery";
import { modifyCart } from "../axios/puts";
import PageContainer from "../components/Redesign/Reusable/PageContainer";
import { StyledLink } from "../components/Redesign/Reusable/Link";
import Header from "../components/Redesign/Reusable/Header";
import { Link } from "react-router-dom";
import Button from "../components/Redesign/Reusable/Button";
const session = window.localStorage.getItem("session");
const ShoppingCart = () => {
    // const dispatch = useDispatch();
    const [preference, setPreference] = useState("delivery");
    const [extraInstructions, setExtraInstructions] = useState("");
    const cart = useSelector((state) => state.cart);
    const error = useSelector((state) => state.formErrors.cart.form);
    const [cartItems, setCartItems] = useState();
    const dispatch = useDispatch();
    const calcCartTotal = () => {
        if (!cartItems) return 0;
        const total = cartItems.reduce((total, cartItem) => {
            return total + cartItem.itemPrice * cartItem.itemQuantity;
        }, 0);
        return total.toFixed(2);
    };
    const calcNumItems = () => {
        if (!cartItems) return 0;
        const total = cartItems.reduce((total, cartItem) => {
            return total + cartItem.itemQuantity;
        }, 0);
        return total;
    };
    const changeQuantity = (cartItem, quantity) => {
        let { id: productID, colour, size } = cartItem;

        modifyCart(
            productID,
            colour,
            size,
            quantity,
            localStorage.getItem("session")
        ).then(() => {
            dispatch(updateCart());
        });
    };
    useEffect(() => {
        const getCartContents = async () => {
            const cartContents = await getCart(session);
            if (cartContents) {
                let cc = cartContents.map((item) => {
                    let sizePrice = item.sizes
                        .filter((size) => {
                            return size.label === item.size;
                        })
                        .map((size) => size.price);
                    if (item.num_left < item.quantity) {
                        item.quantity = item.num_left;
                        dispatch(
                            setFormErrors(
                                "cart",
                                "Some quantities in your cart have been adjusted due to available stock levels"
                            )
                        );
                        modifyCart(
                            item.product_id,
                            item.colour,
                            item.size,
                            item.quantity,
                            session
                        );
                    }
                    return {
                        numLeft: item.num_left,
                        itemPrice: +item.price + +sizePrice[0],
                        itemQuantity: item.quantity,
                        colour: item.colour,
                        size: item.size,
                        variation: `${item.title} ${item.colour} ${item.size}`,
                        thumbnail: item.thumbnail,
                        id: item.product_id,
                    };
                });
                return cc;
            }
            return [];
        };
        getCartContents().then((res) => setCartItems(res));
    }, [cart]);
    useEffect(() => {
        return () => {
            dispatch(setFormErrors("cart", ""));
        };
    }, [dispatch]);
    function deliveryFee() {
        const total = calcCartTotal();
        if (isNaN(total)) {
            return;
        }
        if (total >= 100) {
            return 0;
        } else {
            return 10;
        }
    }

    return (
        <PageContainer>
            <Header
                title="Cart"
                sub={<FreeDelivery total={calcCartTotal()} />}
            />
            <Cart>
                <BasketList>
                    <Bar>
                        <ColumnHeaders>
                            <div><p>Item</p></div>
                            <div></div>
                            <div><p>Quantity</p></div>
                            <Price><p>Price</p></Price>
                            <Price><p>Total</p></Price>
                        </ColumnHeaders>
                    </Bar>

                    <Items>
                        {calcNumItems() === 0 ? (
                            <NoItems>
                                Your cart is currently empty.
                                <StyledLink to="/shop" primary>
                                    Shop Our Featured Artist
                                </StyledLink>
                            </NoItems>
                        ) : (
                            <>
                                {cartItems &&
                                    cartItems.map((cartItem) => {
                                        return (
                                            <CartItem>
                                                <img width="100" height="100"
                                                    src={
                                                        cartItem.thumbnail
                                                            ? "https://versabucket.s3.us-east-2.amazonaws.com/images/" +
                                                              cartItem.thumbnail +
                                                              ".jpeg"
                                                            : ""
                                                    }
                                                    alt={cartItem.variation}
                                                />
                                                <Variation>{cartItem.variation}</Variation>

                                                <QuantityInput>
                                                    {cartItem.itemQuantity >=
                                                    2 ? (
                                                        <ChangeButton
                                                            onClick={() => {
                                                                changeQuantity(
                                                                    cartItem,
                                                                    cartItem.itemQuantity -
                                                                        1
                                                                );
                                                            }}>
                                                            <MinusIcon
                                                                width={21}
                                                                height={21}
                                                                stroke="#444"
                                                            />
                                                        </ChangeButton>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                    <Quantity>
                                                        {cartItem.itemQuantity}
                                                    </Quantity>
                                                    {cartItem.itemQuantity <
                                                    cartItem.numLeft ? (
                                                        <ChangeButton
                                                            onClick={() => {
                                                                changeQuantity(
                                                                    cartItem,
                                                                    cartItem.itemQuantity +
                                                                        1
                                                                );
                                                            }}>
                                                            <AddIcon
                                                                width={21}
                                                                height={21}
                                                                stroke="#444"
                                                            />
                                                        </ChangeButton>
                                                    ) : (
                                                        <div></div>
                                                    )}
                                                </QuantityInput>
                                                <Price>
                                                    {cartItem.itemPrice.toLocaleString(
                                                        "us-US",
                                                        {
                                                            style: "currency",
                                                            currency: "USD",
                                                        }
                                                    )}
                                                </Price>
                                                <Price>
                                                    {(
                                                        cartItem.itemPrice *
                                                        cartItem.itemQuantity
                                                    ).toLocaleString("us-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    })}
                                                </Price>
                                            </CartItem>
                                        );
                                    })}
                            </>
                        )}
                    </Items>
                </BasketList>
                <BasketOrderSummary>
                    <Bar>
                        <p>PLACE YOUR ORDER</p>
                        <NumItems>Items in cart ({calcNumItems()})</NumItems>
                    </Bar>
                    <Items>
                        <DeliveryChoice>
                            <Delivery>
                                <RadioButton
                                    preference={preference}
                                    setPreference={setPreference}
                                    instructions={extraInstructions}
                                    setInstructions={setExtraInstructions}
                                />
                            </Delivery>
                        </DeliveryChoice>
                        <div>
                            <div>
                                <Pay>
                                    <div>Merchandise subtotal</div>
                                    <Price>
                                        {calcCartTotal().toLocaleString(
                                            "us-US",
                                            {
                                                style: "currency",
                                                currency: "USD",
                                            }
                                        )}
                                    </Price>
                                </Pay>
                                <Pay>
                                    <div>GST</div>
                                    <div>
                                        <Price>
                                            {(
                                                calcCartTotal() * 0.05
                                            ).toLocaleString("us-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </Price>
                                    </div>
                                </Pay>
                                <Pay>
                                    <div>Delivery</div>
                                    <div>
                                        {preference === "delivery" && (
                                            <Price>{deliveryFee()}</Price>
                                        )}
                                    </div>
                                </Pay>
                                <Divider />
                                <Pay>
                                    <div>Total</div>
                                    <EstimatedTotalSpan>
                                        <div>
                                            <Price>
                                                {preference !== "delivery"
                                                    ? (
                                                          calcCartTotal() * 1.05
                                                      ).toLocaleString(
                                                          "us-US",
                                                          {
                                                              style: "currency",
                                                              currency: "USD",
                                                          }
                                                      )
                                                    : (
                                                          calcCartTotal() *
                                                              1.05 +
                                                          deliveryFee()
                                                      ).toLocaleString(
                                                          "us-US",
                                                          {
                                                              style: "currency",
                                                              currency: "USD",
                                                          }
                                                      )}
                                            </Price>
                                        </div>
                                    </EstimatedTotalSpan>
                                </Pay>
                            </div>
                            <div>
                                {cartItems && cartItems.length > 0 && (
                                    <CheckoutButton
                                        items={cartItems}
                                        artistName="Versa"
                                        custPref={preference}
                                        custNote={extraInstructions}
                                        price={(calcCartTotal() * 1.05).toFixed(
                                            2
                                        )}></CheckoutButton>
                                )}
                            </div>
                        </div>
                    </Items>
                </BasketOrderSummary>
            </Cart>
            <TooMany>{error}</TooMany>
        </PageContainer>
    );
};
const NoItems = styled.div`
    display: flex;
    flex-direction: column;
    p {
        color: ${(props) => props.theme.black};
    }
`;
const DeliveryChoice = styled.div`
    
`
const Bar = styled.div`
    padding: 20px 40px;
    text-align: center;
    p {
        
        font-weight: 700;
    }
    display: flex;
    justify-content: space-between;
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.lightBlue};
    padding: 20px 40px;
    min-height: calc(100% - 24px);
    justify-content: space-between;
`;
const NumItems = styled.div`
    color: ${(props) => props.theme.lightBlue};
`
const ColumnHeaders = styled.div`
    display: grid;
    grid-template-columns: 100px auto 15% 15% 15%;
    width: 100%;

`
const HItems = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.lightBlue};
    padding: 24px;
    min-height: calc(100% - 24px);
    justify-content: space-between;
`;
const Quantity = styled.div`
    text-align: center;
`;
const Pay = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Divider = styled.div`
    background-color: ${(props) => props.theme.lightBlue};
    height: 20px;
    width: 100%;
`;
const EstimatedTotalSpan = styled.span``;
const BasketOrderSummary = styled.div`
    background: ${(props) => props.theme.black};

    p {
        color: ${(props) => props.theme.lightBlue};
    }
    border-radius: 16px 16px 0 0;
`;
const EmptyBasketP = styled.p`
    color: ${(props) => props.theme.black};
`;
const BasketList = styled.div`
    background: ${(props) => props.theme.black};

    p {
        color: ${(props) => props.theme.lightBlue};
    }
    border-radius: 16px 16px 0 0;
`;
const ChangeButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const QuantityInput = styled.div`
    display: grid;
    grid-template-columns: 33% 33% 33%;
`;
const TooMany = styled(Error)`
    padding: 0;
`;
const Price = styled.span`
    text-align: right;
`;
const Cart = styled.div`
    display: grid;
    grid-template-columns:55% 40%;
    grid-gap: 5%;
    margin-bottom: 2em;
    place-self: stretch;
    margin-top: 24px;
    border-radius: 16px 16px 0 0;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2em;
`;

const CartItem = styled.div`
    display: grid;
    grid-template-columns: 100px auto 15% 15% 15%;
    align-items: center;
    border-bottom: ${props => props.theme.blue} thin solid;
    padding-bottom: 20px;
    
    /* border-bottom: black solid 1px; */
    img {
        width: 100px;
    }
    background-color: ${(props) => props.theme.lightBlue};
`;
const Delivery = styled.div`
    display: flex;
    flex-direction: column;
`;
const Variation = styled.div`
    text-align:center;
`
export default ShoppingCart;
