import React, { useState } from 'react';
import './login.scss';
import axios from 'axios'
import Loading from '../../loading/loading';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { Render, Authorization } from '../../../redux/action/reRender';

export default function LoginModal() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    function CloseModal() {
        const toggle = document.getElementById("login-container");
        toggle.style.display = "none";
    };

    function Loader() {
        if (loading === true)
            return (
                <Loading />
            )
    };

    function LoginToggle() {
        const toggle = document.getElementById("login-container");
        toggle.style.display = "flex";
    }

    function Login() {
        const user = document.getElementById("InputEmail").value;
        const password = document.getElementById("InputPassword").value;
        setLoading(true);
        axios.post(`https://demo-ecomerce-backend.herokuapp.com/account/login`, {
            username: user,
            password: password,
            type: "customer",
        }).then(function (response) {
            if (response.data === "verify") {
                alert("Vui lòng kiểm tra mail để hoàn tất đăng ký");
                setLoading(false);
            }
            else {
                if (response.data.authentication === true) {
                    const token = `Bearer ${response.data.token}`;
                    window.localStorage.setItem('Customer-token', token);
                    const cart = window.localStorage.getItem('PCN-Cart');
                    axios.post(`https://demo-ecomerce-backend.herokuapp.com/authorization/cart/cartsync`, {
                        cart: cart,
                    }, {
                        headers: {
                            Authorization: token,
                        }
                    }).then(function (response) {
                        window.localStorage.setItem('PCN-Cart', response.data.cart.join("&"));
                        dispatch(Render());
                    })
                        .catch(function (error) {
                            console.log(error);
                        });
                    setLoading(false);
                    CloseModal();
                    dispatch(Authorization("Allow"))
                }
                else {
                    setLoading(false);
                    alert("Tên đăng nhập hoặc mật khẩu sai");
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <button className="nav-link-item" id="login-btn" onClick={() => { LoginToggle() }}>
                <i className="fa fa-sign-in" aria-hidden="true"></i>
                Đăng nhập
            </button>
            <div id="login-container">
                <div id="login-group">
                    <i id="close-btn" role="button" className="fa fa-times" aria-hidden="true" onClick={() => { CloseModal() }} />
                    <h3>LOGIN</h3>
                    <form>
                        <div className="form-item">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <input id="InputEmail" type="text" placeholder="Username" />
                        </div>
                        <div className="form-item">
                            <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                            <input id="InputPassword" type="password" placeholder="Password" />
                        </div>
                    </form>
                    <div id="option-btn">
                        <div >
                            <input type="checkbox" id="remember-check" value="remember" />
                            <label htmlFor="remember-check">Remember me</label>
                        </div>
                        <button onClick={() => { Login() }}>Login</button>
                    </div>
                    <Link to="/account/forgotpassword"><h5 >Forgot your password ?</h5></Link>
                    <Link to="/account/register"> <h5>Don't have account ? Sign in now !</h5></Link>
                    {Loader()}
                </div>
            </div>

        </>
    )
}