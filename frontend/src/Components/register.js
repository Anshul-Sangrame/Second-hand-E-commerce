import {useState} from 'react';
 
export default function Register (){
    const [firstName,setfirstName] = useState("");
    const [lastName,setlastName] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [password2,setpassword2] = useState("");
    const [mobileNumber,setMobileNumber] = useState("");
    const [DOB,setDOB] = useState("");
    const [city,setcity] = useState("");
    const [street_address,setstreet_address] = useState("");
    const [city_pincode,setcity_pincode] = useState("");
    const [region,setregion] = useState("");
    
    function submitForm(e)  {
      e.preventDefault();
      var body ={firstName,lastName,email,password,mobileNumber,DOB,city,street_address,city_pincode,region};          

    if(password!==password2)
      alert(" password doesn't match with confirm password");
    if(password.length<6)
     alert("password length must be atleast 6 letters" );
    if(mobileNumber.length!==10)
        alert("Mobile Number is invalid!" );
    else{
    fetch("http://localhost:5000/register",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
    }
    ).then((response) =>{
        return response.json();
    }).catch(
        (err)=>{
            console.error(err.message)
        }
    )}}
    return(
    <div>
    <h2>register please!!!</h2>
    <form className='Registration' onSubmit={submitForm} >
    <div>
        <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="firstName"
            onChange={(e) => setfirstName(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="lastName"
            onChange={(e)=> setlastName(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e)=> setemail(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm password"
            onChange={(e) => setpassword2(e.target.value)}
           
            required
        />
    </div>
    <div>
        <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            placeholder="mobileNumber"
            onChange={(e) => setMobileNumber(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="date"
            id="DOB"
            name="DOB"
            placeholder="Date Of Birth"
            onChange={(e) => setDOB(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="text"
            id="street_address"
            name="street_address"
            placeholder="Street_address"
            onChange={(e) => setstreet_address(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            onChange={(e) => setcity(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="text"
            id="region"
            name="region"
            placeholder="Region"
            onChange={(e) => setregion(e.target.value)}
            required
        />
    </div>
    <div>
        <input
            type="text"
            id="city_pincode"
            name="city_pincode"
            placeholder="City_pincode"
            onChange={(e) => setcity_pincode(e.target.value)}
            required
        />
    </div>
    <div>
        <input type="submit" value="Register" />
    </div>
    <a href="/login">Already registered? Login here</a>
    </form>
</div>
)
}
