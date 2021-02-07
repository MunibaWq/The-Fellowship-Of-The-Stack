import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getProductByID } from "../../axios/gets";
import CheckoutButton from "../../components/Stripe/checkoutButton";

const ShoppingCart = () => {
    // const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [cartItems, setCartItems] = useState();
    const calcCartTotal = () => {
        if (!cartItems) return 0;
        const total = cartItems.reduce((total, cartItem) => {
            return total + cartItem.itemPrice * cartItem.itemQuantity;
        },0);
        return total.toFixed(2)
    };
    useEffect(() => {
        const getCartContents = async () => {
            let cartContents = [];
            for (let product of Object.entries(cart)) {
                const res = await getProductByID(product[0]);
                Object.entries(product[1]).forEach((colour) => {
                    Object.entries(colour[1]).forEach((size) => {
                        const variation = `${res.title} - ${colour[0]} - ${size[0]}`;
                        const itemQuantity = size[1];
                        console.log(res.sizes);
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
                        });
                    });
                });
            }
            return cartContents;
        };
        getCartContents().then((res) => setCartItems(res));
    }, [cart]);
    return (
        <Container>
            <h1>ShoppingCart</h1>
            <Cart>
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
                                <div>{cartItem.itemQuantity}</div>
                                <Price>{(cartItem.itemPrice).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</Price>
                                <Price>
                                    {(cartItem.itemPrice * cartItem.itemQuantity).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}
                                </Price>
                            </CartItem>
                        );
                    })}
                <CartItem>
                    <div style={{ gridColumn: "3 / 5" }}>Subtotal:</div>
                    <Price>{(calcCartTotal()).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</Price>
                </CartItem>
                <CartItem>
                    <div style={{ gridColumn: "3 / 5" }}>GST (5%):</div>
                    <Price>{(calcCartTotal() * 0.05).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</Price>
                </CartItem>
                <CartItem>
                    <div style={{ gridColumn: "3 / 5" }}>Total:</div>
                    <Price>{(calcCartTotal() * 1.05).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</Price>
                </CartItem>
            </Cart>
            <CheckoutButton artistName="Versa" price={(calcCartTotal() * 1.05).toFixed(2)} />
        </Container>
    );
};
const Price = styled.div`
    text-align: right;
`;
const Cart = styled.div`
    display: grid;
    grid-auto-rows: 50px;
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
