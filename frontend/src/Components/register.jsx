import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './Style/register.css';
export default function Register() {

    const [CustomerDetails, setCustomerDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
        mobileNumber: "",
        DOB: "",
        city: "",
        address: "",
        region: ""
    })

    const nav = useNavigate();
    async function submitForm(e) {
        e.preventDefault();
        try {
            var body = { CustomerDetails };

            if (CustomerDetails.password !== CustomerDetails.password2)
                alert(" password doesn't match with confirm password");
            if (CustomerDetails.password.length < 6)
                alert("password length must be atleast 6 letters");
            if (CustomerDetails.mobileNumber.length !== 10)
                alert("Mobile Number is invalid!");
            else {
                const response = await fetch(`${process.env.REACT_APP_baseURL}/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const parsedData = await response.json();
                if (response.ok)
                {
                    console.log(parsedData.token)
                    sessionStorage.setItem('token',parsedData.token)
                    nav('/home');
                    return;
                }
                alert(parsedData.msg);
            }
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <div className='Register-Main'>
        <div className='Registration'>
        <h2>SIGN UP</h2>
        <form onSubmit={submitForm} >
       {/* e.target.name depends on the order . */}
        {/* <div className="main"> */}
            <label>FIRSTNAME</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="FirstName"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
                required
            />
            <label>LASTNAME</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="LastName"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
                required
            />
            <label>EMAIL</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
            />
            
            <label>PASSWORD</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="At least 6 letters"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
                required
            />
        <label>CONFIRM PASSWORD</label>
            <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Confirm password"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}     
                required
            />
        <label>MOBILE NUMBER</label>
            <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Mobile Number"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
                required
            />
        <label>DATE OF BIRTH</label>
            <input
                type="date"
                id="DOB"
                name="DOB"
                placeholder="Date Of Birth"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
                required
            />
        <label>STREET ADDRESS</label>
            <input
                type="text"
                id="street_address"
                name="street_address"
                placeholder="Street_address"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
                required
            />
        <label>CITY</label>
            <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
                required
            />
        <label>REGION</label>
            <input
                type="text"
                id="region"
                name="region"
                placeholder="Region"
                onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
                required
            />

        <div>
            <input type="submit" value="REGISTER" className="submit" />
        </div>
        <a href="/">Already registered? Login here</a>
        </form>
    </div>
    </div>
    )
}
