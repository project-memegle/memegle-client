import { useLocation } from 'react-router-dom';
import useCustomNavigate from '../../hooks/useCustomNaviaget';
import { useTranslation } from 'react-i18next';
export default function FindId() {
    const navigate = useCustomNavigate();
    const { t } = useTranslation();
    const location = useLocation();
    const { loginId } = location.state || { loginId: '' };
    return (
        <div className="main__container">
            <section className="c-findid">
                <div className="c-findid__container">
                    <p>{t('CONFIRM_ID-1')}</p>
                    <h2>{loginId}</h2>
                    <p>{t('CONFIRM_ID-2')}</p>
                </div>
                <button
                    className="button__rounded button__light"
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    {t('CONFIRM')}
                </button>
            </section>
        </div>
    );
}
