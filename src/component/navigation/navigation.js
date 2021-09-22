import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import LoginAPI from '../account/quicklogin/loginAPI';
import './navigation.scss';
import Cart from './cart/cart';
import { useDispatch, useSelector } from 'react-redux';
import { Render } from '../../redux/action/reRender';
import { DeleteCart } from './cart/modifycart';
import MainSearchBar from './search/search';

const Navigation = () => {
    const authen = useSelector((status) => status.authorization);
    const token = window.localStorage.getItem('Customer-token');
    const dispatch = useDispatch();
    const deleteAll = () => {
        DeleteCart(token, authen);
        dispatch(Render());
    }

    return (
        <>
            <div id="nav-main-container">
                <nav id="nav-main">
                    <div id="item-1">
                        <div id="left">
                            <li className="item">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <Link to="/seller/dashboard/inventory/1" className="nav-link-item">Kênh người bán</Link>
                            </li>
                            <li className="item">
                                <div className="nav-link-item">Tải ứng dụng</div>
                                <i className="fa fa-download" aria-hidden="true"></i>
                            </li>
                            <li className="item"  >
                                <div className="nav-link-item">Kết nối</div>
                                <i className="fa fa-facebook-official" aria-hidden="true"></i>
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                            </li>
                            <li className="item">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                                <div className="nav-link-item">Hỗ trợ</div>
                            </li>
                        </div>
                        <div id="right">
                            <LoginAPI />
                        </div>
                    </div>
                    <div id="item-2">
                        <div id="logo">
                            <img src={logo} alt="" />
                        </div>
                        <div id="search-nav">
                            <div id="search-bar">
                                <MainSearchBar />
                            </div>
                            <div id="nav-bar">
                                <div >
                                    <li><Link to="/" className="nav-link-item">Homepage</Link></li>
                                    <li><Link to="/" className="nav-link-item">About</Link></li>
                                    <li><Link to="/products/1" className="nav-link-item">Products</Link></li>
                                </div>
                            </div>
                        </div>
                        <div id="cart">
                            <div id="cart-container">
                                <i id="cart-icon" className="fa fa-shopping-cart" aria-hidden="true"></i>
                                <div id="cart-popover">
                                    <span></span>
                                    <div id="cart-item">
                                        <div id="top-nav"></div>
                                        <div id="cart-content">
                                            <Cart />
                                        </div>
                                        <div id="bot-nav">
                                            <Link to="/payment" id="buy-now-btn">BUY NOW <i className="fa fa-credit-card" aria-hidden="true"></i></Link>
                                            <button onClick={() => { deleteAll() }} id="delete-all-cart-btn"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default Navigation;