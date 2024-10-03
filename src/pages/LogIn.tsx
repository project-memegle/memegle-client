import { useCallback, useState } from 'react';
import axios from 'axios';

import useInput from '../hooks/useInput';
import useNavigateHandler from '../hooks/useNavigateHandler';

export default function LogIn() {
    const navigate = useNavigateHandler();

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [loginError, setLoginError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setLoginError(false);
            setLoginSuccess(false);
            axios
                .post('/login', {
                    id,
                    password,
                })
                .then((response) => {
                    console.log('response :', response);
                    setLoginSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                    setLoginError(true);
                })
                .finally(() => {});
        },
        [id, password]
    );

    function findId() {
        navigate('/findid');
    }

    function findPassword() {
        navigate('/findpassword');
    }
    const handleLogIn = async () => {
        try {
            const response = await axios.post('/login', {
                id,
                password,
            });
            // 로그인 성공
            setMessage('success');
            // 여기서 추가 작업 (예: 토큰 저장, 페이지 이동 등)을 할 수 있습니다.
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // 서버가 반환한 오류 메시지를 출력
                setMessage(
                    `fail: ${error.response.data.message || 'Unknown error'}`
                );
            } else {
                // 네트워크 오류 등
                setMessage('fail');
            }
        }
    };
    return (
        <>
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
                <button
                    className="login__button"
                    type="submit"
                    onClick={handleLogIn}
                >
                    로그인
                </button>
                {message && <p>{message}</p>}
            </form>
            <section>
                <button onClick={findId}>아이디 찾기</button>
                <button onClick={findPassword}>비밀번호 찾기</button>
            </section>
        </>
    );
}
