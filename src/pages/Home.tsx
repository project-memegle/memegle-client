import logo from '../assets/logo.svg';
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
                <article className="category__box favorite">
                    <p className="category__box-title">즐겨찾기</p>
                </article>
                <article className="category__box favorite">
                    <p className="category__box-title">즐겨찾기</p>
                </article>
                <article className="category__box favorite">
                    <p className="category__box-title">즐겨찾기</p>
                </article>
                <article className="category__box favorite">
                    <p className="category__box-title">즐겨찾기</p>
                </article>
                <article className="category__box favorite">
                    <p className="category__box-title">즐겨찾기</p>
                </article>
                <article className="category__box favorite">
                    <p className="category__box-title">즐겨찾기</p>
                </article>
            </section>
        </main>
    );
}
