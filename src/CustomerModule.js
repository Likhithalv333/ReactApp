import {useEffect,useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import './CustomerModule.css';

function CustomerModules(){
    const [productArray,setProductArray] = useState([]);
    useEffect(() =>{
        getProductClick();
    },[]);
    function getProductClick(){
        let url="http://localhost:3500/products";
        axios.get(url).then(responde => {
            setProductArray(responde.data);
        });

    }
    let resultArray = productArray.map((item,index) =>(
        <div className="card" key={item.id}>
            <img src={item.productImage} height={100} width="100"></img>
            <br/>
            <span className="prdName">{item.productName}</span><br/>
            <span className="prdPrice" >₹{item.unitPrice}</span>
            <br/>
            <Link to={"/ProductDetails/" + item.id}>View Details</Link>
        </div>
    ));

    return(
        <>
        {resultArray}
        </>
    )
}
export default CustomerModules;