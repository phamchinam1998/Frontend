import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import housewareIMG from './houseware.jpg';
import toy from './toy.jpg';
import cosmetic from './COSMETIC.jpg';
import technology from './Technology.jpg';
import advertise1 from './adv1.png';
import advertise3 from './adv3.png';
import advertise4 from './adv4.png';
import advertise5 from './adv5.png';

function HomeRender(props) {
    const [index, setIndex] = useState(0);
    const listAdv = [advertise1, advertise3, advertise4, advertise5];
    const [mainImg, setMainImg] = useState(listAdv[index]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        document.getElementById("img-nav").childNodes[0].setAttribute("class", "fa fa-circle active");
    }, [])

    const NavAdv = (e) => {
        const dot = document.getElementsByClassName("fa fa-circle active")[0];
        switch (e) {
            case "next":
                if (index < listAdv.length - 1) {
                    dot.setAttribute("class", "fa fa-circle")
                    dot.nextElementSibling.setAttribute("class", "fa fa-circle active")
                    setMainImg(listAdv[index + 1]);
                    setIndex(index => index + 1);
                }
                else {
                    dot.setAttribute("class", "fa fa-circle")
                    document.getElementsByClassName("fa fa-circle")[0].setAttribute("class", "fa fa-circle active")
                    setMainImg(listAdv[0]);
                    setIndex(0);
                }
                break;
            case "prev":
                if (index > 0) {
                    dot.setAttribute("class", "fa fa-circle")
                    dot.previousElementSibling.setAttribute("class", "fa fa-circle active")
                    setMainImg(listAdv[index - 1]);
                    setIndex(index => index - 1);
                }
                else {
                    dot.setAttribute("class", "fa fa-circle")
                    document.getElementsByClassName("fa fa-circle")[listAdv.length - 1].setAttribute("class", "fa fa-circle active")
                    setMainImg(listAdv[listAdv.length - 1]);
                    setIndex(listAdv.length - 1);
                }
                break;

            default:
                break;
        }


    }

    const PickAdv = (e) => {
        const element = document.getElementsByClassName("fa fa-circle active")[0];
        element.setAttribute("class", "fa fa-circle");
        e.target.setAttribute("class", "fa fa-circle active");
        const position = e.target.getAttribute("id")[4];
        setMainImg(listAdv[position]);
        setIndex(parseInt(position));
    }

    return (
        <>
            {redirect ? <Redirect to={redirect} /> : <></>}
            <div id="home-container">
                <div id="slide-show-container">
                    <div id="slide-show-main-img">
                        <i onClick={() => { NavAdv("prev") }} id="prev-btn" className="fa fa-chevron-left" aria-hidden="true"></i>
                        <i onClick={() => { NavAdv("next") }} id="next-btn" className="fa fa-chevron-right" aria-hidden="true"></i>
                        <img src={mainImg} alt="" />
                        <div id="img-nav">
                            {
                                listAdv.map((e, index) =>
                                    <i id={`dot-${index}`} key={index} onClick={(e) => PickAdv(e)} className="fa fa-circle" aria-hidden="true"></i>
                                )
                            }
                        </div>
                    </div>
                    <div id="slide-show-list-img">
                        {listAdv.map((img, index) =>
                            <div key={index} className="list-img-item">
                                <img src={img} alt="" />
                            </div>)}
                    </div>
                </div>
                <div id="products-list-container">
                    <div className="product-item">
                        <img src={housewareIMG} alt="" />
                        <h2 onClick={() => setRedirect("/products/1/đồ gia dụng")}>HOUSEWARE</h2>
                    </div>
                    <div className="product-item">
                        <img src={toy} alt="" />
                        <h2 onClick={() => setRedirect("/products/1/đồ chơi")}>TOYS</h2>
                    </div>
                    <div className="product-item">
                        <img src={cosmetic} alt="" />
                        <h2 onClick={() => setRedirect("/products/1/mỹ phẩm")}>COSMETIC</h2>
                    </div>
                    <div className="product-item">
                        <img src={technology} alt="" />
                        <h2 onClick={() => setRedirect("/products/1/công nghệ")}>TECHNOLOGY</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeRender;