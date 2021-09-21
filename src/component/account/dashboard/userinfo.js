import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../loading/loading";

export default function UserInfo() {
    const params = useParams();
    const [userData, setUserdata] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let token;
        switch (params.type) {
            case "customer":
                setLoading(true);
                token = window.localStorage.getItem('Customer-token');
                if (token) {
                    axios.get(`https://demo-ecomerce-backend.herokuapp.com/authorization/customer/get`, {
                        headers: {
                            Authorization: token,
                        }
                    })
                        .then(res => {
                            setUserdata(res.data);
                            setLoading(false);
                        });
                }
                setLoading(false);
                break;

            case "seller":
                setLoading(true);
                token = window.localStorage.getItem('Ecom-seller')
                if (token) {
                    axios.get(`https://demo-ecomerce-backend.herokuapp.com/authorization/seller/get`, {
                        headers: {
                            Authorization: token,
                        }
                    })
                        .then(res => {
                            setUserdata(res.data);
                            setLoading(false);
                        });
                }
                setLoading(false)
                break;

            default:
                break;
        }
        return () => {
            setUserdata();
        }
    }, [params]);

    return (
        <div id="account-modal-container">
            {loading ? <Loading /> : <></>}
            <div id="account-modal-title">
                <h3>Thông tin tài khoản</h3>
            </div>
            {userData
                ?
                <div id="account-modal-content">
                    <div className="account-modal-item">
                        <label><i className="fa fa-user" aria-hidden="true"></i>Loại tài khoản</label>
                        <h4 style={{ margin: "5px" }}>{params.type}</h4>
                    </div>
                    <div className="account-modal-item">
                        <label><i className="fa fa-user" aria-hidden="true"></i>FullName</label>:
                        <h4>{params.type === "customer" ? userData.customer_name : userData.seller_name}</h4>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="email"><i className="fa fa-envelope-o" aria-hidden="true"></i>Email</label>:
                        <h4>{userData.email}</h4>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="phone"><i className="fa fa-phone" aria-hidden="true"></i>Phone</label>:
                        <h4>{userData.phone_number}</h4>
                    </div>
                </div>
                : <h2 style={{ margin: "10px" }}>
                    Bạn chưa đăng nhập
                </h2>}
        </div>
    )
}