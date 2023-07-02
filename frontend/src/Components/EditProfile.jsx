import {useEffect, useState} from 'react';
import  './Style/EditProfile.css';
export default  function  EditProfile (){
    const [UserEditDetails,setUserEditDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        state: ""
    })
    useEffect(() =>  {
        const  userDetails = async() => {
            try{
        const token = sessionStorage.getItem('token')
        const response = await fetch("http://localhost:5000/editprofile",{
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            token: token
        },
    })
    if(response.ok){
        const userDetailsget = await response.json();
        console.log("user details recieved");
        console.log(userDetailsget);
        setUserEditDetails(userDetailsget);
    }
    }
   catch(err){
    console.log("user details not recieved"); 
    console.error(err.message)
        }
    }
    userDetails()
    },[]);

    async function submitChanges(e)  {
        e.preventDefault();
    try{ 
        var body= UserEditDetails;
        const token = sessionStorage.getItem('token')
        const response = await fetch("http://localhost:5000/editprofile",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            token: token
        },
        body: JSON.stringify(body)
    })
    if(response.ok){
        console.log("Changes saved");
    }
    }   
   catch(err){
            console.error(err.message)
        }
    }   
    return(

    <div className='EditProfile'>
    <header></header>
    <div className='editProfile-main' >
    <h2>EDIT PROFILE</h2>
    <img src='https://www.qed42.com/sites/default/files/styles/social_media/public/2022-02/Best%20Practices%20For%20eCommerce%20Website%20Design.png?itok=UiGZ73XD' alt='e-commerce'/>
    <form onSubmit={submitChanges}>
    {/* e.target.name depends on the order . */}
        <label>FIRSTNAME</label>
        <input
            type="text"
            id="firstName"
            name="first_name"
            value={UserEditDetails.first_name}
            onChange={(e) => setUserEditDetails({...UserEditDetails,[e.target.name]: e.target.value})}
    
        />
        <label>LASTNAME</label>
        <input
            type="text"
            id="lastName"
            name="last_name"
            value={UserEditDetails.last_name}
        
            onChange={(e) => setUserEditDetails({...UserEditDetails,[e.target.name]: e.target.value})}
           
        />
        <label>EMAIL</label>
        <input
            type="email"
            id="email"
            name="email"
            value={UserEditDetails.email}
            onChange={(e) => setUserEditDetails({...UserEditDetails,[e.target.name]: e.target.value})}
        />
        <label>MOBILE NUMBER</label>
        <input
            type="text"
            id="mobileNumber"
            name="phone"
            value={UserEditDetails.phone}
            onChange={(e) => setUserEditDetails({...UserEditDetails,[e.target.name]: e.target.value})}
    
        />
        <div className='Address'>
        <span>ADDRESS DETAILS</span>
        <div id='street_address'>
        <label>STREET ADDRESS</label>
        <input
            type="text"
            name="address"
            value={UserEditDetails.address}
            onChange={(e) => setUserEditDetails({...UserEditDetails,[e.target.name]: e.target.value})}
        />  
        </div> 
        <div id='city'>
        <label >CITY</label>
        <input
            type="text"
            name="city"
            value={UserEditDetails.city}
            onChange={(e) => setUserEditDetails({...UserEditDetails,[e.target.name]: e.target.value})}
        
        />
        </div>
        <div id="state">
        <label >REGION</label>
        <input
            type="text"
            name="state"
            value={UserEditDetails.state}
            onChange={(e) => setUserEditDetails({...UserEditDetails,[e.target.name]: e.target.value})}
        />
        </div>
        </div>
        <button>SAVE CHANGES</button>
    </form>
    </div>
</div>
)}
