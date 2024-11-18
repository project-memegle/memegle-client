import errorIcon from '@memegle/assets/images/png/img_error.png';
import useCustomNavigate from '../hooks/useCustomNaviaget';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { getPreviousUrl } from '../utils/Event/saveUrl';

interface ErrorPageProps {
    message: string;
}

export default function ErrorPage({ message }: ErrorPageProps) {
    const navigate = useCustomNavigate();
    const previousUrl = getPreviousUrl() || '/';
    return (
        <div className="body__container">
            <main className="error__container">
                <div>
                    <h4>{message}</h4>
                    <button
                        onClick={() => {
                            navigate(previousUrl);
                        }}
                    >
                        뒤로가기
                    </button>
                </div>
                <img src={errorIcon} alt="icon" />
            </main>
        </div>
    );
}

export function handleErrorPage(message: string) {
    const container = document.querySelector('.main__container');
    if (container) {
        const root = createRoot(container);
        root.render(
            <Router>
                <ErrorPage message={message} />
            </Router>
        );
    }
}
