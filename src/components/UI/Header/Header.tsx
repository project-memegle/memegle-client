import logo from '../../../assets/logo.svg';
import { addSearchHistory, setLocalStorage } from 'utils/Storage/localStorage';
import { useEffect, useState } from 'react';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useAuth } from 'components/auth/ProvideAuth';
import { useTranslation } from 'react-i18next';
import StorageKeyword from 'Constant/StorageKeyword';
import { getSessionStorages } from 'utils/Storage/sessionStorage';

interface HeaderProps {
    searchTerm: string;
    onSearch: (term: string) => void;
}

export default function Header({ searchTerm, onSearch }: HeaderProps) {
    const navigate = useCustomNavigate();
    const auth = useAuth();
    const { t, i18n } = useTranslation();
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [language, setLanguage] = useState<string>('ko');

    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        if (location.pathname === '/') {
            setLocalSearchTerm('');
        }
    }, [location.pathname]);

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

    useEffect(() => {
        const language = getSessionStorages(StorageKeyword.LANGUAGE) || 'ko';
        setLanguage(language);
        i18n.changeLanguage(language);
    }, [setLanguage, i18n]);

    const handleChangeLanguage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const lang = event.target.checked ? 'ko' : 'en';
        i18n.changeLanguage(lang);
        setLocalStorage({ key: StorageKeyword.LANGUAGE, value: lang });
        setLanguage(lang);
    };

    return (
        <header className="c-header">
            <section className="c-top-bar">
                <section className="c-top-bar__brand">
                    <button onClick={() => navigate('/')}>
                        <img className="logo" src={String(logo)} alt="logo" />
                    </button>
                    <div className="c-header__switch">
                        <input
                            id="language-toggle"
                            type="checkbox"
                            onChange={handleChangeLanguage}
                            checked={i18n.language === 'ko'}
                        />
                        <label htmlFor="language-toggle">
                            <span>KR</span>
                            <span>EN</span>
                        </label>
                    </div>
                </section>
                <section className="c-top-bar__user c-top-bar-user">
                    {auth.isAuthenticated ? (
                        <>
                            <button
                                className="c-top-bar-user__log button__white-font"
                                onClick={logOutButtonClick}
                            >
                                {t('DEFAULT_SIGNOUT')}
                            </button>
                            <button
                                className="c-top-bar-user__log button__white-font"
                                onClick={() => navigate('/mypage')}
                            >
                                {t('DEFAULT_MYPAGE')}
                            </button>
                            <button
                                className="c-top-bar-user__log button__white-font"
                                onClick={() => navigate('/upload')}
                            >
                                {t('DEFAULT_UPLOAD')}
                            </button>
                            <button
                                className="c-top-bar-user__notification"
                                onClick={() => navigate('/notification')}
                            >
                                <i className="c-icon">notifications</i>
                            </button>
                        </>
                    ) : (
                        <button
                            className="c-top-bar-user__log button__white-font"
                            onClick={logInButtonClick}
                        >
                            {t('DEFAULT_LOGIN')}
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
                            placeholder={t('REQUIRED_SEARCH_INPUT')}
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
