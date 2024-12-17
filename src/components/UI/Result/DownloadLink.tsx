import React from 'react';
import getValidationMessages from 'components/Validations/ValidationMessages';

interface DownloadLinkProps {
    url: string;
    filename: string;
    onDownload: () => void;
    setToastMessage: (message: string) => void;
    setToast: (value: boolean) => void;
}

const DownloadLink: React.FC<DownloadLinkProps> = ({
    url,
    filename,
    onDownload,
    setToastMessage,
    setToast,
}) => {
    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const ValidationMessages = getValidationMessages();
        try {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            onDownload();
            setToastMessage(ValidationMessages.SUCCESS_IMAGE_DOWNLOAD);
            setToast(true);
        } catch (error) {
            console.error(error);
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        }
    };

    return (
        <div className="result__item-download" onClick={handleDownload}>
            <i className="c-icon">download</i>
        </div>
    );
};

export default DownloadLink;
