import {useState, useEffect} from 'react';
import './Style/cart.css';
import { ItemProfile } from './item-profile';

export default  function Cart(){
    const [product,setproductDetails] = useState([]);
    const [change,setchange] = useState(null);
    useEffect (() => {const cart_details = async () =>{
        try{
            const token = sessionStorage.getItem('token')
            const response = await fetch(`${process.env.REACT_APP_baseURL}/mycart`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token
                },
            })
            if(response.ok)
            {   
                let productDetails =await response.json();
                setproductDetails(productDetails);
                console.log(productDetails);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
        cart_details()
    },[change,product]);

    if(!product)
        return(<></>)
        // style={{marginRight: spacing + 'em'}}
        return(
    <div className="shopping-cart" style={{height: 40*product.length+10 + 'vh'}}>
    <h1>SHOPPING CART </h1> 
    <div className='cart-items'>
    <ul>
    {product.map((value,id) => <li key={value.id}><ButtonDisplay  details={value} index={value.id} change={change} setchange={setchange} /> </li>)}
    <button className='pay'>PAY NOW</button>
    </ul>
    </div>
    </div>
    )}
    function ButtonDisplay({details, setchange,index}){
           const [count,setCount]= useState(details.qty);
           async function setqty(update_qty,index){
           //setcount is updating the value of count asynchronously....
            let cart_item={qty:update_qty,product_id:index,select:"qty"};
            // setchange("Q");
            try{
            const token = sessionStorage.getItem('token')
            setCount(update_qty);
            const response = await fetch(`${process.env.REACT_APP_baseURL}/mycart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token:token
                },
                body: JSON.stringify(cart_item)        
                
            })
            if(response.ok)
                {
                    console.log("quantity updated");             
                } 
           }   
            catch(err){
            console.log(err);
           }     
        }
    async function delete_item(id){
        setchange("D");
        try {
            var body = {id:id};
            const token = sessionStorage.getItem('token')
            const response = await fetch(`${process.env.REACT_APP_baseURL}/mycart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                console.log("done");
            }
        }
        catch (err) {
            console.error(err.message)
        }
    }
    return(
    <>
    {/* <h4>{details.title}</h4> */}
    <ItemProfile className="pic" key={index} details={details} />
    {/* <img src={details.image_url} alt="img" width="5%"/> */}
    <button className="qty" onClick={()=>{if(count>1) setqty(count-1,index); else setqty(1,index)}}>-</button><button className='count'>{count}</button><button className="qty" width="" onClick={()=>{setqty(count+1,index)}}>+</button><span className='cost'>Total Cost:  Rs {details.cost*count}</span> 
    <button  className="delete" onClick={()=>{delete_item(index)}}><img src="https://img.favpng.com/19/7/1/delete-button-png-favpng-nNzUqv3qzzzH3cqYQhDRfPLQz.jpg" alt="delete" width="80%" height="60%"/></button>
    </>
)
}
