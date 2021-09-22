import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Render } from '../../../redux/action/reRender';
import { AddCart } from '../../navigation/cart/modifycart';

export default function List(props) {
    const token = window.localStorage.getItem('Customer-token');
    const authen = useSelector((status) => status.authorization);
    const dispatch = useDispatch();
    const addCart = (item_id) => {
        AddCart(item_id, token, authen);
        dispatch(Render());
    }

    return (
        <>
            < div className="products-item" >
                <div className="item-image">
                    <div className="option-container">
                        <div id="toggle-target" >
                            <i onClick={() => addCart(props.products._id)} className="fa fa-shopping-cart option-item" aria-hidden="true"></i>
                            <i className="fa fa-bookmark option-item" aria-hidden="true"></i>
                            <i className="fa fa-phone-square option-item" aria-hidden="true"></i>
                        </div>
                        <i className="fa fa-caret-down toggle-btn" aria-hidden="true"></i>
                    </div>
                    <img className="products-img" src={props.products.img_url[0]} alt="" />
                </div>
                <div className="sub-info">
                    <h5>{props.products.name}</h5>
                    <div id="product-info">
                        <h6>Xuất xứ : {props.products.origin}</h6>
                        <h6>Giá lẻ : {props.products.price.toLocaleString()} vnđ</h6>
                    </div>
                    <div id="product-btn">
                        <button id="detail-btn"><Link to={`/products/detail/${props.products._id}`}>Chi tiết</Link></button>
                        <button onClick={() => addCart(props.products._id)} id="buy-now-btn"><Link to="/payment"> Mua ngay</Link></button>
                    </div>
                </div>
            </div >
        </>
    )
}

