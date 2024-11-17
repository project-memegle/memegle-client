import useCustomNavigate from '../../hooks/useCustomNaviaget';
export default function FindId() {
    const navigate = useCustomNavigate();

    return (
        <div className="main__container">
            <section className="c-findid">
                <div className="c-findid__container">
                    <p>회원님의 아이디는</p>
                    <h2>홍길동</h2>
                    <p>입니다</p>
                </div>
                <button
                    className="button__rounded button__light"
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    확인
                </button>
            </section>
        </div>
    );
}
