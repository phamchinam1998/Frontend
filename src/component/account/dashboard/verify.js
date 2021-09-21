import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function AccountVerify() {
    const params = useParams();
    useEffect(() => {
        axios.get(`https://demo-ecomerce-backend.herokuapp.com/account/active?account_id=${params.account_id}`);
    }, [params])

    return (
        <div id="account-modal-container">
            <div id="account-modal-title">
                <h3>Xác thực hoàn tất !</h3>
            </div>
            <div id="account-modal-content">
                <h6 >Tài khoản của quý khách đã được xác thực , vui lòng quay lại trang chủ để đăng nhập và tập hưởng dịch vụ</h6>
                <h6 >Xin cảm ơn !</h6>
                <div className="account-modal-item">
                    <button><Link to="/">Quay lại trang chủ</Link></button>
                </div>
            </div>
        </div >
    )
}