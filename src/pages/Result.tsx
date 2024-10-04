import { useParams } from 'react-router-dom';
import SearchSection from '../components/UI/Search/SearchSection';
import useFetchHandler from '../hooks/useFetchHandler';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import mockData from '../data/mockData.json';
import { ReactNode, useState } from 'react';
import ResultSection from '../components/UI/Result/ResultSection';
import axios from 'axios';
import ValidationMessages from 'components/Validations/ValidationMessages';

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
    const [result, setResult] = useState('');
    const [message, setMessage] = useState('');

    useState(() => {
        axios
            .get('/images/category')
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    switch (error.response?.status) {
                        case 40001:
                            setMessage(ValidationMessages.INVALID_FORM);
                            break;
                        case 40401:
                            setMessage(ValidationMessages.MISSED_RESOURCE);
                            break;
                        case 50000:
                            setMessage(ValidationMessages.SERVER_ERROR);
                            break;
                        default:
                            setMessage(ValidationMessages.UNKNOWN_ERROR);
                            break;
                    }
                } else {
                    setMessage(ValidationMessages.UNKNOWN_ERROR);
                }
            });
    });

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
