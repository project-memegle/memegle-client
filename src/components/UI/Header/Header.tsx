import logo from '../../../assets/logo.svg';
import { addSearchHistory } from 'utils/Storage/localStorage';
import { useState } from 'react';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useAuth } from 'components/auth/ProvideAuth';

interface HeaderProps {
    searchTerm: string;
    onSearch: (term: string) => void;
}

export default function Header({ searchTerm, onSearch }: HeaderProps) {
    const navigate = useCustomNavigate();
    const auth = useAuth();

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmedTerm = localSearchTerm.trim();

        if (trimmedTerm) {
            onSearch(trimmedTerm);
            addSearchHistory(trimmedTerm);
            navigate(`/result/${trimmedTerm}`);
        }
    };

    let logInButtonClick = () => {
        navigate('/login');
    };

    let logOutButtonClick = () => {
        auth.logout(() => {
            navigate('/');
        });
    };

    function removeInputValue(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setLocalSearchTerm('');
    }

    return (
        <header className="c-header">
            <section className="c-top-bar">
                <section className="c-top-bar__brand">
                    <button onClick={() => navigate('/')}>
                        <img className="logo" src={String(logo)} alt="logo" />
                    </button>
                </section>
                <section className="c-top-bar__user c-top-bar-user">
                    {auth.isAuthenticated ? (
                        <>
                            <button
                                className="c-top-bar-user__log button__white-font"
                                onClick={logOutButtonClick}
                            >
                                로그아웃
                            </button>
                            <button
                                className="c-top-bar-user__log button__white-font"
                                onClick={() => navigate('/upload')}
                            >
                                업로드
                            </button>
                            <button
                                style={{ display: 'none' }}
                                className="c-top-bar-user__notification"
                                onClick={() => navigate('/notification')}
                            >
                                <i className="c-icon">notifications</i>
                            </button>
                        </>
                    ) : (
                        <button
                            className="c-top-bar-user__log button__white-font"
                            // onClick={() => navigate('/login')}
                            onClick={logInButtonClick}
                        >
                            로그인
                        </button>
                    )}
                </section>
            </section>
            <section>
                <form className="form" onSubmit={handleSearchSubmit}>
                    <div className="c-input">
                        <button
                            className="c-input__icon c-input__icon--front"
                            onClick={handleSearchSubmit}
                        >
                            <i className="c-icon">search</i>
                        </button>
                        <input
                            className="c-input__input"
                            type="text"
                            placeholder="검색어를 입력해주세요"
                            onChange={handleInputChange}
                            value={localSearchTerm}
                        />
                        {localSearchTerm && (
                            <button
                                className="c-input__icon c-input__icon--back"
                                onClick={removeInputValue}
                            >
                                <i className="c-icon">close</i>
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </header>
    );
}
