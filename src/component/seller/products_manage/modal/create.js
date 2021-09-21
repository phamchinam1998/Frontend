import axios from 'axios';
import React, { useState } from 'react';
import add_img from "../add_photo.png";
import { useDispatch } from 'react-redux';
import { Render } from '../../../../redux/action/reRender';
import Loading from "../../../loading/loading";
import ValidateStr from '../../../validateStr/validateStr';
const validateStr = new ValidateStr();

export function CreateModal(props) {
    const dispatch = useDispatch();
    const [url, setURL] = useState([]);
    const [loading, setLoading] = useState("");
    const [uploadIMG, setUploadIMG] = useState([]);
    function PreviewImg(event) {
        const files = Object.values(event.target.files);
        const URLarr = [];
        const dataArr = [];
        files.forEach(file => {
            dataArr.push(file);
            URLarr.push(URL.createObjectURL(file))
        }
        );
        setUploadIMG(prev => prev.concat(dataArr));
        setURL(prevURL => prevURL.concat(URLarr));
        files.map(file =>
            URL.revokeObjectURL(file));
    }

    function CloseModal() {
        document.getElementById("item-edit-container").style.display = "none";
    }

    function NavigationImg(value) {
        const element = document.getElementById("main-img-item");
        const position = parseInt(element.getAttribute("alt"));
        let number = position;
        switch (value) {
            case "left":
                if (position === 0) number = url.length - 1;
                else number = position - 1;
                element.setAttribute("src", url[number]);
                element.setAttribute("alt", number);
                break;
            case "right":
                if (position === url.length - 1) number = 0;
                else number = position + 1;
                element.setAttribute("src", url[number]);
                element.setAttribute("alt", number);
                break;

            default:
                break;
        }
    }

    const UploadData = async () => {
        setLoading(true);
        const img_url = [];
        for (let index = 0; index < uploadIMG.length; index++) {
            const data = new FormData();
            data.append('file', uploadIMG[index]);
            data.append('upload_preset', 'pcn_preset');
            await axios.post("https://api.cloudinary.com/v1_1/pcndb/image/upload", data)
                .then(resolve => {
                    img_url.push(resolve.data.secure_url)
                })
                .catch(err => console.log(err));
        }
        const params = {
            shop_id: props.shop_id,
            name: document.getElementById("etc-name").value,
            material: document.getElementById("etc-material").value,
            specifications: document.getElementById("etc-specifications").value,
            price: parseInt(document.getElementById("etc-price").value),
            origin: document.getElementById("etc-origin").value,
            description: document.getElementById("description").value,
            tags: validateStr.TagValidate(document.getElementById("etc-tag").value),
            img_url: img_url,
        }
        const token = window.localStorage.getItem("Ecom-seller");
        await axios.post(`https://demo-ecomerce-backend.herokuapp.com/authorization/products/add/`, params, {
            headers: {
                Authorization: token,
            }
        })
            .then(resolve => {
                alert("Thêm sản phẩm thành công");
            })
            .catch(err => console.log("Thêm sản phẩm thất bại xin thử lại"));
        setLoading(false);
        CloseModal();
        dispatch(Render());
    }



    const DeleteIMG = (event) => {
        setLoading(true);
        const index = url.indexOf(event.target.nextSibling.getAttribute("src"));
        const arr = [...url];
        const dataArr = [...uploadIMG];
        arr.splice(index, 1);
        dataArr.splice(index, 1);
        setUploadIMG(dataArr);
        setURL(arr);
        setLoading(false);
    }

    const RenderImg = (e) => {
        return (
            <div>
                <i className="fa fa-times-circle" aria-hidden="true" onClick={(e) => { DeleteIMG(e) }} ></i>
                <img src={e} alt="" />
            </div>
        )
    }
    return (
        <>
            {
                loading ? <Loading /> : <></>
            }
            <div id="item-edit-modal">
                <input multiple style={{ display: "none" }} name="upload" id="upload-img" type="file" onChange={(e) => { PreviewImg(e) }} />
                <div id="products-image">
                    <label id="upload-edit-group" htmlFor="upload-img" >
                        <div>
                            <i className="fa fa-picture-o" aria-hidden="true"></i>
                        </div>
                        <div>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </div>
                    </label>
                    <div id="main-img" >
                        <i role="button" onClick={(e) => NavigationImg("left")} className="fa fa-chevron-left" aria-hidden="true"></i>
                        {url.length === 0
                            ? < img id="main-img-item" src={add_img} alt="0" />
                            : <img id="main-img-item" src={url[0]} alt="0" />
                        }

                        <i role="button" onClick={(e) => NavigationImg("right")} className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                    <div id="another-img">
                        {
                            url.length === 0 ?
                                <>
                                    <div>
                                        <img src={add_img} alt="" />
                                    </div>
                                    <div>
                                        <img src={add_img} alt="" />
                                    </div>
                                    <div>
                                        <img src={add_img} alt="" />
                                    </div>
                                </>
                                : <>{url.map(e => {
                                    return RenderImg(e);
                                })}</>
                        }
                    </div>
                </div>
                <div id="edit-info">
                    <div id="edit-info-1">
                        <div className="edit-info-item">
                            <label htmlFor="etc-name" >Tên SP</label>:
                            <input id="etc-name" type="text" />
                        </div>
                        <div className="edit-info-item">
                            <label htmlFor="etc-material" >Chất liệu</label>:
                            <input id="etc-material" type="text" />
                        </div>
                        <div className="edit-info-item">
                            <label htmlFor="etc-specifications" >Quy cách</label>:
                            <input id="etc-specifications" type="text" />
                        </div>
                        <div className="edit-info-item">
                            <label htmlFor="etc-price" >Giá lẻ</label>:
                            <input id="etc-price" type="text" />
                        </div>
                        <div className="edit-info-item">
                            <label htmlFor="etc-origin" >Xuất xứ</label>:
                            <input id="etc-origin" type="text" />
                        </div>
                        <div style={{ margin: 0, border: "none" }} className="edit-info-item">
                            <label htmlFor="etc-tag" >Tags</label>:
                        </div>
                        <div className="description-container">
                            <textarea id="etc-tag" rows="4" cols="47" placeholder=" #mỹ phẩm #đồ chơi #đồ gia dụng" type="text"></textarea>
                        </div>
                        <div style={{ margin: 0, border: "none" }} className="edit-info-item">
                            <label htmlFor="description" >Mô tả</label>:
                        </div>
                        <div className="description-container">
                            <textarea id="description" rows="9" cols="47"></textarea>
                        </div>
                    </div>
                    <div id="btn-group">
                        <button id="submit-btn" onClick={() => { UploadData() }}>
                            <i className="fa fa-upload" aria-hidden="true" ></i>
                            ADD
                        </button>
                        <button id="cancel-btn" onClick={() => { CloseModal() }} >
                            <i className="fa fa-times" aria-hidden="true"></i>Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}