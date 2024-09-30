import { useParams } from 'react-router-dom';
import SearchSection from '../components/UI/Search/SearchSection';
import useFetchHandler from '../hooks/useFetchHandler';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import mockData from '../data/mockData.json';
import { ReactNode } from 'react';
import ResultSection from '../components/UI/Result/ResultSection';

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
    const { data, loading, error } = useFetchHandler<MockData | null>(mockData); // Use mockData directly

    let content: ReactNode;

    if (loading) {
        content = <LoadingSpinner />;
    }

    if (error) {
        content = <div>Error: {error}</div>;
    }

    if (data && data?.results.length <= 0) {
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

    if (data && data?.results.length > 0) {
        const categoryData = data.results.filter(
            (item) => item.imageCategory === category
        );

        content = <ResultSection {...categoryData} />;
    }

    return (
        <main className="home__main">
            <SearchSection />
            {content}
        </main>
    );
}
