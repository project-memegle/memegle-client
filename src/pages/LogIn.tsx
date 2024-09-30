import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Modal, { ModalHandle } from '../components/UI/Modal/ModalSection';
import useInput from '../hooks/useInput';
import useNavigateHandler from '../hooks/useNavigateHandler';

type LoginProps = {
    onClose: () => void;
};

export default function SignUp({ onClose }: LoginProps) {
    const modal = useRef<ModalHandle>(null);
    const navigate = useNavigateHandler();

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            console.log('서버로 로그인하기');
            setLoginError('');
            axios
                .post('http://localhost:3095/api/users', {
                    id,
                    password,
                })
                .then((response) => {
                    console.log(response);
                    setLoginSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                    setLoginError(error.response.data);
                })
                .finally(() => {});
        },
        [id, password]
    );

    function findId() {
        onClose();
        navigate('/findid');
    }

    function findPassword() {
        onClose();
        navigate('/findpassword');
    }

    return (
        <>
            <Modal ref={modal} onClose={onClose}>
                <section className="modal__container">
                    <form onSubmit={onSubmit}>
                        <div>
                            {!id && <p>아이디를 입력해주세요.</p>}
                            <label htmlFor="id"></label>
                            <input
                                name="id"
                                id="id"
                                type="text"
                                placeholder="아이디"
                                value={id}
                                onChange={onChangeId}
                            />
                        </div>
                        <div>
                            {!password && <p>비밀번호를 입력해주세요.</p>}
                            <label htmlFor="password"></label>
                            <input
                                name="password"
                                type="password"
                                id="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={onChangePassword}
                            />
                        </div>
                        <button className="signup__button" type="submit">
                            로그인
                        </button>
                    </form>
                    <section>
                        <button onClick={onClose}>닫기</button>
                        <button onClick={findId}>아이디 찾기</button>
                        <button onClick={findPassword}>비밀번호 찾기</button>
                    </section>
                </section>
            </Modal>
        </>
    );
}
