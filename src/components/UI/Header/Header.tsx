import SearchSection from '../Search/SearchSection';
import logo from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import alertLogo from '../../../assets/icons/ic_alert.svg';

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
        <header className='header__container'>
            <section className="header__containe-top">
                <section>
                    <button onClick={navigateToHome}>
                        <img className="logo" src={String(logo)} alt="logo" />
                    </button>
                </section>
                <section className='header__text'>
                    <button onClick={navigateToLogIn}>로그인</button>
                    {/* <button onClick={() => logOut()}>로그아웃</button> */}
                    <button onClick={navigateToNotification}>
                        <img src={String(alertLogo)} alt="alert" />
                    </button>
                </section>
            </section>
            <SearchSection />
        </header>
    );
}
