import useCustomNavigate from 'hooks/useCustomNaviaget';

export default function DeleteAccount() {
    const navigate = useCustomNavigate();
    function onSubmit() {
        navigate('/');
    }
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };
    return (
        <main className="home__main">
            <form action="" className="c-deleteAccount">
                <h2>정말 떠나시는건가요?😭</h2>
                <p>
                    계정을 삭제하시려는 이유를 말씀해주세요. <br /> 소중한
                    피드백 자료로 활용하겠습니다.
                </p>
                <section className="c-deleteAccount__checkbox">
                    <div>
                        <input id="resource" type="radio" name="delete" />
                        <label htmlFor="resource">자료가 충분하지 않다</label>
                    </div>
                    <div>
                        <input id="privacy" type="radio" name="delete" />
                        <label htmlFor="privacy">개인정보 문제</label>
                    </div>
                    <div>
                        <input id="notuseful" type="radio" name="delete" />
                        <label htmlFor="notuseful">
                            서비스가 유용하지 않다
                        </label>
                    </div>
                    <div>
                        <input id="difficult" type="radio" name="delete" />
                        <label htmlFor="difficult">이용이 어렵다</label>
                    </div>
                    <section className="c-deleteAccount__checkbox-textarea">
                        <div>
                            <input id="other" type="radio" name="delete" />
                            <label htmlFor="other">기타</label>
                        </div>
                        <textarea
                            id="feedback"
                            placeholder="떠나시려는 이유를 입력해주세요."
                            onInput={handleInput}
                        />
                    </section>
                </section>
                <button
                    className="button__rounded button__orange"
                    onClick={onSubmit}
                >
                    계정 삭제하기
                </button>
            </form>
        </main>
    );
}
