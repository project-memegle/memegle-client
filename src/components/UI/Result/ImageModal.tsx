import React from 'react';

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal__content">
                <i className="modal__close c-icon">close</i>
                <img
                    src={imageUrl}
                    alt="Modal Content"
                    className="modal__image"
                />
            </div>
        </div>
    );
};

export default ImageModal;
