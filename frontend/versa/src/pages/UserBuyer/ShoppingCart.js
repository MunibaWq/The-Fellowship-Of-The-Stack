import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProductByID } from "../../axios/gets";
import CheckoutButton from "../../components/Cart/checkoutButton";
import { Error, Input } from "../../components/Reusable/Input";
import {
    changeQuantity,
    removeFromCart,
    setCartInput,
    updateCart,
} from "../../redux/actions/Cart";
import axios from "axios";
import { setFormErrors } from "../../redux/actions/Errors";
import { setFormInputs } from "../../redux/actions/Forms";
import QuantityInput from "../../components/Cart/QuantityInput";
import Button from "../../components/Reusable/Button";
import { RefreshIcon } from "../../images/icons";
import theme from "../../components/Reusable/Colors";
import RadioButton from "../../components/Reusable/RadioButton";
import FreeDelivery from "../../components/Cart/FreeDelivery";
const ShoppingCart = () => {
    // const dispatch = useDispatch();
    const [preference, setPreference] = useState(null);
    const cart = useSelector(state => state.cart);
    const error = useSelector(state => state.formErrors.cart.form);
    const [cartItems, setCartItems] = useState();
    const [needToUpdate, setNeedToUpdate] = useState();
    const dispatch = useDispatch();
    const calcCartTotal = () => {
        if (!cartItems) return 0;
        const total = cartItems.reduce((total, cartItem) => {
            return total + cartItem.itemPrice * cartItem.itemQuantity;
        }, 0);
        return total.toFixed(2);
    };

    useEffect(
        () => {
            async function checkStock(id, colour, size) {
                let newQuantity = size[1];
                const response = await axios.get(
                    `/stock/getByVariation/${id}/${colour[0]}/${size[0]}`
                );
                if (response.data[0].quantity < size[1]) {
                    newQuantity = response.data[0].quantity;
                    dispatch(
                        changeQuantity(id, colour[0], size[0], newQuantity)
                    );
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
                let cartContents = [];
                for (let product of Object.entries(cart)) {
                    console.log("product", product);
                    const res = await getProductByID(product[0]);
                    console.log("response from getProdByID", res);
                    for (let colour of Object.entries(product[1])) {
                        for (let size of Object.entries(colour[1])) {
                            size[1] = await checkStock(res.id, colour, size);

                            const variation = `${res.title} - ${colour[0]} - ${
                                size[0]
                            }`;
                            const itemQuantity = size[1];
                            const itemPrice =
                                +res.price +
                                +res.sizes.filter(
                                    //grab the additional price for the size
                                    sizeOp => sizeOp.label === size[0]
                                )[0].price;
                            const thumbnail = res.thumbnail;
                            dispatch(
                                setCartInput(
                                    {
                                        variation,
                                        itemQuantity,
                                        itemPrice,
                                        thumbnail,
                                        productID: res.id,
                                        colour: colour[0],
                                        size: size[0],
                                        artistID: res.artist_id,
                                    },
                                    itemQuantity
                                )
                            );
                            cartContents.push({
                                variation,
                                itemQuantity,
                                itemPrice,
                                thumbnail,
                                productID: res.id,
                                colour: colour[0],
                                size: size[0],
                                artistID: res.artist_id,
                            });
                        }
                    }
                }

                return cartContents;
            };
            getCartContents().then(res => setCartItems(res));
        },
        [cart]
    );
    useEffect(() => {
        return () => {
            dispatch(setFormErrors("cart", ""));
        };
    }, []);
    // console.log(cart)

    function deliveryFee() {
        const total = calcCartTotal();
        if (isNaN(total)) {
            return;
        }
        if (total >= 100) {
            return "Free";
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
                            <div style={{ gridColumn: "1 / 3" }}>Item</div>

                            <div>Quantity</div>
                            <Price>Each</Price>
                            <Price>Total</Price>
                        </CartItem>
                        {cartItems &&
                            cartItems.map(cartItem => {
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

                                        <div>
                                            <QuantityInput
                                                cartItem={cartItem}
                                            />
                                        </div>
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
                                    setNeedToUpdate(true);
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
                            <></>
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
                                          10
                                      ).toLocaleString("us-US", {
                                          style: "currency",
                                          currency: "USD",
                                      })}
                            </Price>
                        </CartItem>
                    </>
                ) : (
                    <div style={{ marginTop: "10px" }}>No items in cart</div>
                )}

                <RadioButton
                    preference={preference}
                    setPreference={setPreference}
                />
            </Cart>
            {cartItems &&
                cartItems.length > 0 && (
                    <CheckoutButton
                        items={cartItems}
                        artistName="Versa"
                        price={
                            preference === "delivery"
                                ? (calcCartTotal() * 1.05).toFixed(2) + 10
                                : (calcCartTotal() * 1.05).toFixed(2)
                        }
                    />
                )}
        </Container>
    );
};
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
