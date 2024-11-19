import { KeyboardEvent } from 'react';

const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission on Enter key press
    }
};

export default handleKeyDown;
