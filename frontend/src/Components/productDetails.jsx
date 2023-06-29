import { useParams } from "react-router-dom";
import './Style/productDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faEye, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

export default function Product() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/productDetails/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token
                    }
                })

                if (res.ok) {
                    const parsedData = await res.json();
                    setData(parsedData.data);
                }
            } catch (err) {
                console.error(err.message);
            }
        }

        getData()
    }, [id]);

    if (!data) return <></>;

    return (
        <div className="product-details">
            <div className="photo">
                <div className="photo-bg">
                    <img src={data.image_url} alt={data.title} />
                    {/* <h1>f</h1> */}
                </div>
            </div>
            <div className="details">
                <div className="head">
                    <div style={{ color: "#888a85", }}>
                        <FontAwesomeIcon icon={faHashtag} /> {data.id}
                    </div>
                    <h1>{data.title}</h1>
                    <div>
                        <FontAwesomeIcon icon={faEye} /> {data.views}
                    </div>
                    <div className="tag">{data.tag}</div>
                    <div className="btns">
                        <button>Add to Cart</button>
                        <button>Buy Now</button>
                    </div>
                    <hr />
                    <h1><FontAwesomeIcon icon={faIndianRupeeSign} /> {data.cost}</h1>

                </div>

                <div className="qty">
                    <strong>Available: </strong>{data.qty}
                </div>
                <hr />
                <div className="desc">
                    <h2>Description</h2>
                    <p>{data.description}</p>
                </div>
                <hr />
                <div className="contact">
                    <h2>Contact</h2>
                    <p>{data.first_name} {data.last_name}</p>
                    <p>+91 {data.phone}</p>
                    <p>{data.address}</p>
                    <p>{data.city}</p>
                    <p>{data.state}</p>
                </div>
            </div>
        </div>
    )
}