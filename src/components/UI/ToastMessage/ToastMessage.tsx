import React, { useEffect } from 'react';

interface ToastMessageProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
    message,
    duration = 3000,
    onClose,
}) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <section className="c-toast slide-top">
            <section className="c-toast__container">
                <section className="c-toast__container-layout">
                    <p>{message}</p>
                </section>
            </section>
        </section>
    );
};

export default ToastMessage;
