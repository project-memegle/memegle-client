import React from 'react';

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal__content">
                <div className="modal__close">
                    <i className="c-icon">close</i>
                </div>
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
