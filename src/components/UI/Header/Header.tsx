import logo from '../../../assets/logo.svg';
import { addSearchHistory, setLocalStorage } from 'utils/Storage/localStorage';
import { useEffect, useState } from 'react';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useAuth } from 'components/auth/ProvideAuth';
import { useTranslation } from 'react-i18next';
import StorageKeyword from 'Constant/StorageKeyword';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import { useLocation } from 'react-router-dom';
import { normalizeString } from 'utils/Format/normalize';

interface HeaderProps {
    searchTerm: string;
    onSearch: (term: string) => void;
    isAuthenticated?: boolean;
}

export default function Header({ searchTerm, onSearch, isAuthenticated }: HeaderProps) {
    const navigate = useCustomNavigate();
    const auth = useAuth();
    const { t, i18n } = useTranslation();
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [language, setLanguage] = useState<string>('ko');
    const location = useLocation();
    const [displayResponsiveMenu, setDisplayResponsiveMenu] = useState(false);

    useEffect(() => {
        if (!location.pathname.startsWith('/tag/')) {
            setLocalSearchTerm('');
        }
    }, [location]);

    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        const language = getSessionStorages(StorageKeyword.LANGUAGE) || 'ko';
        setLanguage(language);
        i18n.changeLanguage(language);
    }, [i18n]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmedTerm = localSearchTerm.trim();
        const normalizedTerm = normalizeString(trimmedTerm);
        if (trimmedTerm) {
            onSearch(trimmedTerm);
            addSearchHistory(trimmedTerm);
            navigate(`/tag/${normalizedTerm}`);
        }
    };

    const logInButtonClick = () => {
        navigate('/login');
    };

    const logOutButtonClick = () => {
        auth.logout(() => {
            navigate('/');
        });
    };

    const removeInputValue = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLocalSearchTerm('');
    };

    const handleChangeLanguage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const lang = event.target.checked ? 'ko' : 'en';
        i18n.changeLanguage(lang);
        setLocalStorage({ key: StorageKeyword.LANGUAGE, value: lang });
        setLanguage(lang);
    };

    const renderAuthButtons = () => (
        <>
            <button
                className="c-top-bar__user__log button__white-font"
                onClick={logOutButtonClick}
            >
                {t('DEFAULT_SIGNOUT')}
            </button>
            <button
                className="c-top-bar__user__log button__white-font"
                onClick={() => navigate('/mypage')}
            >
                {t('DEFAULT_MYPAGE')}
            </button>
            <button
                className="c-top-bar__user__log button__white-font"
                onClick={() => navigate('/upload')}
            >
                {t('DEFAULT_UPLOAD')}
            </button>
            <button
                className="c-top-bar__user-notification"
                onClick={() => navigate('/notification')}
            >
                <i className="c-icon">notifications</i>
            </button>
        </>
    );

    const renderResponsiveMenu = () => (
        <aside className="c-top-bar__user c-top-bar__user-aside">
            {isAuthenticated && (
                <section className="c-top-bar__user c-top-bar__user-aside-wrapper">
                    <div className="c-top-bar__user-flex">
                        <button
                            type="button"
                            className="c-top-bar__user-notification"
                            onClick={() =>
                                setDisplayResponsiveMenu(!displayResponsiveMenu)
                            }
                        >
                            <i className="c-icon">close</i>
                        </button>
                        <button
                            className="c-top-bar__user-notification"
                            onClick={() => {
                                navigate('/notification');
                                setDisplayResponsiveMenu(
                                    !displayResponsiveMenu
                                );
                            }}
                        >
                            <i className="c-icon">notifications</i>
                        </button>
                    </div>
                    <button
                        className="c-top-bar__user__log button__white-font"
                        onClick={() => {
                            navigate('/upload');
                            setDisplayResponsiveMenu(!displayResponsiveMenu);
                        }}
                    >
                        {t('DEFAULT_UPLOAD')}
                    </button>
                    <button
                        className="c-top-bar__user__log button__white-font"
                        onClick={() => {
                            navigate('/mypage');
                            setDisplayResponsiveMenu(!displayResponsiveMenu);
                        }}
                    >
                        {t('DEFAULT_MYPAGE')}
                    </button>
                    <button
                        className="c-top-bar__user__log button__white-font"
                        onClick={() => {
                            logOutButtonClick();
                            setDisplayResponsiveMenu(!displayResponsiveMenu);
                        }}
                    >
                        {t('DEFAULT_SIGNOUT')}
                    </button>
                </section>
            )}
        </aside>
    );

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
                <section className="c-top-bar__user c-top-bar__user responsive">
                    {isAuthenticated ? (
                        <button
                            type="button"
                            className="c-top-bar__user-notification"
                            onClick={() =>
                                setDisplayResponsiveMenu(!displayResponsiveMenu)
                            }
                        >
                            <i className="c-icon">menu</i>
                        </button>
                    ) : (
                        <button
                            className="c-top-bar__user__log button__white-font"
                            onClick={logInButtonClick}
                        >
                            {t('DEFAULT_LOGIN')}
                        </button>
                    )}
                </section>
                <section className="c-top-bar__user c-top-bar__user">
                    {isAuthenticated ? (
                        renderAuthButtons()
                    ) : (
                        <button
                            className="c-top-bar__user__log button__white-font"
                            onClick={logInButtonClick}
                        >
                            {t('DEFAULT_LOGIN')}
                        </button>
                    )}
                </section>
            </section>

            {displayResponsiveMenu && renderResponsiveMenu()}

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
