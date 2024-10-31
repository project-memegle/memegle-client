import { useEffect, useState } from 'react';

interface ToastMessageProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
    message,
    duration = 1500,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 500);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <section
            className={`c-toast ${
                isVisible ? 'slide-top-in' : 'slide-top-out'
            }`}
        >
            <section className="c-toast__container">
                <section className="c-toast__container-layout">
                    <p>{message}</p>
                </section>
            </section>
        </section>
    );
};

export default ToastMessage;
