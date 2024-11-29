import useCustomNavigate from 'hooks/useCustomNaviaget';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

type LogInItemProps = {
    loginId: string;
    password: string;
};

const LoginItem = forwardRef<HTMLInputElement, LogInItemProps>(
    function LoginItem({ loginId, password }, ref) {
        return (
            <section className="modal__container">
                <section>
                    <div>
                        <input
                            name="id"
                            className="id"
                            type="text"
                            placeholder="아이디"
                            // onChange={loginHandler}
                            ref={ref}
                        />
                    </div>
                    <div>
                        <input
                            autoComplete="on"
                            name="password"
                            className="password"
                            type="password"
                            placeholder="비밀번호"
                            // onChange={loginHandler}
                        />
                    </div>
                </section>
                <button className="login__button" type="submit">
                    로그인
                </button>
            </section>
        );
    }
);

export default LoginItem;
