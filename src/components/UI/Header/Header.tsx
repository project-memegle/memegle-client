import { useState } from 'react';
import LogIn from '../../../pages/LogIn';

export default function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    function showModal() {
        setModalIsOpen(true);
    }

    function hideModal() {
        setModalIsOpen(false);
    }

    return (
        <header>
            {modalIsOpen && <LogIn onClose={hideModal} />}
            <button onClick={showModal}>로그인</button>
        </header>
    );
}
