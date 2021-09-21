import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import List from './list';
import { CreateModal } from './modal/create';
import { UpdateModal } from './modal/update';
import DeleteModal from './modal/delete';
import SearchBar from './searchBar/searchBar';
import { Validate } from '../../validateStr/validate';
import './productsmanage.scss';

export default function ProductsManage() {
    const reRender = useSelector((state) => state.reRenderReducer);
    const seller_data = useSelector(state => state.sellerAuthorization)
    const [data, setData] = useState([]);
    const [modalstatus, setModalstatus] = useState('');
    const [product, setProduct] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const params = useParams();
    useEffect(() => {
        const query = {
            query: { shop_id: seller_data.shop_id }
        }
        axios.post(`https://demo-ecomerce-backend.herokuapp.com/products/list?current_page=${params.page}`, query,)
            .then((response) => {
                setData(response.data.data);
            });
        return () => {
            setData([]);
        }
    }, [reRender, params, seller_data])

    const Update = (props) => {
        setProduct(props)
        setModalstatus("update");
        document.getElementById("item-edit-container").style.display = "flex";
    }
    const Create = () => {
        setModalstatus("create");
        document.getElementById("item-edit-container").style.display = "flex";
    }

    const Modal = () => {
        switch (modalstatus) {
            case "create":
                return < CreateModal shop_id={seller_data.shop_id} />
            case "update":
                return <UpdateModal product={product} />
            default:
                return <></>
        }
    }

    const PickItem = (name) => {
        const pattern = new RegExp(Validate(name), "im");
        data.map((e) => {
            if (pattern.test(Validate(e.name))) {
                return Update(e);
            }
            else return <></>
        })
    }

    return (
        <>
            <div id="products-manage-container">
                <div id="inventory-option">
                </div>
                <div id="inventory-container">
                    <h3 id="title-1">INVENTORY</h3>
                    {data.map((info, index) => {
                        return <List key={index} info={info} delete={() => setDeleteModal(true)} edit={(param) => Update(param)} />
                    })}
                    <div id="inventory-option-btn">
                        <div id="add-item-btn">
                            <button onClick={() => Create()}>
                                <i style={{ fontSize: "15px" }} className="fa fa-plus" aria-hidden="true"></i>
                                <i className="fa fa-cube" aria-hidden="true"></i>
                            </button>
                        </div>

                        <div id="iventory-item-search" >
                            <SearchBar edit={(e) => PickItem(e)} shop_id={seller_data.shop_id} />
                        </div>

                        <div id="iventory-item-filter">
                        </div>
                    </div>
                </div>
                <div style={{ display: "none" }} id="item-edit-container">
                    {Modal()}
                </div>
                {
                    deleteModal ? <DeleteModal delete={() => setDeleteModal(false)} /> : <></>
                }
            </div>
        </>
    )
}