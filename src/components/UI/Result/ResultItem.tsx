import { useState } from 'react';
import { copyImgToClipboard } from 'utils/Event/copyImageToClipboard';
import ToastMessage from '../ToastMessage/ToastMessage';
import ValidationMessages from 'components/Validations/ValidationMessages';
import { ResultItemDTO } from 'services/dto/ResultDto';

export default function ResultItem({
    id,
    categoryName,
    imageCategory,
    titleImageUrl,
    lastMemeImageRegistTime,
}: ResultItemDTO) {
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    async function copyImage() {
        try {
            await copyImgToClipboard(titleImageUrl);

            setToastMessage(ValidationMessages.SUCCESS_COPY_IMG);
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        }
    }

    return (
        <article className="result__item" onClick={copyImage}>
            <div className="result__item-copy">
                <i className="c-icon">file_copy</i>
            </div>
            <img src={titleImageUrl} alt={`img-${id}`} />
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </article>
    );
}
