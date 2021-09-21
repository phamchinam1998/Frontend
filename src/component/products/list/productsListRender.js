import Pagination from '../../Pagination/pagination';
import List from './list';

const ProductsListRender = (props) => {
    if (props.loading) {
        return (
            <h2>Loading...</h2>
        )
    }

    const Sort = (e) => {
        switch (e.target.value) {
            case "A-Z":
                props.setsort({ name: 1 })
                break;
            case "Z-A":
                props.setsort({ name: -1 })
                break;
            case "low":
                props.setsort({ price: 1 })
                break;
            case "high":
                props.setsort({ price: -1 })
                break;
            default:
                break;
        }
    }

    return (
        <div id="products-list">
            <div className="item item-1"></div>
            <div className="item item-2">
                <div id="product-filter-container">
                    <h5>Sắp xếp theo </h5>
                    <select onChange={(e) => Sort(e)} name="sort-by-price" id="sort-by-price">
                        <option >Giá</option>
                        <option value="low">Giá : Từ thấp đến cao</option>
                        <option value="high">Giá : Từ cao đến thấp</option>
                    </select>
                    <select onChange={(e) => Sort(e)} name="sort-by-name" id="sort-by-name">
                        <option >Tên sản phẩm</option>
                        <option value="A-Z">Tên sản phẩm : A-Z</option>
                        <option value="Z-A">Tên sản phẩm : Z-A</option>
                    </select>
                </div>
                <div id="list-item-container">
                    {props.list.map((products, index) => {
                        return (<List products={products} key={index} />);
                    })}
                </div>
                <div id="pagination">
                    <Pagination pagin_data={props.pagin_data} />
                </div>
            </div>
            <div className="item item-3"></div>
        </div>
    )
}

export default ProductsListRender;