import { useParams } from 'react-router-dom';
import SearchSection from '../components/UI/Search/SearchSection';
import useFetchHandler from '../hooks/useFetchHandler'; // Adjust the path as necessary
import LoadingSpinner from '../components/UI/LoadingSpinner';
import mockData from '../data/mockData.json';
import { ReactNode } from 'react';

interface MockDataItem {
    id: number;
    imageUrl: string;
    imageCategory: string;
    createdAt: string;
    modifiedAt: string;
}

interface MockData {
    success: boolean;
    status: string;
    code: number;
    message: string;
    results: MockDataItem[];
}

export default function Result() {
    const params = useParams<{ category: string }>();
    const category = params.category;
    const { data, loading, error } = useFetchHandler<MockData>(mockData); // Use mockData directly

    let content: ReactNode;

    if (loading) {
        content = <LoadingSpinner />;
    } else if (error) {
        content = <div>Error: {error}</div>;
    } else {
        const categoryData = data?.results.find(
            (item) => item.imageCategory === category
        );
        const imageUrl = categoryData ? categoryData.imageUrl : '';

        content = imageUrl ? (
            <img src={imageUrl} alt="img" />
        ) : (
            <p>No image found for the category "{category}".</p>
        );
    }

    return (
        <main className="home__main">
            <SearchSection />
            <section>
                <h1>This is ResultPage. The category is {category}</h1>
                {content}
            </section>
        </main>
    );
}
