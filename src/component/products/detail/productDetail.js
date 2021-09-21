import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ProductsDetailRender from './productsDetailRender';

export default function ProductsDetail() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`https://demo-ecomerce-backend.herokuapp.com/products/get?id=${params.id}`).then(res => {
            setData(res.data)
            setLoading(false);
        })
    }, [params]);
    return (
        <div >
            <ProductsDetailRender info={data} loading={loading} />
        </div>
    )
}
