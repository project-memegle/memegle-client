import { useNavigate } from 'react-router-dom';
import notfoundIcon from '@memegle/assets/images/ic_404.png';
import Header from 'components/UI/Header/Header';
export default function NotFoundPage() {
    const navigate = useNavigate();

    function naviteToHome() {
        navigate('/');
    }
    return (
        <div className="body__container">
            <Header />
            <main className="error__container">
                <div>
                    <h4>존재하지 않는 페이지입니다</h4>
                    <button onClick={naviteToHome}>뒤로가기</button>
                </div>

                <img src={notfoundIcon} alt="icon" />
            </main>
        </div>
    );
}
