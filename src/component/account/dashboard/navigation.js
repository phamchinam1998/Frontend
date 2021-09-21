import React from "react";
import { Link } from "react-router-dom";
import './navigation.scss';

export default function AccountNavigation() {

    const Toggle = (e) => {
        if (e.target.getAttribute("class") === "acc-nav-item") {
            const element = e.target.lastChild;
            if (element.style.height === "0px" || !element.style.height) {
                element.style.height = "100px";
            }
            else element.style.height = "0px";
        }
    }

    return (
        <div id="account-dashboard-navigation">
            <div id="account-navigation">
                <Link to="/" className="acc-nav-item"><i className="fa fa-plus-circle" aria-hidden="true"></i>Trang chủ</Link>
                <div onClick={(e) => Toggle(e)} className="acc-nav-item" >
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>Thông tin
                    <div className="toggle-nav-item">
                        <Link to="/account/info/seller" >Chủ Shop</Link>
                        <Link to="/account/info/customer" >Khách Hàng</Link>
                    </div>
                </div>
                <Link to="/account/register" className="acc-nav-item"><i className="fa fa-plus-circle" aria-hidden="true"></i>Đăng ký</Link>
                <Link to="/account/forgotpassword" className="acc-nav-item"><i className="fa fa-plus-circle" aria-hidden="true"></i>Quên mật khẩu</Link>
                <Link to="/account/changepassword" className="acc-nav-item"><i className="fa fa-plus-circle" aria-hidden="true"></i>Đổi mật khẩu</Link>
            </div>
        </div>
    )
}