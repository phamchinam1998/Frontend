import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import CartItem from './CartItem';
import emptyCart from './emptycart.png';


export default function Cart() {
    const reRender = useSelector((state) => state.reRenderReducer);
    const [Cart, setCart] = useState([]);
    useEffect(() => {
        const cart = window.localStorage.getItem('PCN-Cart');
        if (cart) {
            setCart(cart.split('&'));
        }
        else setCart([]);
    }, [reRender]);

    if (!Cart[0]) {
        return (
            <img id="empty-cart-img" src={emptyCart} alt="" />
        )
    }
    return (
        <>
            {Cart.map((id, index) => {
                return (
                    <CartItem key={index} id={id} />
                )
            })}
        </>
    )
}