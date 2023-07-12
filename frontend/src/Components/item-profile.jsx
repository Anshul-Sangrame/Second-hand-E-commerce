import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faX, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './Style/itemProfile.css'

export function ItemProfile({ details, onDelete, onEdit }) {
    const nav = useNavigate()

    const handleClick = () => {
        nav(`/product/${details.id}`);
    };

    function handleEdit(e) {
        e.stopPropagation();
        onEdit();
    }

    function handleDelete(e) {
        e.stopPropagation();
        onDelete();
    }

    return (
        <div className='item-profile' onClick={handleClick}>
            <div className="buttons">
                {
                    onEdit &&
                    <FontAwesomeIcon
                        onClick={handleEdit}
                        icon={faPenToSquare}
                        style={{
                            "--fa-primary-color": "#204a87",
                            "--fa-secondary-color": "#babdb6"
                        }}
                    />
                }
                {
                    onDelete && 
                    <FontAwesomeIcon
                        onClick={handleDelete}
                        icon={faX}
                        style={{ color: "#ef2929", }}
                    />
                }
            </div>
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