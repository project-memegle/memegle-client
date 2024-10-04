import SearchInput from './SearchInput';
import logo from '../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function SearchSection() {
    const navigateToHome = useNavigate();

    function clickHandler() {
        navigateToHome('/');
    }

    return (
        <section>
            <button className="logo__button" onClick={clickHandler}>
                <img className="logo" src={String(logo)} alt="logo" />
            </button>
            <SearchInput />
            <p className="home__text">이미지를 선택하면 이미지가 복사됩니다</p>
        </section>
    );
}
