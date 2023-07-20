import { createPortal } from 'react-dom';
import './Style/modal.css'
import { useEffect } from 'react';

export default function Modal({ children, showModal }) {
    useEffect(() => {
        if (showModal)
        {
            document.body.style.overflow = 'hidden';
        }
        else
        {
            document.body.style.overflow = '';
        }
    },[showModal])
    return createPortal(
        <div className={`modal-container${showModal? " show":""}`}>
            {children}
        </div>
        ,
        document.body
    )
}