import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    function naviteToHome() {
        navigate('/');
    }
    return (
        <main>
            <h1>Oops! Not found</h1>
            <button onClick={naviteToHome}>홈으로 돌아가기</button>
        </main>
    );
}
