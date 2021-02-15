import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCart, getProductByID } from "../../axios/gets";
import CheckoutButton from "../../components/Cart/checkoutButton";
import { Error } from "../../components/Reusable/Input";
import {
    changeQuantity,
    setCartInput,
    updateCart,
} from "../../redux/actions/Cart";
import axios from "axios";
import { setFormErrors } from "../../redux/actions/Errors";
import Button from "../../components/Reusable/Button";
import { AddIcon, LineCloseIcon, MinusIcon, RefreshIcon } from "../../images/icons";
import theme from "../../components/Reusable/Colors";
import RadioButton from "../../components/Reusable/RadioButton";
import FreeDelivery from "../../components/Cart/FreeDelivery";
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
    console.log(preference, "this is the preference");
    useEffect(() => {
        async function checkStock(id, colour, size) {
            let newQuantity = size[1];
            const response = await axios.get(
                `/stock/getByVariation/${id}/${colour[0]}/${size[0]}`
            );
            if (response.data[0].quantity < size[1]) {
                newQuantity = response.data[0].quantity;
                dispatch(changeQuantity(id, colour[0], size[0], newQuantity));
                dispatch(
                    setFormErrors(
                        "cart",
                        "Some order quantities have been reduced to match stock available"
                    )
                );
            }
            return newQuantity;
        }
        const getCartContents = async () => {
            const cartContents = await getCart();
            let cc = cartContents.map((item) => {
                let sizePrice = item.sizes
                    .filter((size) => {
                        return size === item.size;
                    })
                    .map((size) => size.price);
                return {
                    itemPrice: +item.price + +sizePrice,
                    itemQuantity: item.quantity,
                    variation: `${item.title} ${item.colour} ${item.size}`,
                    thumbnail: item.thumbnail,
                };
            });
            console.log("cartContents", cc);
            return cc;
        };
        getCartContents().then((res) => setCartItems(res));
    }, [cart]);
    useEffect(() => {
        return () => {
            dispatch(setFormErrors("cart", ""));
        };
    }, []);
    // console.log(cart)

    function deliveryFee() {
        const total = calcCartTotal();
        console.log(total, "this is the total");
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
        <Container>
            <h1>Your cart {<FreeDelivery total={calcCartTotal()} />}</h1>
            <TooMany>{error}</TooMany>
            <Cart>
                {cartItems && cartItems.length > 0 ? (
                    <>
                        <CartItem>
                            <div style={{ gridColumn: "1/3" }}>Item</div>

                            <div>Quantity</div>
                            <Price>Each</Price>
                            <Price>Total</Price>
                        </CartItem>
                        {cartItems &&
                            cartItems.map((cartItem) => {
                                return (
                                    <CartItem>
                                        <img
                                            src={
                                                cartItem.thumbnail
                                                    ? "https://versabucket.s3.us-east-2.amazonaws.com/images/" +
                                                      cartItem.thumbnail +
                                                      ".jpeg"
                                                    : ""
                                            }
                                            alt={cartItem.variation}
                                        />
                                        <div>{cartItem.variation}</div>

                                        <QuantityInput>
                                            <div>
                                                <MinusIcon width={21} height={21} stroke="#444"/>
                                        </div>
                                            {cartItem.itemQuantity}
                                            <div>
                                            <AddIcon width={21} height={21} stroke="#444"/>
                                            </div>
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
                        <CartItem>
                            <Button
                                tertiary
                                style={{
                                    gridColumn: "4 / 6",
                                    placeSelf: "end",
                                    marginRight: "0px",
                                }}
                                onClick={() => {
                                    dispatch(updateCart());
                                }}>
                                <RefreshIcon stroke={theme.primary} /> Update
                                Cart
                            </Button>
                        </CartItem>
                        <CartItem>
                            <div style={{ gridColumn: "3 / 5" }}>Subtotal:</div>
                            <Price>
                                {calcCartTotal().toLocaleString("us-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </Price>
                        </CartItem>
                        <CartItem>
                            <div style={{ gridColumn: "3 / 5" }}>GST (5%):</div>
                            <Price>
                                {(calcCartTotal() * 0.05).toLocaleString(
                                    "us-US",
                                    {
                                        style: "currency",
                                        currency: "USD",
                                    }
                                )}
                            </Price>
                        </CartItem>
                        {preference === "delivery" ? (
                            <CartItem>
                                <div style={{ gridColumn: "3 / 5" }}>
                                    Delivery:
                                </div>
                                <Price>{deliveryFee()}</Price>
                            </CartItem>
                        ) : (
                            <CartItem>
                                <div style={{ gridColumn: "3 / 5" }}></div>
                            </CartItem>
                        )}
                        <CartItem>
                            <div style={{ gridColumn: "3 / 5" }}>Total:</div>
                            <Price>
                                {preference !== "delivery"
                                    ? (calcCartTotal() * 1.05).toLocaleString(
                                          "us-US",
                                          {
                                              style: "currency",
                                              currency: "USD",
                                          }
                                      )
                                    : (
                                          calcCartTotal() * 1.05 +
                                          deliveryFee()
                                      ).toLocaleString("us-US", {
                                          style: "currency",
                                          currency: "USD",
                                      })}
                            </Price>
                        </CartItem>
                        <p>*all sales are final</p>
                    </>
                ) : (
                    <div style={{ marginTop: "10px" }}>No items in cart</div>
                )}
                <CartItem>
                    <RadioButton
                        preference={preference}
                        setPreference={setPreference}
                        instructions={extraInstructions}
                        setInstructions={setExtraInstructions}
                    />
                </CartItem>
            </Cart>
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
        </Container>
    );
};
const QuantityInput = styled.div`
    display: flex;
    justify-content: space-around;
`
const TooMany = styled(Error)`
    margin: 0;
    padding: 0;
`;
const Price = styled.div`
    text-align: right;
`;
const Cart = styled.div`
    display: grid;
    grid-auto-rows: 50px;
    margin: 5px;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2em;
`;
const CartItem = styled.div`
    display: grid;
    grid-template-columns: 60px auto 15% 15% 15%;
    align-items: self-end;
    /* border-bottom: black solid 1px; */
    img {
        width: 50px;
    }
`;
export default ShoppingCart;
