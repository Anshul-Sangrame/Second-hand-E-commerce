import { createPortal } from 'react-dom';
import './Style/addCartModal.css'
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Cart from './cart';


export default function Modal({ data, setShowModal, showModal }) {
    const [W, setW] = useState(0);
    const [qty, setQTY] = useState(1);
    const myRef = useRef(null);
    const nav = useNavigate();

    // closing modal function
    function onClose() {
        setShowModal(false);
        setQTY(1);
        document.body.style.overflow = '';
    }

    // finding width of container
    useEffect(() => {
        function handleSize() {
            setW(myRef.current.offsetWidth);
        }

        handleSize();

        window.addEventListener("resize", handleSize);
        return () => {
            window.removeEventListener("resize", handleSize);
        }
    }, [myRef])

    async function handleSubmit(e)
    {
        // e.preventDefault();
        try {
            const body = {
                select: "cart",
                qty: qty,
                product_id: data.id,
            };
            const token = sessionStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_baseURL}/mycart`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    token: token,
                },
                body: JSON.stringify(body),
            })

            if (res.ok)
            {   nav('/mycart');
                window.location.reload()
            }
        } catch (err) {
            // nav('/mycart');
            // console.log(err.message);
        }
    }

    function handleQty(e) {
        const val = Number(e.target.value);
        if (Number.isInteger(val)) {
            if (val > data.qty) {
                setQTY(data.qty);
            }
            else if (val < 1) {
                setQTY(1);
            }
            else {
                console.log(val);
                setQTY(val);
            }
        }
        else {
            setQTY(1);
        }
    }
    return createPortal(
        <div className={`modal-container${showModal ? " show" : ""}`} onClick={onClose} >
            <div
                style={{ "--width": W + "px" }}
                className={`addCartPopUp${showModal ? " show" : ""}`}
                onClick={e => e.stopPropagation()}
            >
                <div ref={myRef} className="container">
                    <FontAwesomeIcon
                        className="cross"
                        onClick={onClose}
                        size="xl"
                        icon={faX}
                    />
                    <div className="AddCartcontent">
                        <h2>Your Cart</h2>
                        <hr />
                        <div className="details">
                            <img src={data.image_url} alt={data.title} />
                            <div className="det">
                                <h3>{data.title}</h3>
                                <h4>
                                    <FontAwesomeIcon
                                        icon={faIndianRupeeSign}
                                    />
                                    {data.cost}
                                </h4>
                            </div>
                        </div>
                        <div className="qty">
                            Quantity: <input value={qty} onBlur={handleQty} onChange={e => setQTY(e.target.value)} type="number" />
                        </div>
                        <hr style={{ "backgroundColor": "#E8E8E8" }} />
                        <button onClick={handleSubmit}>Add to cart</button> *
                    </div>
                </div>
            </div>
        </div>
        ,
        document.body
    )
}