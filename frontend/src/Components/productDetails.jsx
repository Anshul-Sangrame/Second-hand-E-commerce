import { useParams } from "react-router-dom";
import './Style/productDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faEye } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

export default function Product() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/productDetails/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
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
                <img src={data.image_url} alt={data.title} />
            </div>
            <div className="details">
                <div style={{ color: "#888a85", }}>
                    <FontAwesomeIcon icon={faHashtag} /> {data.id}
                </div>
                <h2>{data.title}</h2>
                <FontAwesomeIcon icon={faEye} beat /> {data.views}
                <h3>Description</h3>
                <p>{data.description}</p>
            </div>
        </div>
    )
}