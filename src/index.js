import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

 

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminModule from './AdminModule'; 
import CustomerModule from './CustomerModule'; 
import NotFound from './NotFound'; 
import ProductDetails from './ProductDetails';
import NavBar from './NavBar';
import Login from './Login';
import ShoppingCart from './ShoppingCart';
import ProductByCategory from './ProductByCategory';
import OrderConfirmed from './OrderConfirmed';
import RegistrationPage from './RegistrationPage';
import AdminLogin from './AdminLogin';
import Footer from "./Footer";


const routing = (
  <Router>
    <div style={  {textAlign : "center", padding:'10px'}  }>
     
      <hr/>
        <NavBar /> 
      <hr />
      <h3 style={{padding:'40px'}}>e-Commerce Application using React JS</h3>
      <p></p>
    </div>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminModule />} /> 
      <Route path='/AdminLogin' element={<AdminLogin/>}></Route>
      <Route path="/AllProducts" element={<CustomerModule />} /> 
      <Route path="/Login" element={<Login />} /> 
     
     
      <Route path="/RegistrationPage" element={<RegistrationPage/>}></Route>          
      <Route path="/ShoppingCart" element={<ShoppingCart />} />           
      <Route path="/ProductByCategory/:id" element={<ProductByCategory/>} />    
      <Route path="ProductDetails/:id" element={<ProductDetails/>}/>
      <Route path="/OrderConfirmed/:id" element={<OrderConfirmed />} />
      <Route path="/Footer" element={<Footer/>}></Route>
      <Route path="*" element={<NotFound />} />1
    </Routes>
    <Footer/>
  </Router>
  
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);

reportWebVitals();
