import React, { useState } from 'react';
import AddPhotoSection from './image';
import './Style/sellstyle.css';
import { useNavigate } from 'react-router-dom';

function Sell() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    file: '',
    cost: '',
    qty: '',
    tags: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(product);
      const token = sessionStorage.getItem('token');
      const response = await fetch("http://localhost:5000/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        console.log("Product uploaded successfully");
        navigate('/success'); // Replace '/success' with the desired route after successful upload
      } else {
        const errorData = await response.json();
        console.log("Product upload failed:", errorData);
      }
    } catch (err) {
      console.error("An error occurred while uploading the product:", err.message);
    }
  };

  const handleFileChange = (file) => {
    setProduct({
      ...product,
      file
    });
  };

  return (
    <div className="sell">
      <div className="sell-card">
        <form onSubmit={handleSubmit}>
          <div className="sellmain">
            <h1>About</h1>
            <p>Tell the world all about your item and why they'll love it.</p>
          </div>
          <div className="selltitle">
            <h2>Title*</h2>
            <p>Enter the title that best suits your item</p>
            <input
              type="text"
              placeholder="Enter your title"
              onChange={handleChange}
              value={product.title}
              name="title"
            />
          </div>
          <div className="selldescription">
            <h2>Description*</h2>
            <p>
              What makes your item special? Buyers will only see the first few lines unless they expand the description
            </p>
            <input
              type="text"
              placeholder="Enter your Description"
              onChange={handleChange}
              value={product.description}
              name="description"
            />
          </div>
          <div className="sellimage">
            <h2>Add Photo*</h2>
            <AddPhotoSection file={product.file} setFile={handleFileChange} />
          </div>
          <div className="selltags">
            <h2>Tags*</h2>
            <p>Add tags to help people search for your product</p>
            <input
              type="text"
              placeholder="Shape, colour, style, function, etc"
              onChange={handleChange}
              value={product.tags}
              name="tags"
            />
          </div>
          <div className="sellprice">
            <h3>Price*</h3>
            <span className="rupee-symbol">&#8377;</span>
            <input
              type="text"
              placeholder=""
              onChange={handleChange}
              value={product.cost}
              name="cost"
            />
          </div>
          <div className="sellquantity">
            <h3>Quantity*</h3>
            <p>Enter</p>
            <input
              type="text"
              placeholder=".."
              onChange={handleChange}
              value={product.qty}
              name="qty"
            />
          </div>
          <div className="sellupload">
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sell;

