import './Style/home.css'
import { useEffect, useState } from 'react' 
import { ItemProfile } from './item-profile'

// const details = {
//     id: 23,
//     title: "Apple phone",
//     image_url: "https://images.unsplash.com/photo-1592832122594-c0c6bad718b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
//     cost: 9000,
//     rating: 2.89,
//     tag: 'phone',
//     views: 10
// }


export default function Home() {
    const [data, setData] = useState(null);

    async function getData() {
        try {
            const token = sessionStorage.getItem('token')
            const res = await fetch(`${process.env.REACT_APP_baseURL}/home`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            })

            if (res.ok) {
                const body = await res.json();
                if (body) setData(body.data);
            }
        } catch (err) {
            console.log("Error: " + err.message);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    if (!data) return <></>

    
    return (
        <div className="home">
            {data.map(item => <ItemProfile key={item.id} details={item} />)}
        </div>
    )
}