import { render } from '@testing-library/react';
import SignUp from '../../pages/SignUp/SignUp';

test('회원가입 컴포넌트 렌더링 테스트', () => {
    const { asFragment } = render(<SignUp />);
    expect(asFragment()).toMatchSnapshot();
});
