import logo from '../assets/logo.svg';
import CategoryBox from '../components/UI/CategoryBox';
import SearchInput from '../components/UI/SearchInput';

export default function HomePage() {
    return (
        <main className="home__main">
            <section>
                <img src={String(logo)} alt="logo" />
                <SearchInput />
                <p>이미지를 선택하면 이미지가 복사됩니다</p>
            </section>
            <section className="category__section">
                <CategoryBox category="favorite" />
                <CategoryBox category="mudo" />
                <CategoryBox category="digiMon" />
                <CategoryBox category="gif" />
                <CategoryBox category="temp1" />
                <CategoryBox category="temp2" />
            </section>
        </main>
    );
}
