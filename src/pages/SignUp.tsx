import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Modal, { ModalHandle } from '../components/UI/Modal/ModalSection';
import useInput from '../hooks/useInput';

type SignUpProps = {
    onClose: () => void;
};

export default function SignUp({ onClose }: SignUpProps) {
    const modal = useRef<ModalHandle>(null);

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    const [id, onChangeId] = useInput('');
    const [name, onChangeName] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, , setPassword] = useInput('');
    const [passwordCheck, , setPasswordCheck] = useInput('');
    const [mismatchError, setMismatchError] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);

    //useCallback을 사용함으로써 불필요한 재렌더링을 방지한다.

    const onChangePassword = useCallback(
        (e) => {
            setPassword(e.target.value);
            setMismatchError(e.target.value !== passwordCheck);
        },
        [passwordCheck]
    );

    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setMismatchError(e.target.value !== password);
        },
        [password]
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!mismatchError && nickname) {
                console.log('서버로 회원가입하기');
                setSignUpError('');
                axios
                    .post('http://localhost:3095/api/users', {
                        id,
                        nickname,
                        password,
                    })
                    .then((response) => {
                        console.log(response);
                        setSignupSuccess(true);
                    })
                    .catch((error) => {
                        console.log(error);
                        setSignUpError(error.response.data);
                    })
                    .finally(() => {});
            }
        },
        [id, name, nickname, password, passwordCheck]
    );

    return (
        <>
            <Modal ref={modal} onClose={onClose}>
                <section className="modal__container">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="id"></label>
                            {!id && <p>아이디를 입력해주세요.</p>}
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
                            {!name && <p>이름을 입력해주세요.</p>}
                            <label htmlFor="name"></label>
                            <input
                                name="name"
                                id="name"
                                type="text"
                                placeholder="이름"
                                value={name}
                                onChange={onChangeName}
                            />
                        </div>
                        <div>
                            {!nickname && <p>닉네임을 입력해주세요.</p>}
                            <label htmlFor="nickname"></label>
                            <input
                                name="nickname"
                                id="nickname"
                                type="text"
                                placeholder="닉네임"
                                value={nickname}
                                onChange={onChangeNickname}
                            />
                        </div>
                        <div>
                            {!password && !passwordCheck && (
                                <p>비밀번호를 입력해주세요.</p>
                            )}
                            {mismatchError && (
                                <p>비밀번호가 일치하지 않습니다.</p>
                            )}
                            <div>
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
                            <div>
                                <label htmlFor="password-check"></label>
                                <input
                                    name="password-check"
                                    type="password"
                                    id="password-check"
                                    placeholder="비밀번호 확인"
                                    value={passwordCheck}
                                    onChange={onChangePasswordCheck}
                                />
                            </div>
                        </div>

                        <button className="signup__button" type="submit">
                            회원가입
                        </button>
                    </form>
                    <section>
                        <button onClick={onClose}>닫기</button>
                    </section>
                </section>
            </Modal>
        </>
    );
}
