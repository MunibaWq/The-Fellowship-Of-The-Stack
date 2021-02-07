import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'
import styled from "styled-components";

let onOpened = (message) => {
        // console.log(message)
    }
let onClosed = (message) => {
        // console.log(message)
    };
const CheckoutButton = ({ price, artistName }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51ICnpqINw7U5M31CEDkye0SmruSOvRzTQiiX8ObajGYJr2uONQKzqPpmQXmj98jJUKWCFDvAhlU76oJT2XpM0HUc00GbQtAjta";
    let onToken = async (token) => {
        axios.post('/orders/stripe/payment',{token, amount:priceForStripe})
    }
    
    return (
        
        <Stripe
            name={artistName} // the pop-in header title
            description={`Total: ${price}`} // the pop-in header subtitle
           // the pop-in header image (default none)
            panelLabel="Give Money" // prepended to the amount in the bottom pay button
            amount={priceForStripe} // cents
            currency="CAD"
            stripeKey={publishableKey}
            locale="us"
            email
            // Note: Enabling either address option will give the user the ability to
            // fill out both. Addresses are sent as a second parameter in the token callback.
            shippingAddress
            billingAddress
            // Note: enabling both zipCode checks and billing or shipping address will
            // cause zipCheck to be pulled from billing address (set to shipping if none provided).
            zipCode
            bitcoin // accept Bitcoins (default false)
            token={onToken} // submit callback
            opened={onOpened} // called when the checkout popin is opened (no IE6/7)
            closed={onClosed} // called when the checkout popin is closed (no IE6/7)
        />
    );
};

const Stripe = styled(StripeCheckout)`
    width: 200px;
    margin: 20px 0;

`
export default CheckoutButton;
