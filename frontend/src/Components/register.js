import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        try {
            e.preventDefault();
            var body = { CustomerDetails };

            if (CustomerDetails.password !== CustomerDetails.password2)
                alert(" password doesn't match with confirm password");
            if (CustomerDetails.password.length < 6)
                alert("password length must be atleast 6 letters");
            if (CustomerDetails.mobileNumber.length !== 10)
                alert("Mobile Number is invalid!");
            else {
                const response = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const parsedData = await response.json();
                if (response.ok)
                {
                    return nav('/');
                }
                alert(parsedData.msg);
            }
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <div>
            <h2>register please!!!</h2>
            <form className='Registration' onSubmit={submitForm} >
                {/* e.target.name depends on the order . */}
                <div>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="firstName"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="lastName"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        placeholder="Confirm password"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="mobileNumber"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="date"
                        id="DOB"
                        name="DOB"
                        placeholder="Date Of Birth"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="address"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="state"
                        onChange={(e) => setCustomerDetails({ ...CustomerDetails, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                {/* <div>
        <input
            type="text"
            id="city_pincode"
            name="city_pincode"
            placeholder="City_pincode"
            onChange={(e) => setCustomerDetails({...CustomerDetails,[e.target.name]: e.target.value})}
            required
        />
    </div> */}
                <div>
                    <button type="submit" value="Register">Register </button>
                </div>
                <Link to="/">Already registered? Login here</Link>
            </form>
        </div>
    )
}
