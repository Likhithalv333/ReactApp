import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './CustomerModule.css';

function ProductByCategory() {
    const [productArray, setProductArray] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getProductsClick();
    }, [id]);

    function getProductsClick() {
        let url = "http://localhost:3500/products?category=" + id;
        axios.get(url).then((resData) => {
            setProductArray(resData.data);
        });
    }

    let resultArray = productArray.map((item, index) =>
        <div className="card" key={index}>
            <img src={item.productImage} height={100} width="100" />
            <br />
            <span className="prdName">{item.productName}</span>  <br />
            {typeof item.unitPrice === 'number' ? ( // Check if unitPrice is a number
                <span className="prdPrice"> ₹ {item.unitPrice.toFixed(2)}</span>
            ) : (
                <span className="prdPrice">Price not available</span>
            )}
            <br />
            <Link to={"/ProductDetails/" + item.id}>View Details</Link>
        </div>
    );

    return (
        <>
            {resultArray}
        </>
    );
}

export default ProductByCategory;
