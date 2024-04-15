import './App.css';
import AdminModule from './AdminModule';
import { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CustomerModule.css';
import './App.css';

function App() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    getTopProducts(); // Fetch top products on component mount
  }, []); // Empty dependency array means this effect runs only once on mount

  function getTopProducts() {
    let url = "http://localhost:3500/products?_sort=id&_order=desc&_limit=6";
    axios.get(url).then(resData => {
      setLatestProducts(resData.data);
    });
  }

  let resultArray = latestProducts.map((item, index) => (
    <div className="card" key={index} style={{ marginRight: '20px' }}>
      <img src={item.productImage} height={100} width="100" alt={item.productName} />
      <br />
      <span className="prdName">{item.productName}</span><br />
      <span className="prdPrice" >₹{item.unitPrice}</span>
      <br />
      <Link to={"/ProductDetails/" + item.id}>View Details</Link>
    </div>
    
  ));
  

  return (
    <div style={{  }}>
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div  className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://image.freepik.com/free-vector/lipstick-cosmetics-make-up-beauty-product-banner_107791-1391.jpg" className="d-block custom-image" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://i.pinimg.com/originals/45/bd/c2/45bdc2cabcf7cea2a34a6e9d45fefe1a.jpg" className="d-block custom2" alt="..."/>
    </div>
    <div className="carousel-item">
    <img src="https://sortedandstyled.com/wp-content/uploads/2015/08/cosmetics-8.jpg" className="d-block custom-image" alt="..." />

    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      <hr />
      <h3 style={{alignItems:'center'}}>Latest Products...</h3>
      <div style={{ paddingRight: "10%", width:'100',marginBottom: '20px' }}>{resultArray}</div>
      {/* <Footer/> */}
    </div>
  
  );
}

export default App;
