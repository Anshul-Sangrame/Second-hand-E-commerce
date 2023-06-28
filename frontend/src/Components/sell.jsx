import React from "react";
import AddPhotoSection from "./image";
import "./sellstyle.css";
function Sell(){
    return <div className="sell">
        <div className="sell-card">
        <div className="sellmain">
      <h1>About</h1>
      <p>Tell the world all about your item and why they’ll love it.</p>
        </div>
     <div className="selltitle">
        <h2>Title*</h2>
        <p>Enter the title that best suits your item</p>
        <input type="text" 
        placeholder="Enter your title " />
     </div>
     <div className="selldescription">
        <h2>Description*</h2>
        <p>What makes your item special? Buyers will only see the first few lines unless they expand the description</p>
        <input type="text" 
        placeholder="Enter your Description" />
        <button type="submit">Add + </button>
     </div>
     <div className = "sellimage">
     <h2>Add Photo* </h2>
      <AddPhotoSection />
        </div>
       <div className="selltags">
        <h2>Tags*</h2>
        <p>Add upto 5 tags to help people search for your product</p>
        <input type="text" 
        placeholder="Shape,colour,style,function,etc" />
       <button type="submit">Add + </button>
        </div> 
        <div className="sellprice">
            <h3>Price*</h3>
            <span className="rupee-symbol">&#8377;</span>
            <input type="text" 
        placeholder="" />
        </div>
        <div className="sellquantity">
            <h3>Quantity*</h3>
            <p>Enter the number of items you want to sell</p>
            <input type="text" 
        placeholder=".." />
        </div>
        </div>
    </div>
}
export default Sell;
