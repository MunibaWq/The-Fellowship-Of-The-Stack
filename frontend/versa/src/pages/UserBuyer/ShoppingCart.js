import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProductByID } from "../../axios/gets";
import CheckoutButton from "../../components/Stripe/checkoutButton";
import { Error, Input } from "../../components/Reusable/Input";
import  Button  from '../../components/Reusable/Button'
import { changeQuantity, removeFromCart } from "../../redux/actions/Cart";
import axios from "axios";
import { setFormErrors } from "../../redux/actions/Errors";
const ShoppingCart = () => {
    // const dispatch = useDispatch();
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
    async function checkStock(id, colour, size) {
        
        let newQuantity = size[1]
        const response = await axios.get(
            `/stock/getByVariation/${id}/${colour[0]}/${size[0]}`
        );
        if (response.data[0].quantity < size[1]) {
            newQuantity = response.data[0].quantity;
            dispatch(
                changeQuantity(
                    id,
                    colour[0],
                    size[0],
                    newQuantity
                )
            );
            dispatch(
                setFormErrors(
                    "cart",
                    "Some order quantities have been reduced to match stock available"
                )
            );
        }
        return newQuantity
    }
    useEffect(() => {
        const getCartContents = async () => {
            let cartContents = [];
            for (let product of Object.entries(cart)) {
                const res = await getProductByID(product[0]);
                for (let colour of Object.entries(product[1])) {
                    console.log(colour);
                    for (let size of Object.entries(colour[1])) {
                        size[1] = await checkStock(res.id, colour, size);

                        const variation = `${res.title} - ${colour[0]} - ${size[0]}`;
                        const itemQuantity = size[1];
                        const itemPrice =
                            res.price +
                            +res.sizes.filter(
                                //grab the additional price for the size
                                (sizeOp) => sizeOp.label === size[0]
                            )[0].price;
                        const thumbnail = res.thumbnail;
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
        getCartContents().then((res) => setCartItems(res));
        
    }, [cart]);
    useEffect(() => {
        return () => {
            dispatch(setFormErrors('cart',''))
        } 
    },[])
    return (
        <Container>
            <h1>Your cart</h1>
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

                                        <div>
                                            <Input
                                                value={
                                                    cart[cartItem.productID][
                                                        cartItem.colour
                                                    ][cartItem.size]
                                                }
                                                type="number"
                                                min={0}
                                                step={1}
                                                onChange={(e) => {
                                                    console.log(
                                                        "e.target.value",
                                                        e.target.value
                                                    );
                                                    if (
                                                        e.target.value === "0"
                                                    ) {
                                                        dispatch(
                                                            removeFromCart(
                                                                cartItem.productID,
                                                                cartItem.colour,
                                                                cartItem.size,
                                                                cartItem.itemQuantity
                                                            )
                                                        );
                                                    } else {
                                                        dispatch(
                                                            changeQuantity(
                                                                cartItem.productID,
                                                                cartItem.colour,
                                                                cartItem.size,
                                                                +e.target.value
                                                            )
                                                        );
                                                    }
                                                    console.log(cart);
                                                }}
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
                        <CartItem>
                            <div style={{ gridColumn: "3 / 5" }}>Total:</div>
                            <Price>
                                {(calcCartTotal() * 1.05).toLocaleString(
                                    "us-US",
                                    {
                                        style: "currency",
                                        currency: "USD",
                                    }
                                )}
                            </Price>
                        </CartItem>
                    </>
                ) : (
                    <div style={{marginTop:"10px"}}>No items in cart</div>
                )}
            </Cart>
            {cartItems && cartItems.length > 0 && (
                <CheckoutButton
                    items={cartItems}
                    artistName="Versa"
                    price={(calcCartTotal() * 1.05).toFixed(2)}
                ></CheckoutButton>
            )}
        </Container>
        
    );
};
const TooMany = styled(Error)`
    margin:0;
    padding:0;
`
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


