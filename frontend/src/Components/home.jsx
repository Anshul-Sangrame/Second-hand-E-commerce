import './Style/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke, faEye } from '@fortawesome/free-solid-svg-icons'

const details = {
    id: 23,
    title: "Apple phone",
    src: "https://images.unsplash.com/photo-1592832122594-c0c6bad718b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    cost: 9000,
    rating: 2.89,
    tag: 'phone',
    views: 10
}

function Ratting({ rate }) {
    let stars = [];

    for (let i = 1; i < rate; i++) {
        stars.push(<FontAwesomeIcon icon={faStar} />)
    }

    if (!Number.isInteger(rate)) {
        stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />)
    }
    else {
        stars.push(<FontAwesomeIcon icon={faStar} />)
    }

    return (
        <div className='stars'>
            {stars}
        </div>
    )
}

function ItemProfile({ details }) {
    return (
        <div className='item-profile'>
            <img src={details.src} alt={details.title} />
            <h3>{details.title}</h3>
            <h2>&#8377; {details.cost}</h2>
            <div><FontAwesomeIcon icon={faEye} beat/> {details.views}</div>
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
    return (
        <div className="home">
            <ItemProfile details={details} />
            <ItemProfile details={details} />
            <ItemProfile details={details} />
            <ItemProfile details={details} />
            <ItemProfile details={details} />
        </div>
    )
}