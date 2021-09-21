import React, { Fragment, useEffect, useState } from 'react';
import './productDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Render } from '../../../redux/action/reRender';
import { AddCart } from '../../navigation/cart/modifycart';
import rate4 from './rate/rate-4.png';

export default function ProductsDetailRender(props) {
    const token = window.localStorage.getItem('PCN');
    const authen = useSelector((status) => status.authorization);
    const dispatch = useDispatch();
    const [imgURL, setImgURL] = useState([]);
    const [mainImg, setMainImg] = useState("");

    useEffect(() => {
        if (props.info.img_url) setMainImg(props.info.img_url[0]);
        setImgURL(props.info.img_url)
    }, [props])

    const sendRate = (value) => {
        console.log(`Đã lưu đánh giá ${value} sao , chức năng đang trong quá trình phát triển`);
    }
    const addCart = (value) => {
        AddCart(value, token, authen);
        dispatch(Render());
    }

    const MainIMG = (e) => {
        const index = imgURL.indexOf(e.src);
        setMainImg(e.src);
        document.getElementById("main-img").getElementsByTagName("IMG")[0].setAttribute("alt", index);
    }

    const RenderImg = (url) => {
        return (
            <div className="item-img" >
                <img src={url} alt="" onClick={(e) => { MainIMG(e.target) }} />
            </div>
        )
    }

    const NavIMG = (value) => {
        const Url = imgURL;
        const element = document.getElementById("main-img").getElementsByTagName("IMG")[0];
        const position = parseInt(element.getAttribute("alt"));
        let number = position;
        switch (value) {
            case "NEXT":
                if (position === 0) number = Url.length - 1;
                else number = position - 1;
                element.setAttribute("src", Url[number]);
                element.setAttribute("alt", number);
                break;
            case "PREV":
                if (position === Url.length - 1) number = 0;
                else number = position + 1;
                element.setAttribute("src", Url[number]);
                element.setAttribute("alt", number);
                break;
            default:
                break;
        }
    }

    if (props.loading) {
        return (
            <h2>Loading...</h2>
        )
    }
    return (
        <>
            <div id="product-detail-conntainer">
                <div className="product-detail-item">
                    <div id="product-image">

                        <div id="main-img">
                            <i onClick={() => NavIMG("NEXT")} class="fa fa-chevron-left" aria-hidden="true"></i>
                            <img src={mainImg} alt="0" />
                            <i onClick={() => NavIMG("PREV")} class="fa fa-chevron-right" aria-hidden="true"></i>
                        </div>
                        <div id="list-img">
                            {imgURL.map(url => RenderImg(url))}
                        </div>
                    </div>
                    <div className="detail-info">
                        <h4>{props.info.name}</h4>
                        <div id="info-coupon">
                            <div id="info">
                                <div id="configuration">
                                    <div className="item-info">
                                        <h5>Chất liệu</h5>:<h6>{props.info.material}</h6>
                                    </div>
                                    <div className="item-info">
                                        <h5>Quy cách đóng gói</h5>:<h6>{props.info.specifications}</h6>
                                    </div>
                                    <div className="item-info">
                                        <h5>Xuất xứ</h5>:<h6>{props.info.origin}</h6>
                                    </div>
                                    <div className="item-info">
                                        <h5>Giá</h5>:<h6>{props.info.price}</h6>
                                    </div>
                                    <div id="description">
                                        <h5>Mô tả :</h5>
                                        <h6>{props.info.description}</h6>
                                    </div>
                                </div>
                                <div id="rate">
                                    <div id="item-1">
                                        <div id="average-rate">
                                            <h2>3.8</h2>
                                            <img src={rate4} alt="" />
                                        </div>
                                        <div id="number-rate">
                                            <h4>1000 Lượt</h4>
                                        </div>
                                    </div>
                                    <div id="item-2">
                                        <li>
                                            <span className="star">5 <i class="fa fa-star-o" aria-hidden="true"></i>: </span>
                                            <span className="progress-rate">
                                                <div style={{ width: "40%" }}></div>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="star">4 <i class="fa fa-star-o" aria-hidden="true"></i>: </span>
                                            <span className="progress-rate">
                                                <div style={{ width: "20%" }}></div>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="star">3 <i class="fa fa-star-o" aria-hidden="true"></i>: </span>
                                            <span className="progress-rate">
                                                <div style={{ width: "10%" }}></div>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="star">2 <i class="fa fa-star-o" aria-hidden="true"></i>: </span>
                                            <span className="progress-rate">
                                                <div style={{ width: "10%" }}></div>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="star">1 <i class="fa fa-star-o" aria-hidden="true"></i>: </span>
                                            <span className="progress-rate">
                                                <div style={{ width: "20%" }}></div>
                                            </span>
                                        </li>
                                    </div>
                                    <div id="rate-btn">
                                        <h4>Đánh giá</h4>
                                        <form id="rate-form">
                                            <input className="star-rate" id="star-5" type="radio" name="star-rate" value="5" onClick={() => { sendRate(5) }} />
                                            <label for="star-5" class="fa fa-star" aria-hidden="true" />
                                            <input className="star-rate" id="star-4" type="radio" name="star-rate" value="4" onClick={() => { sendRate(4) }} />
                                            <label for="star-4" class="fa fa-star" aria-hidden="true" />
                                            <input className="star-rate" id="star-3" type="radio" name="star-rate" value="3" onClick={() => { sendRate(3) }} />
                                            <label for="star-3" class="fa fa-star" aria-hidden="true" />
                                            <input className="star-rate" id="star-2" type="radio" name="star-rate" value="2" onClick={() => { sendRate(2) }} />
                                            <label for="star-2" class="fa fa-star" aria-hidden="true" />
                                            <input className="star-rate" id="star-1" type="radio" name="star-rate" value="1" onClick={() => { sendRate(1) }} />
                                            <label for="star-1" class="fa fa-star" aria-hidden="true" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="order-cart">
                            <button onClick={() => addCart(props.info._id)} id="cart">Thêm vào giỏ  <i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                            <button id="order">Đặt hàng  <i class="fa fa-shopping-bag" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}