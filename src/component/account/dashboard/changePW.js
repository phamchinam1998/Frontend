import React from "react";
import ValidateStr from "../../validateStr/validateStr";
import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Loading from "../../loading/loading";

export default function ChangePW() {
    const validateStr = new ValidateStr();
    const [validateform, setValidateForm] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const displayTag = (e) => {
        const i_tag = e.target.nextSibling;
        i_tag.style.display = "inline";
    }

    const getValue = () => {
        const checkEmpty = Object.values(document.getElementsByClassName("require-info")).every(e => e.value !== "");
        if (checkEmpty && validateform) {
            const data = {
                username: document.getElementById("username").value,
                password: document.getElementById("current-password").value,
                type: document.getElementById("account-type").value,
                new_password: document.getElementById("new-password").value,
            }
            setLoading(true);
            axios.post(`http://localhost:8080/account/changepassword`, data)
                .then(res => {
                    if (res.data) {
                        alert("Đổi mật khẩu thành công");
                        setLoading(false);
                        setRedirect("/");
                    }
                    else alert("Tên đăng nhập hoặc mật khẩu sai")
                })
                .catch(err => { setLoading(false); console.log(err) });
        }
        else {
            setLoading(false);
            alert("Vui lòng hoàn thành mẫu")
        };
    }


    const confirmPW = (e) => {
        const confirm = e.target.value;
        const pw = document.getElementById("new-password");
        if (confirm === pw.value) {
            setValidateForm(true);
            const i_tag = e.target.nextSibling;
            i_tag.setAttribute("class", "fa fa-check");
            i_tag.style.color = "green";
        }
        else {
            setValidateForm(false);
            const i_tag = e.target.nextSibling;
            i_tag.setAttribute("class", "fa fa-times-circle-o");
            i_tag.style.color = "red";
        }
    }

    const ValidateForm = (e, type) => {
        const str = e.target.value;
        const result = validateStr.Selector(str, type);
        const i_tag = e.target.nextSibling;
        if (result) {
            setValidateForm(true);
            i_tag.setAttribute("class", "fa fa-check");
            i_tag.style.color = "green";
        }
        else {
            setValidateForm(false)
            i_tag.setAttribute("class", "fa fa-times-circle-o");
            i_tag.style.color = "red";
        }
    }
    return (
        <>{
            redirect
                ? <Redirect from="/" to={redirect} />
                : <></>
        }
            <div id="account-modal-container">
                {loading ? <Loading /> : <></>}
                <div id="account-modal-title">
                    <h3>Change Password</h3>
                </div>
                <div id="account-modal-content">
                    <h4 style={{ margin: "20px" }}>Cài đặt lại mật khẩu</h4>
                    <div className="account-modal-item">
                        <label htmlFor="account-type"><i className="fa fa-users" aria-hidden="true"></i>Loại tài khoản</label>:
                        <select id="account-type" name="account-type">
                            <option value="customer">Customer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div className="account-modal-item">
                        <label><i className="fa fa-user" aria-hidden="true"></i>Tên tài khoản</label>:
                        <input id="username" className="require-info" type="text" />
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="current-password"><i className="fa fa-unlock-alt" aria-hidden="true"></i>Current Password</label>:
                        <input className="require-info" id="current-password" type="password" />
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="new-password"><i className="fa fa-unlock-alt" aria-hidden="true"></i>New Password</label>:
                        <input className="require-info" id="new-password" onFocus={(e) => { displayTag(e) }} onChange={(e) => ValidateForm(e, "Password")} type="password" /><i style={{ color: "red", display: "none" }} className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="confirm-new-password"><i className="fa fa-unlock-alt" aria-hidden="true"></i>Confirm New Password</label>:
                        <input className="require-info" id="confirm-new-password" onFocus={(e) => { displayTag(e) }} type="password" onChange={(e) => { confirmPW(e) }} /><i style={{ color: "red", display: "none" }} className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <button onClick={() => getValue()}>CHANGE</button>
                    </div>
                </div>
            </div>
        </>
    )
}