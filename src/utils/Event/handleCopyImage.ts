import { copyImgToClipboard } from './copyImageToClipboard';
import ValidationMessages from 'components/Validations/ValidationMessages';

type SetToastMessageType = (message: string) => void;
type SetToastType = (value: boolean) => void;

export default async function handleCopyImage(
    imageUrl: string,
    setToastMessage: SetToastMessageType,
    setToast: SetToastType
): Promise<void> {
    try {
        await copyImgToClipboard(imageUrl);
        setToastMessage(ValidationMessages.SUCCESS_COPY_IMG);
        setToast(true);
    } catch (error) {
        setToastMessage(ValidationMessages.FAILED_EVENT);
        setToast(true);
    }
}
