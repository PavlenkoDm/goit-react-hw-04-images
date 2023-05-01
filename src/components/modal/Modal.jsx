import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export function Modal({ modalImageData, closeModal, escCloseModal }) {
    const { urlBigImage, alt } = modalImageData;

    useEffect(() => {
        window.addEventListener('keydown', escCloseModal);

        return () => {
            window.removeEventListener('keydown', escCloseModal);
        };
    }, []);

    const handleOverlayClick = event => {
        if (event.target !== event.currentTarget) return;

        closeModal();
    };

    return createPortal(
        <div className="Overlay" onClick={handleOverlayClick}>
            <div className="Modal">
                <img src={urlBigImage} alt={alt} />
            </div>
        </div>,
        modalRoot
    );
}

