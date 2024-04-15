LatestProducts.js
import { useEffect, useState } from "react";
import axios from 'axios';
import './CustomerModule';
import { Link } from "react-router-dom";
 

function LatestProducts() {

    const [latestProducts, setLatestProducts] = useState([]);


    useEffect(() => {
        getProductsClick();
    }, []);

    function getProductsClick() {
        let url = "http://localhost:3500/products?_sort=id&_order=desc&_limit=3";
        axios.get(url).then((resData) => {
            setLatestProducts(resData.data);
        });
    }



    let resultArray = latestProducts.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.productImage} height={100} width="100" alt={item.productName} />
          <br />
          <span className="prdName">{item.productName}</span><br />
          <span className="prdPrice" >₹{item.unitPrice}</span><Link to={"/ProductDetails/" + item.id}>View Details</Link>
        </div>
      ));

    return (
        <>
            
                 {resultArray}
           
           
        </>
    );
}

export default LatestProducts;