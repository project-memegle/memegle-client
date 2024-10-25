import SearchSection from '../Search/SearchSection';
import logo from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

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
        <header className="c-header">
            <section className="c-top-bar">
                <section className="c-top-bar__brand">
                    <button onClick={navigateToHome}>
                        <img className="logo" src={String(logo)} alt="logo" />
                    </button>
                </section>
                <section className="c-top-bar__user c-top-bar-user">
                    <button
                        className="c-top-bar-user__log button__white-font"
                        onClick={navigateToLogIn}
                    >
                        업로드
                    </button>
                    <button
                        className="c-top-bar-user__log button__white-font"
                        onClick={() => logOut()}
                    >
                        로그아웃
                    </button>
                    {/* <button
                        className="c-top-bar-user__log button__white-font"
                        onClick={navigateToLogIn}
                    >
                        로그인
                    </button> */}
                    <button
                        className="c-top-bar-user__notification"
                        onClick={navigateToNotification}
                    >
                        <i className="c-icon">notifications</i>
                    </button>
                </section>
            </section>
            <SearchSection />
        </header>
    );
}
