import SearchSection from '../Search/SearchSection';
import logo from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export default function Header() {
    const navigate = useNavigate();
    const auth = useAuth();

    function navigateToHome() {
        navigate('/');
    }

    function navigateToUpload() {
        navigate('/upload');
    }
    function navigateToNotification() {
        navigate('/notifications');
    }

    let logInButtonClick = () => {
        auth.login(() => {
            console.log('사용자 로그인😎');
        });
    };
    let logOutButtonClick = () => {
        auth.logout(() => {
            console.log('사용자 로그아웃😒');
        });
    };

    return (
        <header className="c-header">
            <section className="c-top-bar">
                <section className="c-top-bar__brand">
                    <button onClick={navigateToHome}>
                        <img className="logo" src={String(logo)} alt="logo" />
                    </button>
                </section>
                <section className="c-top-bar__user c-top-bar-user">
                    {auth.user ? (
                        <>
                            <button
                                className="c-top-bar-user__log button__white-font"
                                onClick={logOutButtonClick}
                            >
                                로그아웃
                            </button>
                            <button
                                className="c-top-bar-user__log button__white-font"
                                onClick={navigateToUpload}
                            >
                                업로드
                            </button>

                            <button
                                className="c-top-bar-user__notification"
                                onClick={navigateToNotification}
                            >
                                <i className="c-icon">notifications</i>
                            </button>
                        </>
                    ) : (
                        <button
                            className="c-top-bar-user__log button__white-font"
                            onClick={logInButtonClick}
                        >
                            로그인
                        </button>
                    )}
                </section>
            </section>
            <SearchSection />
        </header>
    );
}
