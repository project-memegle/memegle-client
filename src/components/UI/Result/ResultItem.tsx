import { useState } from 'react';
import { copyImgToClipboard } from 'utils/copyImageToClipboard';
import ToastMessage from '../ToastMessage/ToastMessage';
import ValidationMessages from 'components/Validations/ValidationMessages';

export type ResultItemProp = {
    id: number;
    imageUrl: string;
};

export default function ResultItem({ id, imageUrl }: ResultItemProp) {
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    async function copyImage() {
        try {
            await copyImgToClipboard(imageUrl);
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
            <img src={imageUrl} alt={`img-${id}`} />
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </article>
    );
}
