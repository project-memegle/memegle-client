import getValidationMessages from 'components/Validations/ValidationMessages';
import { copyImgToClipboard } from './copyImageToClipboard';

type SetToastMessageType = (message: string) => void;
type SetToastType = (value: boolean) => void;
type SetModalVisibleType = (value: boolean) => void;

export default async function handleCopyImage(
    imageUrl: string,
    setToastMessage: SetToastMessageType,
    setToast: SetToastType,
    setModalVisible: SetModalVisibleType
): Promise<void> {
    const ValidationMessages = getValidationMessages();
    try {
        await copyImgToClipboard(imageUrl);
        setToastMessage(ValidationMessages.SUCCESS_COPY_IMG);
        setToast(true);
        setModalVisible(true);
    } catch (error) {
        setToastMessage(ValidationMessages.FAILED_EVENT);
        setToast(true);
    }
}
