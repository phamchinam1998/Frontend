import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Pagination(props) {
    const params = useParams();
    const tags = () => {
        return params.tags ? params.tags : "";
    }
    const cur_page = parseInt(props.pagin_data.cur_page);
    const numberOfPage = parseInt(props.pagin_data.numberOfPage);
    const previous = cur_page === 1 ? cur_page : cur_page - 1;
    const next = cur_page === numberOfPage ? cur_page : cur_page + 1;


    const line_render = (props) => {
        let min = 0;
        let max = 0;
        const numberOfPage = props.numberOfPage;
        const arr = [];
        if (numberOfPage <= 10) {
            min = 1;
            max = numberOfPage;
        }
        if (numberOfPage > 10) {
            if (cur_page <= 5) {
                min = 1;
                max = 10;
            }
            if (5 < cur_page && cur_page <= numberOfPage - 4) {
                min = cur_page - 4;
                max = cur_page + 4;
            }
            if (cur_page > numberOfPage - 4) {
                max = numberOfPage;
                min = numberOfPage - 8;
            }
        }
        for (let i = min; i <= max; i++) {
            arr.push(i);
        }
        return arr.map((element, index) => {
            const cur_page_check = element === cur_page ? "active" : "";
            return (
                <li key={index} className={`page-item ${cur_page_check}`}>
                    <Link to={`/products/${element}/${tags()}`} className="page-link">
                        {element}
                    </Link>
                </li>
            )
        })
    }
    return (
        < >
            <li>
                <Link className="page-item fa fa-angle-double-left" aria-hidden="true" to={`/products/${previous}/${tags()}`} />
            </li>
            {line_render(props.pagin_data)}
            <li >
                <Link className="page-item fa fa-angle-double-right" aria-hidden="true" to={`/products/${next}/${tags()}`} />
            </li>
        </>
    )
}