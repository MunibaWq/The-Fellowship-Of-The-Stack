import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartInput } from "../../redux/actions/Cart";
import { Input } from "../Reusable/Input";
const QuantityInput = ({ cartItem }) => {
    const cartUpdate = useSelector(state=>state.cartUpdate)
    const dispatch = useDispatch()

    return (
        <>
            <Input
                type="number"
                min={0}
                step={1}
                value={cartUpdate[cartItem.productID][cartItem.colour][cartItem.size]}
                onChange={(e) => {
                    dispatch(setCartInput(cartItem, e.target.value));
                }}
            />
            
            
        </>
    );
};

export default QuantityInput;
