import React, { useState } from 'react';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import ToastMessage from '../ToastMessage/ToastMessage';
import DownloadLink from './DownloadLink';
import handleCopyImage from 'utils/Event/handleCopyImage';

interface ImageModalProps {
    result: SearchResultItemDTO;
    onClose: () => void;
    onOpenModal: (selectedResult: SearchResultItemDTO) => void;
    onImageLoad: () => void;
    handleDownloadSuccess: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
    result,
    onClose,
    onOpenModal,
    onImageLoad,
    handleDownloadSuccess,
}) => {
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    async function handleCopy() {
        await handleCopyImage(result.imageUrl, setToastMessage, setToast, () =>
            onOpenModal(result)
        );
    }

    return (
        <div className="modal" onClick={onClose}>
            <div
                className="modal__container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal__content">
                    <div className="modal__content-copy" onClick={handleCopy}>
                        <i className="c-icon">file_copy</i>
                    </div>{' '}
                    <div className="modal__content-close" onClick={onClose}>
                        <i className="c-icon">close</i>
                    </div>
                    <img
                        src={result.imageUrl}
                        alt="Modal Content"
                        className="modal__image"
                        onLoad={onImageLoad}
                    />
                    <DownloadLink
                        url={result.imageUrl}
                        filename={`${result.imageCategory}${result.id}`}
                        onDownload={handleDownloadSuccess}
                        setToastMessage={setToastMessage}
                        setToast={setToast}
                    />
                    {toast && (
                        <ToastMessage
                            message={toastMessage}
                            onClose={() => setToast(false)}
                        />
                    )}
                </div>
                <ul className="tag-list">
                    {result.tagList &&
                        result.tagList.map((tag, index) => (
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
