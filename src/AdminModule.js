import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminModule() {
  const [AdminArray, setAdminArray] = useState([]);
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();


  

  
  useEffect(() => {
    getAdminClick();
  }, []);
  // Function to check authentication status
  function getAdminClick() {
    const token = localStorage.getItem("adminToken"); // Check if authentication token exists in localStorage
    setIsAuthenticated(!!token, () => { // Use callback function of setIsAuthenticated
      if (!isAuthenticated) {
        alert("Before entering the admin page, you need to login");
        navigate("/AdminLogin");
      } else {
        fetchAdminData();
      }
    });
  };

  
  
  // Function to fetch admin data
  const fetchAdminData = () => {
    let url = "http://localhost:3500/products";
    axios
      .get(url)
      .then((res) => {
        setAdminArray(res.data);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
        setError("Error occurred while fetching data. Please try again later.");
      });
  };

  // Function to handle adding admin data
  const addAdminClick = () => {
    let adminObj = {
      id: id,
      productName: productName,
      category: category,
      description: description,
      unitPrice: unitPrice,
      productImage: productImage
    };

    let url = "http://localhost:3500/products";
    axios
      .post(url, adminObj)
      .then((res) => {
        alert("New product details are inserted in server");
        fetchAdminData();
      })
      .catch((error) => {
        console.error("Error adding admin data:", error);
        setError("Error occurred while adding product. Please try again later.");
      });

    clearFields();
  };

  // Function to handle deleting admin data
  const deleteAdminClick = (id) => {
    let flag = window.confirm("Do you want to delete?");

    if (flag === false) {
      return;
    }

    let url = `http://localhost:3500/products/${id}`;
    axios
      .delete(url)
      .then((res) => {
        alert("Product details are deleted from server");
        fetchAdminData();
      })
      .catch((error) => {
        console.error("Error deleting admin data:", error);
        setError("Error occurred while deleting product. Please try again later.");
      });
  };

  // Function to handle selecting admin data
  const selectAdminClick = (id) => {
    let url = `http://localhost:3500/products/${id}`;
    axios
      .get(url)
      .then((res) => {
        let adminObj = res.data;

        setId(adminObj.id);
        setProductName(adminObj.productName);
        setCategory(adminObj.category);
        setDescription(adminObj.description);
        setUnitPrice(adminObj.unitPrice);
        setProductImage(adminObj.productImage);
      })
      .catch((error) => {
        console.error("Error selecting admin data:", error);
        setError("Error occurred while selecting product. Please try again later.");
      });
  };

  // Function to handle updating admin data
  const updateAdminClick = () => {
    let adminObj = {
      id: id,
      productName: productName,
      category: category,
      description: description,
      unitPrice: unitPrice,
      productImage: productImage
    };

    let url = `http://localhost:3500/products/${adminObj.id}`;

    axios
      .put(url, adminObj)
      .then((res) => {
        alert("Product details are updated in server");
        fetchAdminData();
      })
      .catch((error) => {
        console.error("Error updating admin data:", error);
        setError("Error occurred while updating product. Please try again later.");
      });
  };

  // Function to clear form fields
  const clearFields = () => {
    setId("");
    setProductName("");
    setCategory("");
    setDescription("");
    setUnitPrice("");
    setProductImage("");
  };

  // Map admin data to JSX elements
  let resultArray = AdminArray.map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.productName}</td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.unitPrice}</td>
      <td>
        <img src={item.productImage} width="50" height="50" alt={item.productName} />
      </td>
      <td>
        <a href="#" onClick={() => selectAdminClick(item.id)}>Select</a>|
        <a href="#" onClick={() => deleteAdminClick(item.id)}>Delete</a>
      </td>
    </tr>
  ));

  return (
    <>
      <div style={{ margin: "auto", justifyContent: "center", alignItems: "center", height: "100vh", overflowX: "auto" }}>
        <h3>Server Communication using AXIOS (CRUD on JSON Server)</h3>
        <hr />

        <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="text" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} placeholder="Unit Price" />
        <input type="text" value={productImage} onChange={(e) => setProductImage(e.target.value)} placeholder="Product Image URL" />
        <hr />
        

        <input type="button" value="Get Products" onClick={fetchAdminData} />
        <input type="button" value="Add Product" onClick={addAdminClick} />
        <input type="button" value="Update Product" onClick={updateAdminClick} />
        <hr />
        <div>
          <table style={{ textAlign: "center" }} border="2" width="100%" cellSpacing="0" cellPadding="5" >
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Product Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resultArray}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminModule;
