import { useParams } from 'react-router-dom';
import mockData from '../data/mockData.json';

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

const data: MockData = mockData;

export default function Result() {
    const params = useParams<{ category: string }>();
    const category = params.category;
    const categoryData = data.results.find(
        (item) => item.imageCategory === category
    );
    const imageUrl = categoryData ? categoryData.imageUrl : '';

    return (
        <main>
            <h1>This is ResultPage. The category is {category}</h1>
            {imageUrl ? (
                <img src={imageUrl} alt="img" />
            ) : (
                <p>No image found for the category "{category}".</p>
            )}
        </main>
    );
}
