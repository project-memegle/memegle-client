import React from 'react';

interface TooltipProps {
    message: string;
    onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ message, onClose }) => {
    return (
        <section className="c-tooltip" onClick={onClose}>
            <div className="c-tooltip__container">
                <p>{message}</p>
                <i className="c-icon">close</i>
            </div>
        </section>
    );
};

export default Tooltip;