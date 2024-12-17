import notfoundIcon from '@memegle/assets/images/png/img_404.webp';
import Header from 'components/UI/Header/Header';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useTranslation } from 'react-i18next';
export default function NotFoundPage() {
    const navigate = useCustomNavigate();
    const { t } = useTranslation();
    const handleSearch = (term: string) => {
        navigate(`/?search=${term}`);
    };

    return (
        <div className="body__container">
            <Header searchTerm="" onSearch={handleSearch} />
            <main className="error__container">
                <div>
                    <h4>{t('NONEXIST_PAGE')}</h4>
                    <button onClick={() => navigate('/')}>
                        {t('BACK_BUTTON')}
                    </button>
                </div>
                <img src={notfoundIcon} alt="icon" />
            </main>
        </div>
    );
}
