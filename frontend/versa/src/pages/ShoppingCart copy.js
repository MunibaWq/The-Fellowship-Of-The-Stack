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
import { StyledLink } from "../components/Reusable/Link";
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

            <div data-comp="BasketList ">
                <h2
                    class="css-mpdjkv eanm77i0"
                    data-comp="StyledComponent BaseComponent ">
                    Items in basket (<span data-at="bsk_items_count">2</span>)
                </h2>
                <div
                    class="css-mqaoeo eanm77i0"
                    data-comp="StyledComponent BaseComponent ">
                    <div>
                        <div
                            data-at="product_refinement"
                            data-comp="TestTarget BasketListItem BasketListItem "
                            class="undefined tt-0">
                            <div
                                class="css-qchw6g eanm77i0"
                                data-comp="StyledComponent BaseComponent ">
                                <a
                                    href="/product/silk-pillowcase-standard-queen-P402944"
                                    data-at="product_img_link"
                                    class="css-13o7eu2 eanm77i0"
                                    data-comp="StyledComponent BaseComponent ">
                                    <div
                                        class="css-8drrpk eanm77i0"
                                        data-comp="ProductImage StyledComponent BaseComponent ">
                                        <picture class="css-yq9732">
                                            <source
                                                media="(min-width: 768px)"
                                                srcset="/productimages/sku/s1771260-main-zoom.jpg?imwidth=97 1x, /productimages/sku/s1771260-main-zoom.jpg?imwidth=194 2x"
                                            />
                                            <img
                                                class="css-1rovmyu eanm77i0"
                                                src="/productimages/sku/s1771260-main-zoom.jpg?imwidth=80"
                                                srcset="/productimages/sku/s1771260-main-zoom.jpg?imwidth=80 1x, /productimages/sku/s1771260-main-zoom.jpg?imwidth=160 2x"
                                                alt="Slip Silk Pillowcase - Standard/Queen Pink"
                                                data-comp="Image StyledComponent BaseComponent "
                                            />
                                        </picture>
                                    </div>
                                </a>
                                <div
                                    class="css-qtocz6 eanm77i0"
                                    data-comp="StyledComponent BaseComponent ">
                                    <div>
                                        <p
                                            class="css-1ubh8j3 eanm77i0"
                                            data-comp="StyledComponent BaseComponent ">
                                            <a
                                                href="/product/silk-pillowcase-standard-queen-P402944"
                                                class="css-7c97or eanm77i0"
                                                data-comp="StyledComponent BaseComponent ">
                                                <strong data-at="bsk_sku_brand">
                                                    Slip
                                                </strong>
                                                <br />
                                                <span data-at="bsk_sku_name">
                                                    Silk Pillowcase -
                                                    Standard/Queen
                                                </span>
                                            </a>
                                        </p>
                                        <div
                                            class="css-1p4nz1q eanm77i0"
                                            data-comp="StyledComponent BaseComponent ">
                                            <div
                                                data-at="sku_size"
                                                class="css-1ehg1jw eanm77i0"
                                                data-comp="SizeAndItemNumber StyledComponent BaseComponent ">
                                                ITEM 1771260
                                            </div>
                                            <span
                                                data-at="item_variation_type"
                                                class="css-v1yfvi eanm77i0"
                                                data-comp="ProductVariation StyledComponent BaseComponent ">
                                                COLOR: Pink
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        class="css-12h1t8r eanm77i0"
                                        data-comp="Flex StyledComponent BaseComponent ">
                                        <div
                                            class="css-uw9fwm eanm77i0"
                                            data-comp="StyledComponent BaseComponent ">
                                            <div>
                                                <label
                                                    for="qty_1771260"
                                                    class="css-vkf4am">
                                                    Quantity
                                                </label>
                                                <div
                                                    class="css-br0dac"
                                                    data-comp="Select ">
                                                    <div class="css-1w7kjyz">
                                                        <select
                                                            data-at="sku_qty"
                                                            id="qty_1771260"
                                                            class="css-mjt39o">
                                                            <option value="1">
                                                                1
                                                            </option>
                                                            <option value="2">
                                                                2
                                                            </option>
                                                            <option value="3">
                                                                3
                                                            </option>
                                                            <option value="4">
                                                                4
                                                            </option>
                                                            <option value="5">
                                                                5
                                                            </option>
                                                            <option value="6">
                                                                6
                                                            </option>
                                                            <option value="7">
                                                                7
                                                            </option>
                                                            <option value="8">
                                                                8
                                                            </option>
                                                            <option value="9">
                                                                9
                                                            </option>
                                                            <option value="10">
                                                                10
                                                            </option>
                                                        </select>
                                                        <span
                                                            class="css-1t1fsr0 eanm77i0"
                                                            direction="down"
                                                            data-comp="Arrow StyledComponent "></span>
                                                        <svg
                                                            aria-hidden="true"
                                                            viewBox="0 0 24 24"
                                                            class="css-169auvb eanm77i0"
                                                            data-comp="Icon StyledComponent "
                                                            style="display: none;">
                                                            <g>
                                                                <circle
                                                                    fill="#fff"
                                                                    cx="12"
                                                                    cy="18.667"
                                                                    r="1.333"></circle>
                                                                <path
                                                                    d="M12 5.333c-.8 0-1.333.534-1.333 1.334v8c0 .8.533 1.333 1.333 1.333.8 0 1.333-.533 1.333-1.333v-8c0-.8-.533-1.334-1.333-1.334z"
                                                                    fill="#fff"></path>
                                                                <path
                                                                    d="M12 0C5.333 0 0 5.333 0 12s5.333 12 12 12 12-5.333 12-12S18.667 0 12 0zm0 20c-.8 0-1.333-.533-1.333-1.333 0-.8.533-1.334 1.333-1.334.8 0 1.333.534 1.333 1.334S12.8 20 12 20zm1.333-5.333c0 .8-.533 1.333-1.333 1.333-.8 0-1.333-.533-1.333-1.333v-8c0-.8.533-1.334 1.333-1.334.8 0 1.333.534 1.333 1.334v8z"
                                                                    fill="currentColor"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="css-0"
                                                    data-at="bsk_sku_price">
                                                    $119.00
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="css-1ynwnhy eanm77i0"
                                            data-comp="StyledComponent BaseComponent ">
                                            <button
                                                data-at="bsk_sku_love"
                                                type="button"
                                                class="css-pjvscc eanm77i0"
                                                data-comp="StyledComponent BaseComponent ">
                                                Move to Loves
                                            </button>
                                            <span
                                                class="css-184dof0 eanm77i0"
                                                data-comp="StyledComponent BaseComponent ">
                                                |
                                            </span>
                                            <button
                                                data-at="bsk_sku_remove"
                                                type="button"
                                                class="css-pjvscc eanm77i0"
                                                data-comp="StyledComponent BaseComponent ">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            class="css-1up1km7 eanm77i0"
                            data-comp="Divider StyledComponent "></div>
                        <div
                            data-at="product_refinement"
                            data-comp="TestTarget BasketListItem BasketListItem "
                            class="undefined tt-1">
                            <div
                                class="css-qchw6g eanm77i0"
                                data-comp="StyledComponent BaseComponent ">
                                <a
                                    href="/product/squalane-vitamin-c-rose-oil-P416563"
                                    data-at="product_img_link"
                                    class="css-13o7eu2 eanm77i0"
                                    data-comp="StyledComponent BaseComponent ">
                                    <div
                                        class="css-8drrpk eanm77i0"
                                        data-comp="ProductImage StyledComponent BaseComponent ">
                                        <picture class="css-yq9732">
                                            <source
                                                media="(min-width: 768px)"
                                                srcset="/productimages/sku/s2382166-main-zoom.jpg?pb=2020-03-sephora-clean-2019&amp;imwidth=97 1x, /productimages/sku/s2382166-main-zoom.jpg?pb=2020-03-sephora-clean-2019&amp;imwidth=194 2x"
                                            />
                                            <img
                                                class="css-1rovmyu eanm77i0"
                                                src="/productimages/sku/s2382166-main-zoom.jpg?pb=2020-03-sephora-clean-2019&amp;imwidth=80"
                                                srcset="/productimages/sku/s2382166-main-zoom.jpg?pb=2020-03-sephora-clean-2019&amp;imwidth=80 1x, /productimages/sku/s2382166-main-zoom.jpg?pb=2020-03-sephora-clean-2019&amp;imwidth=160 2x"
                                                alt="Biossance Squalane + Vitamin C Rose Oil Original 1.01 oz/ 30 mL Clean at Sephora Clean at Sephora"
                                                data-comp="Image StyledComponent BaseComponent "
                                            />
                                        </picture>
                                    </div>
                                </a>
                                <div
                                    class="css-qtocz6 eanm77i0"
                                    data-comp="StyledComponent BaseComponent ">
                                    <div>
                                        <p
                                            class="css-1ubh8j3 eanm77i0"
                                            data-comp="StyledComponent BaseComponent ">
                                            <a
                                                href="/product/squalane-vitamin-c-rose-oil-P416563"
                                                class="css-7c97or eanm77i0"
                                                data-comp="StyledComponent BaseComponent ">
                                                <strong data-at="bsk_sku_brand">
                                                    Biossance
                                                </strong>
                                                <br />
                                                <span data-at="bsk_sku_name">
                                                    Squalane + Vitamin C Rose
                                                    Oil
                                                </span>
                                            </a>
                                        </p>
                                        <div
                                            class="css-1p4nz1q eanm77i0"
                                            data-comp="StyledComponent BaseComponent ">
                                            <div
                                                data-at="sku_size"
                                                class="css-1ehg1jw eanm77i0"
                                                data-comp="SizeAndItemNumber StyledComponent BaseComponent ">
                                                SIZE 1.01 oz/ 30 mL
                                                <span
                                                    data-at="sku_size_separator"
                                                    class="css-10b3y5z">
                                                    •
                                                </span>
                                                ITEM 2382166
                                            </div>
                                            <span
                                                data-at="item_variation_type"
                                                class="css-v1yfvi eanm77i0"
                                                data-comp="ProductVariation StyledComponent BaseComponent ">
                                                COLOR: Original
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        class="css-12h1t8r eanm77i0"
                                        data-comp="Flex StyledComponent BaseComponent ">
                                        <div
                                            class="css-uw9fwm eanm77i0"
                                            data-comp="StyledComponent BaseComponent ">
                                            <div>
                                                <label
                                                    for="qty_2382166"
                                                    class="css-vkf4am">
                                                    Quantity
                                                </label>
                                                <div
                                                    class="css-br0dac"
                                                    data-comp="Select ">
                                                    <div class="css-1w7kjyz">
                                                        <select
                                                            data-at="sku_qty"
                                                            id="qty_2382166"
                                                            class="css-mjt39o">
                                                            <option value="1">
                                                                1
                                                            </option>
                                                            <option value="2">
                                                                2
                                                            </option>
                                                            <option value="3">
                                                                3
                                                            </option>
                                                            <option value="4">
                                                                4
                                                            </option>
                                                            <option value="5">
                                                                5
                                                            </option>
                                                            <option value="6">
                                                                6
                                                            </option>
                                                            <option value="7">
                                                                7
                                                            </option>
                                                            <option value="8">
                                                                8
                                                            </option>
                                                            <option value="9">
                                                                9
                                                            </option>
                                                            <option value="10">
                                                                10
                                                            </option>
                                                        </select>
                                                        <span
                                                            class="css-1t1fsr0 eanm77i0"
                                                            direction="down"
                                                            data-comp="Arrow StyledComponent "></span>
                                                        <svg
                                                            aria-hidden="true"
                                                            viewBox="0 0 24 24"
                                                            class="css-169auvb eanm77i0"
                                                            data-comp="Icon StyledComponent "
                                                            style="display: none;">
                                                            <g>
                                                                <circle
                                                                    fill="#fff"
                                                                    cx="12"
                                                                    cy="18.667"
                                                                    r="1.333"></circle>
                                                                <path
                                                                    d="M12 5.333c-.8 0-1.333.534-1.333 1.334v8c0 .8.533 1.333 1.333 1.333.8 0 1.333-.533 1.333-1.333v-8c0-.8-.533-1.334-1.333-1.334z"
                                                                    fill="#fff"></path>
                                                                <path
                                                                    d="M12 0C5.333 0 0 5.333 0 12s5.333 12 12 12 12-5.333 12-12S18.667 0 12 0zm0 20c-.8 0-1.333-.533-1.333-1.333 0-.8.533-1.334 1.333-1.334.8 0 1.333.534 1.333 1.334S12.8 20 12 20zm1.333-5.333c0 .8-.533 1.333-1.333 1.333-.8 0-1.333-.533-1.333-1.333v-8c0-.8.533-1.334 1.333-1.334.8 0 1.333.534 1.333 1.334v8z"
                                                                    fill="currentColor"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="css-0"
                                                    data-at="bsk_sku_price">
                                                    $95.00
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="css-1ynwnhy eanm77i0"
                                            data-comp="StyledComponent BaseComponent ">
                                            <button
                                                data-at="bsk_sku_love"
                                                type="button"
                                                class="css-pjvscc eanm77i0"
                                                data-comp="StyledComponent BaseComponent ">
                                                Move to Loves
                                            </button>
                                            <span
                                                class="css-184dof0 eanm77i0"
                                                data-comp="StyledComponent BaseComponent ">
                                                |
                                            </span>
                                            <button
                                                data-at="bsk_sku_remove"
                                                type="button"
                                                class="css-pjvscc eanm77i0"
                                                data-comp="StyledComponent BaseComponent ">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <BasketOrderSummary>
                    <div>
                        <div>
                            <div>Merchandise subtotal</div>
                            <div>$0.00</div>
                        </div>
                        <div>
                            <div>GST/HST</div>
                            <div>TBD</div>
                        </div>
                        <Divider />
                        <div>
                            <EstimatedTotalSpan>
                                <div>
                                    <span>$0.00</span>
                                </div>
                            </EstimatedTotalSpan>
                            <p>
                                Shipping &amp; taxes calculated during checkout
                            </p>
                        </div>
                        <div>
                            <Button>Checkout</Button>
                        </div>
                    </div>
                </BasketOrderSummary>
            </div>
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
                                            {cartItem.itemQuantity >= 2 && (
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
                                            )}
                                            {cartItem.itemQuantity}
                                            {cartItem.itemQuantity <
                                                cartItem.numLeft && (
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
                <Delivery>
                    <RadioButton
                        preference={preference}
                        setPreference={setPreference}
                        instructions={extraInstructions}
                        setInstructions={setExtraInstructions}
                    />
                </Delivery>
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
        </PageContainer>
    );
};
const Divider = styled.div``;
const EstimatedTotalSpan = styled.span``;
const BasketOrderSummary = styled.div``;
const EmptyBasketP = styled.p``;
const ItemCountSpan = styled.span``;
const BasketList = styled.div``;
const ChangeButton = styled.div`
    cursor: pointer;
`;
const QuantityInput = styled.div`
    display: grid;
    grid-template-columns: 33% 33% 33%;
`;
const TooMany = styled(Error)`
    padding: 0;
`;
const Price = styled.div`
    text-align: right;
`;
const Cart = styled.div`
    margin: 5px;
    display: grid;
    grid-auto-rows: auto;
    grid-row-gap: 20px;
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
const Delivery = styled(CartItem)`
    grid-template-columns: 160px auto 15% 15% 15%;
`;
export default ShoppingCart;
