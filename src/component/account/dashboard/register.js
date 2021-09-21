import React, { useState } from "react";
import ValidateStr from "../../validateStr/validateStr";
import axios from "axios";
import { Redirect } from "react-router";
import Loading from "../../loading/loading";

export default function Register() {
    const validateStr = new ValidateStr();
    const [validateform, setValidateForm] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const getValue = () => {
        const checkEmpty = Object.values(document.getElementsByClassName("require-info")).every(e => e.value !== "");
        if (checkEmpty && validateform) {
            const data = {
                fullname: document.getElementById("fullname").value,
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                address: document.getElementById("address").value,
                phone: document.getElementById("phone").value,
                gender: document.getElementById("gender").value,
                type: document.getElementById("account-type").value,
            }
            setLoading(true);
            axios.post(`http://localhost:8080/account/register`, data)
                .then(e => {
                    alert("Đăng ký thành công, vui lòng kiểm tra mail để xác thực tài khoản");
                    setLoading(false);
                    setRedirect("/");
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                });
        }
        else {
            alert("Vui lòng hoàn thành mẫu đăng ký");
            setLoading(false);
        }
    }

    const confirmPW = (e) => {
        const confirm = e.target.value;
        const pw = document.getElementById("password");
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

    const ValidateUsername = (e) => {
        const str = e.target.previousSibling.value;
        const result = validateStr.Selector(str, "UserName");
        const i_tag = e.target.nextSibling;
        if (result) {
            axios.get(`http://localhost:8080/account/validateUserName?username=${str}`)
                .then(res => {
                    if (res.data) {
                        i_tag.style.display = "inline";
                        setValidateForm(true);
                        i_tag.setAttribute("class", "fa fa-check");
                        i_tag.style.color = "green";
                    }
                    else {
                        setValidateForm(false)
                        i_tag.style.display = "inline";
                        i_tag.setAttribute("class", "fa fa-times-circle-o");
                        i_tag.style.color = "red";
                        alert("Tên đã có người sử dụng");
                    }
                })
        }
        else {
            setValidateForm(false)
            i_tag.style.display = "inline";
            i_tag.setAttribute("class", "fa fa-times-circle-o");
            i_tag.style.color = "red";
            alert("Tên không hợp lệ ")
        }
    }

    const ModifyUserName = (e) => {
        setValidateForm(false);
        const i_tag = e.target.nextSibling.nextSibling;
        i_tag.style.display = "none";
    }

    const displayTag = (e) => {
        const i_tag = e.target.nextSibling;
        i_tag.style.display = "inline";
    }

    return (
        <>
            {
                redirect
                    ? <Redirect from="/" to={redirect} />
                    : <></>
            }
            <div id="account-modal-container">
                {loading ? <Loading /> : <></>}
                <div id="account-modal-title">
                    <h3>Register</h3>
                </div>
                <div id="account-modal-content">
                    <div className="account-modal-item">
                        <label htmlFor="fullname"><i className="fa fa-user" aria-hidden="true"></i>FullName</label>:
                        <input className="require-info" id="fullname" onFocus={(e) => { displayTag(e) }} onChange={(e) => ValidateForm(e, "FullName")} type="text" /><i style={{ color: "red", display: "none" }} className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="username"><i className="fa fa-user" aria-hidden="true"></i>Username</label>:
                        <input onChange={(e) => { ModifyUserName(e) }} className="require-info" id="username" type="text" />
                        <h6 id="check-user-btn" onClick={(e) => { ValidateUsername(e) }} >Kiểm tra</h6>
                        <i style={{ color: "red", display: "none" }} className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="email"><i className="fa fa-envelope-o" aria-hidden="true"></i>Email</label>:
                        <input className="require-info" id="email" onFocus={(e) => { displayTag(e) }} onChange={(e) => ValidateForm(e, "Email")} type="email" /><i style={{ color: "red", display: "none" }} className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="password"><i className="fa fa-unlock-alt" aria-hidden="true"></i>Password</label>:
                        <input className="require-info" id="password" onFocus={(e) => { displayTag(e) }} onChange={(e) => ValidateForm(e, "Password")} type="password" /><i style={{ color: "red", display: "none" }} className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="confirm-password"><i className="fa fa-unlock-alt" aria-hidden="true"></i>Confirm Password</label>:
                        <input className="require-info" id="confirm-password" onFocus={(e) => { displayTag(e) }} type="password" onChange={(e) => { confirmPW(e) }} /><i style={{ color: "red", display: "none" }} className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="phone"><i className="fa fa-phone" aria-hidden="true"></i>Phone</label>:
                        <input className="require-info" id="phone" onFocus={(e) => { displayTag(e) }} onChange={(e) => ValidateForm(e, "PhoneNumber")} type="text" /><i style={{ color: "red", display: "none" }} className="fa fa-times-circle-o" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="address"><i className="fa fa-address-card-o" aria-hidden="true"></i>Address</label>:
                        <input id="address" onFocus={(e) => { displayTag(e) }} type="text" /><i className="fa fa-info-circle" aria-hidden="true"></i>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="gender"><i className="fa fa-venus-mars" aria-hidden="true"></i>Gender</label>:
                        <select id="gender" name="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="account-modal-item">
                        <label htmlFor="account-type"><i className="fa fa-users" aria-hidden="true"></i>Type</label>:
                        <select id="account-type" name="account-type">
                            <option value="customer">Customer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div className="account-modal-item">
                        <button onClick={() => getValue()}>REGISTER</button>
                    </div>
                </div>
            </div>
        </>
    )
}