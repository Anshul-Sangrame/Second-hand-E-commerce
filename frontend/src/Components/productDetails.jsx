import { useParams } from "react-router-dom";
import './Style/productDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faEye, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import Modal from "./AddCartModal";

export default function Product() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Timer
    useEffect(() => {
        const interval_id = setTimeout(() => {
            console.log("10 sec passed");
            // increment the view here
        }, 1000 * 10);
        return () => {
            clearTimeout(interval_id);
        }
    }, [])

    // Fetching data
    useEffect(() => {
        const getData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`${process.env.REACT_APP_baseURL}/productDetails/${id}`, {
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
                console.error("Error: " + err.message);
            }
        }

        getData()
    }, [id]);

    // If data is null
    if (!data) return <></>;

    return (
        <div className="product-details">
            <Modal
                showModal={showModal}
                data={data}
                setShowModal={setShowModal}
            />
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
                        <button
                            onClick={() => {
                                setShowModal(true);
                                document.body.style.overflow = 'hidden';
                            }}
                        >
                            Add to Cart
                        </button>
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