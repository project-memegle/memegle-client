import useNavigateHandler from '../../../hooks/useNavigateHandler';

export default function Header() {
    const navigate = useNavigateHandler();

    function logOut() {
        alert('로그아웃');
    }

    function navigateToHome() {
        navigate('/');
    }
    function navigateToLogIn() {
        navigate('/login');
    }
    function navigateToSignUp() {
        navigate('/signup');
    }
    function navigateToNotification() {
        navigate('/notifications');
    }

    return (
        <header>
            <button onClick={navigateToHome}>홈</button>
            <button onClick={navigateToLogIn}>로그인</button>
            <button onClick={() => logOut()}>로그아웃</button>
            <button onClick={navigateToSignUp}>회원가입</button>
            <button onClick={navigateToNotification}>알림</button>
        </header>
    );
}
