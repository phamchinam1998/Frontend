import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Render } from "../../../../redux/action/reRender";

export default function DeleteModal(props) {
    const dispatch = useDispatch();
    const deleteProduct = useSelector((state) => state.productHandle);
    const Delete = async () => {
        const token = window.localStorage.getItem("Ecom-seller");
        await axios.post(`http://localhost:8080/authorization/products/delete/`, deleteProduct,
            {
                headers: {
                    Authorization: token
                }
            })
            .then(resolve => {
                alert("Xóa thành công");
            })
            .catch(err => console.log("Xóa thất bại xin thử lại"));
        props.delete()
        dispatch(Render());
    }

    return (
        <div id="popup-container">
            <div id="popup">
                <h3>Delete</h3>
                <h5>Bạn có chắc muốn xóa ?</h5>
                <div>
                    <button onClick={() => { props.delete() }}>Cancel</button>
                    <button id="popup-confirm" onClick={() => Delete()}>Delete</button>
                </div>
            </div>
        </div>
    )
}