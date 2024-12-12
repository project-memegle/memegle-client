import React from 'react';

interface ImageModalProps {
    imageUrl: string;
    tagList: string[];
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
    imageUrl,
    tagList,
    onClose,
}) => {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal__container">
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
                <ul className="tag-list">
                    {tagList &&
                        tagList.map((tag, index) => (
                            <li className="tag-list__item" key={index}>
                                {tag}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default ImageModal;
