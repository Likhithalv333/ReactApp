import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./ProductDetails.css";
import './CustomerModule.css';
import { useNavigate } from 'react-router-dom';


function ProductDetails(props) {

    let dataObj = {
		"id" :  0,
		"productName" :  "",
		"category" : "",
		"description" :  "",
		"unitPrice"  :    0,
		"productImage" :  ""
};


    const [productObj, setProductObj] = useState(dataObj);
    const { id } = useParams();

    const navigate=useNavigate();

   const [qty,setQty] = useState(1);

    useEffect(() => {
        getSelectedProductDetails();
    }, []);

    function getSelectedProductDetails() {
        let url = " http://localhost:3500/products/" + id;
        axios.get(url).then((resData) => {
            setProductObj(resData.data);
        });
    }

    function addToCartButtonClick(){
        let userId=sessionStorage.getItem("USER_ID");
        if(userId == null || userId == undefined ){
            alert("please login befire adding items to cart");
            navigate("/Login");
            return;
        }
        let cartObj = {};
        cartObj.productName=productObj.productName;
        cartObj.unitPrice = parseFloat(productObj.unitPrice);
        cartObj.quantity=qty;
        cartObj.userId=sessionStorage.getItem("USER_ID");
        let total = productObj.unitPrice * qty;
        cartObj.total = total;

        let url = "http://localhost:3500/cart";
        axios.post(url,cartObj).then(resData =>
            {
                navigate("/ShoppingCart");
            }
            );
    }


    return (
        <div >
            <h3 style={{textAlign:'center'}}>Product Details</h3>
            

            <div className='detailsCard'>
                <img src={productObj.productImage} height='250px' width="250px" />
                <br />
                <span className='prdName'>{productObj.productName}</span>  <br />
                <span>Quantity :   &nbsp;&nbsp;
                    <button onClick={() => setQty(qty+1)}>+</button> 
                    &nbsp;&nbsp;  
                    {qty} 
                    &nbsp;&nbsp;
                    <button onClick={() => { if(qty>1) setQty(qty-1)}}>-</button> 
                </span> <br/>
                <span className='prdPrice'> UnitPrice: ₹ {parseFloat(productObj.unitPrice).toFixed(2)}</span><br/>
                <span>Description:{productObj.description}</span>
                <br />
                
                <button onClick={addToCartButtonClick}>Add To Cart</button>
            </div><br/>
            <div className='back'>
            <button >
            <Link to="/AllProducts" >Back to Products</Link>
            </button>
            </div>
            
            
            
            
        </div>
    );

}

export default ProductDetails;