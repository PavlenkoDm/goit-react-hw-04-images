import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export function Modal({ modalImageData, closeModal }) {
    
    const { urlBigImage, alt } = modalImageData;

    useEffect(() => {

        const onEscCloseModal = event => {
            if (event.code !== 'Escape') return;
            closeModal();
        };

        window.addEventListener('keydown', onEscCloseModal);

        return () => {
            window.removeEventListener('keydown', onEscCloseModal);
        };

    }, [closeModal]);

    const handleOverlayClick = event => {
        if (event.target !== event.currentTarget) return;

        return closeModal();
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
