import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import axios from 'axios';
import useInput from '../hooks/useInput';
import validateId from '../components/UI/Validations/ValidateId';
import validatePassword from '../components/UI/Validations/ValidatePassword';
import ValidationMessages from '../components/UI/Validations/ValidationMessages';
import validateMatchValue from '../components/UI/Validations/ValidateMatchValue';
import validateNickname from '../components/UI/Validations/ValidateNickname';

export default function SignUp() {
    const [id, onChangeId] = useInput('');
    const [idError, setIdError] = useState('');
    const [nickname, onChangeNickname] = useInput('');
    const [nicknameError, setNicknameError] = useState('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, onChangePasswordCheck] = useInput('');
    const [passwordError, setPasswordError] = useState('');
    const [mismatchError, setMismatchError] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    const handlePasswordChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChangePassword(e);
            setMismatchError(e.target.value !== passwordCheck);
        },
        [onChangePassword, passwordCheck]
    );

    const handlePasswordCheckChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChangePasswordCheck(e);
            setMismatchError(e.target.value !== password);
        },
        [onChangePasswordCheck, password]
    );

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const idError = validateId(id);
            const passwordError = validatePassword(password);
            const nicknameError = validateNickname(nickname);
            const mismatchError = validateMatchValue(password, passwordCheck);

            setIdError(idError);
            setPasswordError(passwordError);
            setNicknameError(nicknameError);
            setMismatchError(mismatchError);

            if (idError || passwordError || mismatchError || nicknameError) {
                setSignUpError(ValidationMessages.INVALID_FORM);
                return;
            }

            if (nickname && id && password && passwordCheck) {
                console.log('서버로 회원가입하기 요청');

                setSignUpError('');
                try {
                    const response = await axios.post('/signup', {
                        id,
                        nickname,
                        password,
                    });
                    console.log(response);
                    setSignupSuccess(ValidationMessages.SIGNUP_SUCCESS);
                } catch (error) {
                    console.log(error);
                    switch (error) {
                        case '400':
                            setSignUpError(ValidationMessages.SIGNUP_FAILED);
                            break;
                        case '40001':
                            setSignUpError(ValidationMessages.INVALID_FORM);
                            break;
                        case '40002':
                            setSignUpError(ValidationMessages.EXIST_ID);
                            break;
                        case '40401':
                            setSignUpError(ValidationMessages.NO_RESOURCE);
                            break;
                        case '40102':
                            setSignUpError(
                                ValidationMessages.INVALID_PASSWORD_LENGTH
                            );
                            break;
                        case '50000':
                            setSignUpError(ValidationMessages.SERVER_ERROR);
                            break;
                        default:
                            setSignUpError(ValidationMessages.UNKNOWN_ERROR);
                            break;
                    }
                }
            }
        },
        [id, nickname, password, passwordCheck]
    );

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="id">아이디</label>
                <input
                    name="id"
                    id="id"
                    type="text"
                    placeholder="아이디"
                    value={id}
                    onChange={onChangeId}
                />
                {idError && <p>{idError}</p>}
            </div>
            <div>
                <label htmlFor="nickname">닉네임</label>
                <input
                    name="nickname"
                    id="nickname"
                    type="text"
                    placeholder="닉네임"
                    value={nickname}
                    onChange={onChangeNickname}
                />
                {nicknameError && <p>{nicknameError}</p>}
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <label htmlFor="password-check">비밀번호 확인</label>
                <input
                    name="password-check"
                    type="password"
                    id="password-check"
                    placeholder="비밀번호 확인"
                    value={passwordCheck}
                    onChange={handlePasswordCheckChange}
                />
                {passwordError && <p>{passwordError}</p>}
                {mismatchError && <p>{mismatchError}</p>}
            </div>
            {signUpError && <p>{signUpError}</p>}
            {signupSuccess && <p>{signupSuccess}</p>}
            <button className="signup__button" type="submit">
                회원가입
            </button>
        </form>
    );
}
