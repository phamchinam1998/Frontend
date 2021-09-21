import React, { useState, useEffect } from 'react';
import ProductsListRender from './productsListRender';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './List_products.scss';

function Products() {
    const [data, setData] = useState([]);
    const [loading_status, setLoading] = useState([false]);
    const [Pagination_data, setPagin] = useState({});
    const [sort, setSort] = useState(false);
    const params = useParams();

    useEffect(() => {
        let query = {};
        if (params.tags) {
            query = {
                query: { tags: params.tags },
            }
        }
        Object.assign(query, { sort: sort });
        setLoading(true);
        axios.post(`http://localhost:8080/products/list?current_page=${params.page}`, query).then(res => {
            if (res.data.data.length > 0) {
                setData(res.data.data);
                setPagin({
                    cur_page: params.page,
                    numberOfPage: Math.ceil(res.data.document_number / 8),
                });
                setLoading((false));
            }
            else {
                axios.get(`http://localhost:8080/products/listdefault?keyword=${params.tags}&&current_page=${params.page}`).then(res => {
                    setData(res.data.data);
                    setPagin({
                        cur_page: params.page,
                        numberOfPage: Math.ceil(res.data.document_number / 50),
                    });
                    setLoading((false));
                })
            }
        }
        )
    }, [params, sort]);

    return (
        <div>
            <ProductsListRender setsort={(query) => setSort(query)} list={data} loading={loading_status} pagin_data={Pagination_data} />
        </div>
    )
}

export default Products;