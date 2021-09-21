import React, { useState } from "react";
import axios from "axios";
import Loading from "../../loading/loading";

export default function ForgotPW() {
    const [loading, setLoading] = useState(false);

    const getValue = () => {
        const checkEmpty = Object.values(document.getElementsByClassName("require-info")).every(e => e.value !== "");
        if (checkEmpty) {
            const data = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
            }
            setLoading(true)
            axios.post(`http://localhost:8080/account/forgotpw`, data)
                .then(res => {
                    if (res.data) {
                        alert("Vui lòng kiểm tra mail để lấy mật khẩu mới");
                        setLoading(false);
                    }
                    else {
                        setLoading(false);
                        alert("Tên đăng nhập hoặc email sai");
                    }
                })
                .catch(err => console.log(err));
        }
        else {
            alert("Vui lòng hoàn thành mẫu");
            setLoading(false);
        }
    }

    return (
        <div id="account-modal-container">
            {loading ? <Loading /> : <></>}
            <div id="account-modal-title">
                <h3>Forgot Password</h3>
            </div>
            <div id="account-modal-content">
                <h4 style={{ margin: "20px" }}>Chúng tôi sẽ gửi Email xác nhận lấy lại mật khẩu vào Email của bạn !</h4>
                <div className="account-modal-item">
                    <label><i className="fa fa-user" aria-hidden="true"></i>Tên tài khoản</label>:
                    <input id="username" className="require-info" type="text" />
                </div>
                <div className="account-modal-item">
                    <label><i className="fa fa-envelope-o" aria-hidden="true"></i>Email</label>:
                    <input id="email" className="require-info" type="text" />
                </div>
                <div className="account-modal-item">
                    <button onClick={() => getValue()}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
}