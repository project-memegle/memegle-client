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
        <header className="c-header header__container">
            <section className="c-top-bar header__containe-top">
                <section className="c-top-bar__brand">
                    <button onClick={navigateToHome}>
                        <img className="logo" src={String(logo)} alt="logo" />
                    </button>
                </section>
                <section className="c-top-bar__user c-top-bar-user header__text">
                    <button
                        className="c-top-bar-user__log"
                        onClick={navigateToLogIn}
                    >
                        로그인
                    </button>
                    {/* <button className="c-top-bar-user__log" onClick={() => logOut()}>로그아웃</button> */}
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
