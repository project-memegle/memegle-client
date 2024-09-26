import CategoryItem from '../Category/CategoryItem';

export default function CategorySection() {
    return (
        <section className="category__section">
            <CategoryItem category="favorite" />
            <CategoryItem category="mudo" />
            <CategoryItem category="digiMon" />
            <CategoryItem category="gif" />
            <CategoryItem category="temp1" />
            <CategoryItem category="temp2" />
        </section>
    );
}
