import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import { useState } from 'react';

export default function Mypage() {
    const navigate = useCustomNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [toast, setToast] = useState(false);

    const deleteAccount = () => {
        if (!toast) {
            setToastMessage('회원탈퇴가 완료되었습니다');
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 2000);
        }
    };

    return (
        <main className="home__main c-mypage">
            <section className="c-mypage__info">
                <p>홍길동님 안녕하세요 😎</p>
                <p>test@gmail.com</p>
            </section>
            <section className="c-mypage__buttons">
                <button
                    type="button"
                    onClick={() => {
                        navigate('/changenickname');
                    }}
                >
                    닉네임 변경
                    <i className="c-icon">chevron_right</i>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        navigate('/changepassword');
                    }}
                >
                    비밀번호 변경
                    <i className="c-icon">chevron_right</i>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        navigate('/myimages');
                    }}
                >
                    내가 업로드한 이미지 목록 보기
                    <i className="c-icon">chevron_right</i>
                </button>
                <button type="button" onClick={deleteAccount}>
                    회원 탈퇴
                </button>
            </section>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </main>
    );
}
