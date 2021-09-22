import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Render } from '../../../redux/action/reRender';
import { Link } from 'react-router-dom';
import { DeleteCartItem } from './modifycart';

const CartItem = (props) => {
    const [token, setToken] = useState("");
    const authen = useSelector((status) => status.authorization);
    const [mainImg, setMainIMG] = useState('');
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    useEffect(() => {
        setToken(window.localStorage.getItem('PCN'));
        axios.get(`https://demo-ecomerce-backend.herokuapp.com/products/get?id=${props.id}`).then(res => {
            setData(res.data);
            setMainIMG(res.data.img_url[0]);
        })
    }, [props.id]);
    const deleteItem = () => {
        DeleteCartItem(data._id, token, authen);
        dispatch(Render());
    }

    return (
        <div id={data._id} className="cart-item">
            <div id="products-cart-img-container">
                <img src={mainImg} alt="" />
            </div>
            <div id="cart-item-info">
                <h4> {data.name}</h4>
                <p >Giá : {data.price ? data.price.toLocaleString() : null}</p>
            </div>
            <div id="cart-item-btn-group">
                <i role="button" onClick={() => { deleteItem() }} className="fa fa-trash" aria-hidden="true"></i>
                <Link id="detail" to={`/products/detail/${data._id}`} className="fa fa-info-circle" aria-hidden="true"></Link>
            </div>
        </div >
    )
}
export default CartItem;