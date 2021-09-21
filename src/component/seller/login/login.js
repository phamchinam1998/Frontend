import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import "./login.scss";
import seller from './seller.png';
import Loading from '../../loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { SellerAuthorization } from '../../../redux/action/reRender';

function SellerLogin() {
    const authorization = useSelector(state => state.sellerAuthorization);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem('Ecom-seller');
        if (token) {
            axios.get(`http://localhost:8080/authorization/seller/get/`, {
                headers: {
                    Authorization: token
                }
            }).then(function (res) {
                dispatch(SellerAuthorization({ status: true, shop_id: res.data._id, seller_name: res.data.seller_name }));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [authorization, dispatch]);

    function Loader() {
        if (loading === true)
            return (
                <Loading />
            )
    };

    function Login() {
        const username = document.getElementById("InputEmail").value;
        const password = document.getElementById("InputPassword").value;
        setLoading(true)
        axios.post(`http://localhost:8080/account/login`, {
            username: username,
            password: password,
            type: "seller",
        }).then(function (response) {
            if (response.data === "verify") {
                alert("Vui lòng kiểm tra mail để hoàn tất đăng ký");
                setLoading(false);
            }
            else {
                if (response.data.authentication === true) {
                    const token = `Bearer ${response.data.token}`;
                    localStorage.setItem('Ecom-seller', token);
                    setLoading(false);
                    dispatch(SellerAuthorization(true));
                }
            }
        })
    }
    if (!authorization) {
        return (
            <>
                <div id="seller-login-container">
                    <button id="back-homepage" ><Link to="/" ><i className="fa fa-home" aria-hidden="true"></i></Link></button>
                    <div id="login-group">
                        <div id="group-1">
                            <img src={seller} alt="" />
                        </div>
                        <div id="group-2">
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
                            <h5 ><Link to="/account/forgotpassword">Forgot your password ?</Link></h5>
                            <h5><Link to="/account/register">Don't have account ? Sign in now !</Link></h5>
                            {Loader()}
                        </div>
                    </div>
                </div >
            </>
        )
    }


    if (authorization) {
        return (
            <Redirect to="/seller/dashboard/inventory/1" />
        )
    }
}
export default SellerLogin;