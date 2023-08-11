import { useEffect, useState } from 'react';
import './Style/EditProfile.css';
export default function EditProfile() {
    const [UserEditDetails, setUserEditDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        state: ""
    })
    useEffect(() => {
        const userDetails = async () => {
            try {
                const token = sessionStorage.getItem('token')
                const response = await fetch(`${process.env.REACT_APP_baseURL}/editprofile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token
                    },
                })
                if (response.ok) {
                    const userDetailsget = await response.json();
                    // console.log("user details recieved");
                    // console.log(userDetailsget);
                    setUserEditDetails(userDetailsget);
                }
            }
            catch (err) {
                // console.log("user details not recieved");
                console.error(err.message)
            }
        }
        userDetails()
    }, []);

    async function submitChanges(e) {
        e.preventDefault();
        try {
            var body = UserEditDetails;
            const token = sessionStorage.getItem('token')
            const response = await fetch("http://localhost:5000/editprofile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                console.log("Changes saved");
            }
        }
        catch (err) {
            console.error(err.message)
        }
    }
    return (

        <div className='EditProfile'>
            {/* <header></header> */}
            <div className='editProfile-main' >
                <h1>EDIT PROFILE</h1>
                <img src='https://img.freepik.com/free-photo/online-purchasing-payment-e-commerce-banking_53876-127604.jpg?w=1380&t=st=1691746489~exp=1691747089~hmac=dcb7e54e644b0483439ca7b64f25484114ec8c94cc0cace3c06c9e95cf396813' alt='e-commerce' />
                <form onSubmit={submitChanges}>
                    {/* e.target.name depends on the order . */}
                    <label>FIRSTNAME</label>
                    <input
                        type="text"
                        id="firstName"
                        name="first_name"
                        value={UserEditDetails.first_name}
                        onChange={(e) => setUserEditDetails({ ...UserEditDetails, [e.target.name]: e.target.value })}

                    />
                    <label>LASTNAME</label>
                    <input
                        type="text"
                        id="lastName"
                        name="last_name"
                        value={UserEditDetails.last_name}

                        onChange={(e) => setUserEditDetails({ ...UserEditDetails, [e.target.name]: e.target.value })}

                    />
                    <label>EMAIL</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={UserEditDetails.email}
                        onChange={(e) => setUserEditDetails({ ...UserEditDetails, [e.target.name]: e.target.value })}
                    />
                    <label>MOBILE NUMBER</label>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="phone"
                        value={UserEditDetails.phone}
                        onChange={(e) => setUserEditDetails({ ...UserEditDetails, [e.target.name]: e.target.value })}

                    />
                    <div className='Address'>
                        <span>ADDRESS DETAILS</span>
                        <div id='street_address'>
                            <label>STREET ADDRESS</label>
                            <input
                                type="text"
                                name="address"
                                value={UserEditDetails.address}
                                onChange={(e) => setUserEditDetails({ ...UserEditDetails, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div id='city'>
                            <label >CITY</label>
                            <input
                                type="text"
                                name="city"
                                value={UserEditDetails.city}
                                onChange={(e) => setUserEditDetails({ ...UserEditDetails, [e.target.name]: e.target.value })}

                            />
                        </div>
                        <div id="state">
                            <label >REGION</label>
                            <input
                                type="text"
                                name="state"
                                value={UserEditDetails.state}
                                onChange={(e) => setUserEditDetails({ ...UserEditDetails, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>
                    <button>SAVE CHANGES</button>
                </form>
            </div>
        </div>
    )
}
