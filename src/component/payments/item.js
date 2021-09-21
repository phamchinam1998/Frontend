import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TotalMoney } from "../../redux/action/reRender";
import ValidateStr from "../validateStr/validateStr";

export default function PaymentItem(props) {
    const [data, setData] = useState([]);
    const [mainImg, setMainIMG] = useState("");
    const [number, setNumber] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:8080/products/get?id=${props.id}`).then(res => {
            setData(res.data);
            setMainIMG(res.data.img_url[0]);
            setUnitPrice(res.data.price);
            let total = 0;
            Object.values(document.getElementsByClassName("money")).forEach(element => {
                const x = ValidateStr.MoneyStrtoNumber(element.innerHTML);
                total += parseInt(x);
            });
            dispatch(TotalMoney(total.toLocaleString()));
        })
    }, [number, props, dispatch])

    const modify = (e) => {
        const element = e.target;
        switch (element.classList[1]) {
            case "fa-plus":
                setNumber(prev => prev + 1)
                break;
            case "fa-minus":
                if (number > 0) setNumber(prev => prev - 1);
                break;
            default:
                break;
        }
    }

    const money = () => {
        if (unitPrice) {
            return (
                <>
                    {(unitPrice * number).toLocaleString()}
                </>
            )
        }
    }

    return (
        <>
            <div className="product-info-item">
                <div className="name-img" style={{ flex: "1 1 150px" }}>
                    <img src={mainImg} alt="" />
                    <h5 >{data.name}</h5>
                </div>
                <h5 style={{ flex: "0 1 150px" }} >{unitPrice}</h5>
                <h5 style={{ flex: "0 1 150px" }} >
                    <i onClick={(e) => modify(e)} className="fa fa-plus" aria-hidden="true"></i>
                    <input readOnly value={number} style={{ width: "30px" }} type="number" />
                    <i onClick={(e) => modify(e)} className="fa fa-minus" aria-hidden="true"></i></h5>
                <h5 className="money" style={{ flex: "0 1 150px" }} >
                    {money()}
                </h5>
            </div>
        </>
    )
}