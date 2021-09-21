import React, { useEffect, useState } from "react";
import "./payment.scss";
import PaymentItem from "./item";
import { useSelector } from "react-redux";

export default function Payments() {
    const [cart, setCart] = useState([]);
    const totalmoney = useSelector(state => state.totalMoney)

    useEffect(() => {
        setCart(window.localStorage.getItem('PCN-Cart').split("&"));
    }, [])

    return (
        <>
            <div id="payment-container">
                <div id="payment-group">
                    <div id="payment-table-header">
                        <h5 style={{ flex: "1 1 150px" }}>Sản phẩm</h5>
                        <h5 style={{ flex: "0 1 150px" }}>Đơn giá</h5>
                        <h5 style={{ flex: "0 1 150px" }}>Số lượng</h5>
                        <h5 style={{ flex: "0 1 150px" }}>Số tiền</h5>
                    </div>
                    <div id="product-info-group">
                        {cart.map((id, index) => {
                            return (
                                <PaymentItem key={index} id={id} />
                            )
                        })}
                    </div>
                    <div id="payment-btn-group">
                        <div id="btn-group">
                            <button id="pay-btn" onClick={() => alert("Xin lỗi chức năng đang trong quá trình phát triển !")}>Mua Hàng</button>
                        </div>
                        <h4 id="total-money">
                            Tổng : {totalmoney} VNĐ
                        </h4>
                    </div>
                </div>
            </div>
        </>
    )
}