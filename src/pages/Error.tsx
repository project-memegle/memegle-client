import errorIcon from '@memegle/assets/images/png/img_error.png';
import { createRoot, Root } from 'react-dom/client';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';

interface ErrorPageProps {
    message: string;
}
export default function ErrorPage({ message }: ErrorPageProps) {
    const { t } = useTranslation();
    return (
        <div className="body__container">
            <main className="error__container">
                <div>
                    <h4>{message}</h4>
                    <button
                        onClick={() => {
                            window.history.back();
                        }}
                    >
                        {t('BACK_BUTTON')}
                    </button>
                </div>
                <img src={errorIcon} alt="icon" />
            </main>
        </div>
    );
}
let root: Root | null = null;

export function handleErrorPage(message: string) {
    const container = document.querySelector('main');
    if (container) {
        root = createRoot(container);
        root.render(
            <Router>
                <ErrorPage message={message} />
            </Router>
        );
    }
}
