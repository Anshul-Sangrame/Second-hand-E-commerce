import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './Style/itemProfile.css'

export function ItemProfile({ details }) {
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
            <div>
                <div className='tag'>
                    {details.tag}
                </div>
            </div>
        </div>
    )
}