import React from 'react';

interface DownloadLinkProps {
    url: string;
    filename: string;
    onDownload: () => void;
}

const DownloadLink: React.FC<DownloadLinkProps> = ({ url, filename, onDownload }) => {
    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            onDownload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="result__item-download" onClick={handleDownload}>
            <i className="c-icon">download</i>
        </div>
    );
};

export default DownloadLink;