import useCustomNavigate from 'hooks/useCustomNaviaget';

export default function Mypage() {
    const navigate = useCustomNavigate();

    return (
        <main className="home__main c-mypage">
            <section className="c-mypage__info">
                <h2>홍길동님 안녕하세요 😎</h2>
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
                        navigate('/password/verification');
                    }}
                >
                    비밀번호 변경
                    <i className="c-icon">chevron_right</i>
                </button>
                {/* <button
                    type="button"
                    onClick={() => {
                        navigate('/myimages');
                    }}
                >
                    내가 업로드한 이미지 목록 보기
                    <i className="c-icon">chevron_right</i>
                </button> */}
                <button type="button" onClick={() => navigate('/goodbye')}>
                    계정 삭제
                </button>
            </section>
        </main>
    );
}
