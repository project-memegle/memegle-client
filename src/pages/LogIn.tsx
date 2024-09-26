import { useEffect, useRef } from 'react';
import Modal, { ModalHandle } from '../components/UI/Modal/ModalSection';

type LogInProps = {
    onClose: () => void;
};

export default function LogIn({ onClose }: LogInProps) {
    const modal = useRef<ModalHandle>(null);

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    function loginHandler() {
        console.log('loginHandler');
    }

    function loginClickHandler() {
        console.log('loginClickHandler');
    }

    return (
        <>
            <Modal ref={modal} onClose={onClose}>
                <section className="loginModal">
                    <section>
                        <div>
                            <input
                                name="email"
                                className="loginId"
                                type="text"
                                placeholder="아이디"
                                onChange={loginHandler}
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                className="loginPw"
                                type="password"
                                placeholder="비밀번호"
                                onChange={loginHandler}
                            />
                        </div>
                    </section>
                    <section>
                        <button
                            className="loginBtn"
                            onClick={loginClickHandler}
                        >
                            로그인
                        </button>
                        <button onClick={onClose}>닫기</button>
                    </section>
                </section>
            </Modal>
        </>
    );
}
