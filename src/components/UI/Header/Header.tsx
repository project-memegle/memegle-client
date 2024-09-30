import { useState } from 'react';
import LogIn from '../../../pages/LogIn';
import SignUp from '../../../pages/SignUp';
import useNavigateHandler from '../../../hooks/useNavigateHandler';

export default function Header() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);

    const navigate = useNavigateHandler();

    const _signup = 'signup';
    const _login = 'login';
    function showModal(type: 'login' | 'signup') {
        setModalType(type);
        setModalIsOpen(true);
    }

    function hideModal() {
        setModalIsOpen(false);
        setModalType(null);
    }

    function logOut() {
        alert('로그아웃');
    }

    function navigateToHome() {
        navigate('/');
    }
    function navigateToNotification() {
        navigate('/notifications');
    }

    return (
        <header>
            {modalIsOpen && modalType === _login && (
                <LogIn onClose={hideModal} />
            )}
            {modalIsOpen && modalType === _signup && (
                <SignUp onClose={hideModal} />
            )}
            <button onClick={navigateToHome}>홈</button>
            <button onClick={() => showModal(_login)}>로그인</button>
            <button onClick={() => logOut()}>로그아웃</button>
            <button onClick={() => showModal(_signup)}>회원가입</button>
            <button onClick={navigateToNotification}>알림</button>
        </header>
    );
}
