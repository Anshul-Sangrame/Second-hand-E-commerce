import './Style/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// const details = {
//     id: 23,
//     title: "Apple phone",
//     image_url: "https://images.unsplash.com/photo-1592832122594-c0c6bad718b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
//     cost: 9000,
//     rating: 2.89,
//     tag: 'phone',
//     views: 10
// }

function ItemProfile({ details }) {
    const nav = useNavigate()

    const handleClick = () => {
        nav(`/product/${details.id}`);
    };
    return (
        <div className='item-profile' onClick={handleClick}>
            <img src={details.image_url} alt={details.title} />
            <h3>{details.title}</h3>
            <h2>&#8377; {details.cost}</h2>
            <div><FontAwesomeIcon icon={faEye} beat /> {details.views}</div>
            {/* <Ratting rate={details.rating} /> */}
            <div>
                <div className='tag'>
                    {details.tag}
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    const [data, setData] = useState(null);

    async function getData() {
        try {
            const token = sessionStorage.getItem('token')
            const res = await fetch('http://localhost:5000/home', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })

            if (res.ok) {
                const body = await res.json();
                if(body)setData(body.data);
            }
        } catch (err) {
            console.log("Error: " + err.message);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    if (!data) return <></>

    console.log("home redered");
    return (
        <div className="home">
            {data.map(item => <ItemProfile key={item.id} details={item} />)}
        </div>
    )
}