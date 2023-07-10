import {useState} from 'react';
import './Style/cart.css'
export default function Cart(){
   
    let array=[{title: "cotton T-shirt"},{title: "red skirt"}];
    return(
    <>
    <h3>SHOPPING CART</h3> 
    <div className='cart-items'>
    {array.map((value,index1) => < ButtonDisplay  key={index1} title={value.title} index={index1} my={index1}/>)}
    </div>
    </>
)}
function ButtonDisplay({title,index}){
    const [count,setCount]= useState(1);
    return(
    <>
    {/* <h4>Cotton T-shirt</h4> */}
    <h4>{title}</h4>
    <button onClick={()=>{if(count>1) setCount(count-1) ; else setCount(1)  }}>-</button><button >{count}</button><button width="" onClick={()=>{setCount(count+1)}}>+</button>
    <button ><img src="https://img.favpng.com/19/7/1/delete-button-png-favpng-nNzUqv3qzzzH3cqYQhDRfPLQz.jpg" alt="delete" width="10px" height="10px"/></button>
    <br/>
    </>
)}