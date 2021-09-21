import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoginModal from './loginRender';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Authorization } from '../../../redux/action/reRender';

export default function LoginAPI() {
    const dispatch = useDispatch();
    const authen = useSelector((status) => status.authorization)
    const [user, setUser] = useState('');

    useEffect(() => {
        const token = window.localStorage.getItem("Customer-token");
        if (token) {
            axios.get(`https://demo-ecomerce-backend.herokuapp.com/authorization/customer/get/`, {
                headers: {
                    Authorization: token
                }
            }).then(function (response) {
                if (response.data) {
                    setUser(response.data.customer_name);
                    dispatch(Authorization("Allow"));
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [authen, dispatch]);

    const Logout = () => {
        window.localStorage.removeItem("Customer-token");
        dispatch(Authorization("notAllow"))
    }

    if (authen === "notAllow") {
        return (
            <LoginModal id="login-btn" />
        );
    }
    if (authen === "Allow") {
        return (
            <div id="account-btn">
                <Link to="/account/" className="nav-link-item" >
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                    <i style={{ whiteSpace: "nowrap", fontSize: "15px" }}>Xin Chào :{user}</i>
                </Link>
                <i role="button" onClick={() => { Logout() }} style={{ marginLeft: "10px" }} className="fa fa-sign-out" aria-hidden="true"></i>
            </div >
        )
    }
}




