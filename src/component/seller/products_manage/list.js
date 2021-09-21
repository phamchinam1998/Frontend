import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductHandle } from '../../../redux/action/reRender';
import './list.scss';

export default function List(props) {
    const dispatch = useDispatch();
    const product = props.info;
    const length = product.description.length;
    const ReadMoreLess = () => {
        const element = document.getElementById(product._id);
        const toggle = element.getElementsByClassName("item-info-paragraph")[0].style.display;
        if (!toggle || toggle === "none") {
            element.getElementsByClassName("item-info-paragraph")[0].style.display = "inline";
            element.getElementsByClassName("readmore-btn")[0].style.display = "none";
            element.getElementsByClassName("readless-btn")[0].style.display = "inline";
        }
        if (toggle === "inline") {
            element.getElementsByClassName("item-info-paragraph")[0].style.display = "none";
            element.getElementsByClassName("readless-btn")[0].style.display = "none";
            element.getElementsByClassName("readmore-btn")[0].style.display = "inline";
        }
    }

    const Description = () => {
        if (length < 180) {
            return (
                <p>{product.description}</p>
            )
        }
        return (
            <>
                <p >
                    {product.description.slice(0, 180)}
                </p>
                <p className="item-info-paragraph" >
                    {product.description.slice(180, length)}
                </p>
                <span style={{ cursor: "pointer", color: "blue" }} className="readmore-btn" role="button" onClick={() => { ReadMoreLess() }} > ...More</span>
                <span style={{ cursor: "pointer", color: "blue", display: "none" }} className="readless-btn" role="button" onClick={() => { ReadMoreLess() }} > ...Less</span>
            </>
        )
    }

    const Delete = () => {
        dispatch(ProductHandle(product))
        props.delete();
    }

    return (
        <div key={product._id} id={product._id} className="inventory-item-container">
            <img className="inventory-item-image" src={product.img_url[0]} alt="" />
            <div className="inventory-item-info-1">
                <h4>Tên sản phẩm : {product.name}</h4>
                <h6>ID: {product._id}</h6>
                <h6>Chất liệu : {product.material}</h6>
                <h6>Giá bán lẻ : {product.price}</h6>
                <h6>Xuất xứ : {product.origin}</h6>
                <h6>Quy cách: {product.specifications}</h6>
            </div>
            <div className="inventory-item-info-2">
                <h5 style={{ display: "inline-block", margin: 0, padding: "5px" }}>Mô tả :</h5>
                {Description()}
            </div>
            <div className="inventory-item-option-btn">
                <button onClick={() => props.edit(product)}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button onClick={() => Delete()} >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}