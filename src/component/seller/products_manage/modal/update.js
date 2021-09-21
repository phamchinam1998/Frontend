import axios from 'axios';
import React, { useEffect, useState } from 'react';
import add_img from "../add_photo.png";
import { useDispatch } from 'react-redux';
import { Render } from '../../../../redux/action/reRender';
import ValidateStr from '../../../validateStr/validateStr';
import Loading from '../../../loading/loading';
const validateStr = new ValidateStr();

export function UpdateModal(props) {
    const dispatch = useDispatch();
    const [newUrl, setNewUrl] = useState([]);
    const [url, setURL] = useState([]);
    const [mainImg, setMainimg] = useState("");
    const [name_value, setNameValue] = useState("");
    const [material_value, setMaterialValue] = useState("");
    const [specifications_value, setSpecificationsValue] = useState("");
    const [price_value, setPriceValue] = useState("");
    const [origin_value, setOriginValue] = useState("");
    const [tagsValue, setTagvalue] = useState("");
    const [description_value, setDescriptionValue] = useState("");
    const [updateImg, setUpdateImg] = useState([]);
    const [imgDeleteList, setImgDeleteList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setURL(props.product.img_url);
        setMainimg(props.product.img_url[0]);
        setNameValue(props.product.name);
        setMaterialValue(props.product.material);
        setSpecificationsValue(props.product.specifications);
        setPriceValue(props.product.price);
        setOriginValue(props.product.origin);
        setDescriptionValue(props.product.description);
        setTagvalue([""].concat(props.product.tags).join("#"));
    }, [props])
    function PreviewImg(event) {
        const files = Object.values(event.target.files);
        const URLarr = [];
        const dataArr = [];
        files.forEach(file => {
            dataArr.push(file);
            URLarr.push(URL.createObjectURL(file));
        }
        );
        setUpdateImg(prev => prev.concat(dataArr));
        setNewUrl(prev => prev.concat(URLarr));
        files.map(file =>
            URL.revokeObjectURL(file));
    }

    function CloseModal() {
        setURL([]);
        setNewUrl([]);
        setUpdateImg([]);
        setMainimg(add_img);
        document.getElementById("item-edit-container").style.display = "none";
        dispatch(Render());
    }

    const NavigationImg = (value) => {
        const Url = url.concat(newUrl);
        const element = document.getElementById("main-img-item");
        const position = parseInt(element.getAttribute("alt"));
        let number = position;
        switch (value) {
            case "left":
                if (position === 0) number = Url.length - 1;
                else number = position - 1;
                element.setAttribute("src", Url[number]);
                element.setAttribute("alt", number);
                break;
            case "right":
                if (position === Url.length - 1) number = 0;
                else number = position + 1;
                element.setAttribute("src", Url[number]);
                element.setAttribute("alt", number);
                break;
            default:
                break;
        }
    }

    const UploadData = async () => {
        const update_img_url = [];
        for (let index = 0; index < updateImg.length; index++) {
            const data = new FormData();
            data.append('file', updateImg[index]);
            data.append('upload_preset', 'pcn_preset');
            setLoading(true);
            await axios.post("https://api.cloudinary.com/v1_1/pcndb/image/upload", data)
                .then(resolve => {
                    update_img_url.push(resolve.data.secure_url)
                })
                .catch(err => console.log(err));
        }
        const params = {
            product_id: props.product._id,
            shop_id: props.product.shop_id,
            name: name_value,
            material: material_value,
            specifications: specifications_value,
            price: parseInt(price_value),
            origin: origin_value,
            description: description_value,
            tags: validateStr.TagValidate(tagsValue),
            update_img_url: update_img_url,
            delete_img_url: imgDeleteList,
        }
        const token = window.localStorage.getItem("Ecom-seller");
        await axios.post(`http://localhost:8080/authorization/products/update/`, params,
            {
                headers: {
                    Authorization: token,
                }
            })
            .then(resolve => {
                setLoading(false);
                alert("Chỉnh sửa thành công");
            })
            .catch(err => {
                setLoading(true);
                console.log("Chỉnh sửa thất bại xin thử lại")
            });
        CloseModal()
    }

    const EditBtn = (e) => {
        const element = e.target;
        const pre_element = element.previousSibling;
        const readonly = pre_element.getAttributeNode("readOnly");
        if (readonly) {
            element.setAttribute("class", "fa fa-check");
            pre_element.focus();
            pre_element.removeAttributeNode(readonly);
        }
        if (!readonly) {
            element.setAttribute("class", "fa fa-pencil-square-o");
            const att = document.createAttribute("readOnly");
            pre_element.setAttributeNode(att);
        }
    }

    const DeleteIMG = async (event) => {
        const src = event.target.nextSibling.getAttribute("src");
        const alt = event.target.nextSibling.getAttribute("alt");
        if (alt === "new") {
            const index = newUrl.indexOf(src);
            const arr = [...newUrl];
            const dataArr = [...updateImg];
            arr.splice(index, 1);
            dataArr.splice(index, 1);
            setNewUrl(arr);
            setUpdateImg(dataArr);
        }
        else {
            const index = url.indexOf(src);
            const arr = [...url];
            arr.splice(index, 1);
            setURL(arr);
            if (arr.length === 0) {
                setMainimg(add_img);
            }
            else setMainimg(arr[0]);
            setImgDeleteList(prev => prev.concat(src));
        }
    }

    const RenderImg = (e, alt, index) => {
        return (
            <div key={index} >
                <i className="fa fa-times-circle" aria-hidden="true" onClick={(e) => { DeleteIMG(e) }} ></i>
                <img src={e} alt={alt} />
            </div>
        )
    }

    return (
        <>
            {loading ? <Loading /> : <></>}
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
                        <img id="main-img-item" src={mainImg} alt="0" />
                        <i role="button" onClick={(e) => NavigationImg("right")} className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                    <div id="another-img">
                        {
                            url.length === 0 && newUrl.length === 0 ?
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
                                : <>{url.map((e, index) => {
                                    return RenderImg(e, "", index);
                                })}
                                    {newUrl.map((e, index) => {
                                        return RenderImg(e, "new", index);
                                    })}
                                </>
                        }
                    </div>
                </div>
                <div id="edit-info">
                    <div id="edit-info-1">
                        <div className="edit-info-item">
                            <label htmlFor="etc-name" >Tên SP</label>:
                            <input onChange={(e) => setNameValue(e.target.value)} id="etc-name" type="text" value={name_value} readOnly />
                            <i onClick={e => (EditBtn(e))} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>
                        <div className="edit-info-item">
                            <label htmlFor="etc-material" >Chất liệu</label>:
                            <input onChange={(e) => setMaterialValue(e.target.value)} id="etc-material" type="text" value={material_value} readOnly={true} />
                            <i onClick={e => (EditBtn(e))} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>
                        <div className="edit-info-item">
                            <label htmlFor="etc-specifications" >Quy cách</label>:
                            <input onChange={(e) => setSpecificationsValue(e.target.value)} id="etc-specifications" type="text" value={specifications_value} readOnly={true} />
                            <i onClick={e => (EditBtn(e))} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>
                        <div className="edit-info-item">
                            <label htmlFor="etc-price" >Giá lẻ</label>:
                            <input onChange={(e) => setPriceValue(e.target.value)} id="etc-price" type="text" value={price_value} readOnly={true} />
                            <i onClick={e => (EditBtn(e))} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>
                        <div className="edit-info-item">
                            <label htmlFor="etc-origin" >Xuất xứ</label>:
                            <input onChange={(e) => setOriginValue(e.target.value)} id="etc-origin" type="text" value={origin_value} readOnly={true} />
                            <i onClick={e => (EditBtn(e))} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>

                        <div style={{ margin: 0, border: "none" }} className="edit-info-item">
                            <label htmlFor="etc-tags" >Tags</label>:
                        </div>
                        <div className="description-container">
                            <textarea onChange={(e) => setTagvalue(e.target.value)} id="etc-tags" rows="4" cols="47" value={tagsValue} readOnly={true}></textarea>
                            <i onClick={e => (EditBtn(e))} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>


                        <div style={{ margin: 0, border: "none" }} className="edit-info-item">
                            <label htmlFor="description" >Mô tả</label>:
                        </div>
                        <div className="description-container">
                            <textarea onChange={(e) => setDescriptionValue(e.target.value)} id="description" rows="9" cols="47" value={description_value} readOnly={true}></textarea>
                            <i onClick={e => (EditBtn(e))} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div id="btn-group">
                        <button id="submit-btn" onClick={() => { UploadData() }}>
                            <i className="fa fa-floppy-o" aria-hidden="true"></i>
                            UPDATE
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