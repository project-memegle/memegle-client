import { render } from '@testing-library/react';
import SignUp from '../../pages/SignUp';

test('renders SignUp component correctly', () => {
    const { asFragment } = render(<SignUp />);
    expect(asFragment()).toMatchSnapshot();
});
